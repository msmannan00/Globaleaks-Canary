# -*- coding: utf-8
from twisted.internet.defer import inlineCallbacks

from globaleaks import models
from globaleaks.handlers.base import BaseHandler
from globaleaks.handlers.user import parse_pgp_options, \
                                     user_serialize_user
from globaleaks.models import fill_localized_keys
from globaleaks.orm import db_del, db_get, db_log, transact, tw
from globaleaks.rest import errors, requests
from globaleaks.state import State
from globaleaks.transactions import db_get_user
from globaleaks.utils.crypto import GCE, Base64Encoder, generateRandomPassword
from globaleaks.utils.utility import datetime_now, datetime_null, uuid4


def db_set_user_password(session, tid, user, password):
    config = models.config.ConfigFactory(session, tid)

    user.hash = GCE.hash_password(password, user.salt)
    user.password_change_date = datetime_now()

    if config.get_val('encryption'):
        root_config = models.config.ConfigFactory(session, 1)

        enc_key = GCE.derive_key(password.encode(), user.salt)
        cc, user.crypto_pub_key = GCE.generate_keypair()
        user.crypto_prv_key = Base64Encoder.encode(GCE.symmetric_encrypt(enc_key, cc))
        user.crypto_bkp_key, user.crypto_rec_key = GCE.generate_recovery_key(cc)

        crypto_escrow_pub_key_tenant_1 = root_config.get_val('crypto_escrow_pub_key')
        if crypto_escrow_pub_key_tenant_1:
            user.crypto_escrow_bkp1_key = Base64Encoder.encode(GCE.asymmetric_encrypt(crypto_escrow_pub_key_tenant_1, cc))

        if tid != 1:
            crypto_escrow_pub_key_tenant_n = config.get_val('crypto_escrow_pub_key')
            if crypto_escrow_pub_key_tenant_n:
                user.crypto_escrow_bkp2_key = Base64Encoder.encode(GCE.asymmetric_encrypt(crypto_escrow_pub_key_tenant_n, cc))



def db_create_user(session, tid, user_session, request, language):
    """
    Transaction for creating a new user

    :param session: An ORM session
    :param tid: A tenant ID
    :param user_session: The session of the user performing the operation
    :param request: The request data
    :param language: The language of the request
    :return: The serialized descriptor of the created object
    """
    request['tid'] = tid

    fill_localized_keys(request, models.User.localized_keys, language)

    if not request['public_name']:
        request['public_name'] = request['name']

    user = models.User(request)

    if not request['username']:
        user.username = user.id = uuid4()

    existing_user = session.query(models.User).filter(models.User.tid == user.tid, models.User.username == user.username).first()
    if existing_user:
        raise errors.DuplicateUserError

    user.salt = GCE.generate_salt()

    user.language = request['language']

    # The various options related in manage PGP keys are used here.
    parse_pgp_options(user, request)

    if user_session and user_session.ek:
        db_set_user_password(session, tid, user, generateRandomPassword(16))

    session.add(user)

    session.flush()

    if user_session:
        db_log(session, tid=tid, type='create_user', user_id=user_session.user_id, object_id=user.id)

    return user


def db_delete_user(session, tid, user_session, user_id):
    current_user = db_get(session, models.User, models.User.id == user_session.user_id)
    user_to_be_deleted = db_get(session, models.User, models.User.id == user_id)

    if user_session.user_id == user_id:
        # Prevent users to delete themeselves
        raise errors.ForbiddenOperation
    elif user_to_be_deleted.crypto_escrow_prv_key and not user_session.ek:
        # Prevent users to delete privileged users when escrow keys could be invalidated
        raise errors.ForbiddenOperation

    db_del(session, models.User, (models.User.tid == tid, models.User.id == user_id))
    db_log(session, tid=tid, type='delete_user', user_id=user_session.user_id, object_id=user_id)


@transact
def create_user(session, tid, user_session, request, language):
    """
    Transaction for creating a new user

    :param session: An ORM session
    :param tid: A tenant ID
    :param request: The request data
    :param language: The language of the request
    :return: The serialized descriptor of the created object
    """
    return user_serialize_user(session, db_create_user(session, tid, user_session, request, language), language)


def db_admin_update_user(session, tid, user_session, user_id, request, language):
    """
    Transaction for updating an existing user

    :param session: An ORM session
    :param tid: A tenant ID
    :param user_session: The current user session
    :param user_id: The ID of the user to update
    :param request: The request data
    :param language: The language of the request
    :return: The serialized descriptor of the updated object
    """
    fill_localized_keys(request, models.User.localized_keys, language)

    user = db_get_user(session, tid, user_id)
    user.can_redact_information = request['can_redact_information']
    user.can_mask_information = request['can_mask_information']
    if request['mail_address'] != user.mail_address:
        user.change_email_token = None
        user.change_email_address = ''
        user.change_email_date = datetime_null()

    # Prevent administrators to reset password change needed status
    if user.password_change_needed:
        request['password_change_needed'] = True

    # The various options related in manage PGP keys are used here.
    parse_pgp_options(user, request)

    user.update(request)

    return user_serialize_user(session, user, language)


def db_get_users(session, tid, role=None, language=None):
    """
    Transaction for retrieving the list of users defined on a tenant

    :param session: An ORM session
    :param tid: A tenant ID
    :param role: The role of the users to be retriven
    :param language: The language to be used during serialization
    :return: A list of serialized descriptors of the users defined on the specified tenant
    """
    if role is None:
        users = session.query(models.User).filter(models.User.tid == tid)
    else:
        users = session.query(models.User).filter(models.User.tid == tid,
                                                  models.User.role == role)

    language = language or State.tenants[tid].cache.default_language

    return [user_serialize_user(session, user, language) for user in users]


class UsersCollection(BaseHandler):
    check_roles = 'admin'
    invalidate_cache = True

    def get(self):
        """
        Return all the users.
        """
        return tw(db_get_users, self.request.tid, None, self.request.language)

    @inlineCallbacks
    def post(self):
        """
        Create a new user
        """
        request = self.validate_request(self.request.content.read(),
                                        requests.AdminUserDesc)

        user = yield create_user(self.request.tid, self.session, request, self.request.language)

        return user


class UserInstance(BaseHandler):
    check_roles = 'admin'
    invalidate_cache = True

    def put(self, user_id):
        """
        Update the specified user.
        """
        request = self.validate_request(self.request.content.read(), requests.AdminUserDesc)

        return tw(db_admin_update_user,
                  self.request.tid,
                  self.session,
                  user_id,
                  request,
                  self.request.language)

    def delete(self, user_id):
        """
        Delete the specified user.
        """
        return tw(db_delete_user, self.request.tid, self.session, user_id)
