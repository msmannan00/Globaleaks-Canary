# -*- coding: utf-8
import os
import sys
import traceback
import warnings

from sqlalchemy.exc import SAWarning

from globaleaks import __version__, models, DATABASE_VERSION, LANGUAGES_SUPPORTED_CODES
from globaleaks.db.appdata import load_appdata, db_load_defaults
from globaleaks.handlers.admin.https import db_load_tls_configs
from globaleaks.models import config, Base, Config
from globaleaks.models.config_desc import ConfigFilters
from globaleaks.orm import db_log, get_engine, transact, transact_sync
from globaleaks.settings import Settings
from globaleaks.state import State, TenantState
from globaleaks.utils import fs
from globaleaks.utils.log import log
from globaleaks.utils.objectdict import ObjectDict
from globaleaks.utils.utility import datetime_now


def db_get_db_version(session):
    """
    Utility function to retrieve the database version
    :return: The db version
    """
    return session.query(models.Config.value).filter(Config.tid == 1,
                                                     Config.var_name == 'version_db').one()[0]


def db_perform_data_update(session):
    """
    Update the database including up-to-date application data
    :param db_file: The database file path
    """
    now = datetime_now()

    appdata = load_appdata()

    enabled_languages = [lang.name for lang in session.query(models.EnabledLanguage)]

    removed_languages = list(set(enabled_languages) - set(LANGUAGES_SUPPORTED_CODES))

    if removed_languages:
        removed_languages.sort()
        removed_languages = ', '.join(removed_languages)
        raise Exception("FATAL: cannot complete the upgrade because the support for some of the enabled languages is currently incomplete (%s)\n" % removed_languages)

    original_version = config.ConfigFactory(session, 1).get_val('version')
    if original_version != __version__:
        for tid in [t[0] for t in session.query(models.Tenant.id)]:
            config.update_defaults(session, tid, appdata)

        db_load_defaults(session)

        session.query(models.Config).filter_by(var_name='version') \
               .update({'value': __version__, 'update_date': now})

        session.query(models.Config).filter_by(var_name='latest_version') \
               .update({'value': __version__, 'update_date': now})

        session.query(models.Config).filter_by(var_name='version_db') \
               .update({'value': DATABASE_VERSION, 'update_date': now})

        db_log(session, tid=1, type='version_update', user_id='system', data={'from': original_version, 'to': __version__})


def create_db():
    """
    Utility function to create a new database
    """
    engine = get_engine(orm_lockdown=False)
    engine.execute('PRAGMA foreign_keys = ON')
    engine.execute('PRAGMA secure_delete = ON')
    engine.execute('PRAGMA auto_vacuum = FULL')
    engine.execute('PRAGMA automatic_index = ON')
    Base.metadata.create_all(engine)


def compact_db():
    """
    Execute VACUUM command to deallocate database space
    """
    engine = get_engine(orm_lockdown=False)
    engine.execute('VACUUM')


@transact_sync
def init_db(session):
    """
    Transaction for initializing the application database
    :param session: An ORM session
    """
    from globaleaks.handlers.admin import tenant
    tenant.db_create(session, {'active': True, 'mode': 'default', 'name': 'GLOBALEAKS', 'subdomain': ''})


@transact_sync
def update_db(session):
    """
    This function handles the update of an existing database
    :return: The database version
    """
    db_version = db_get_db_version(session)
    if db_version == 0:
        return 0

    try:
        with warnings.catch_warnings():
            log.err('Found an already initialized database version: %d', db_version)
            db_perform_data_update(session)

    except Exception as exception:
        log.err('Failure: %s', exception)
        log.err('Verbose exception traceback:')
        etype, value, tback = sys.exc_info()
        log.info('\n'.join(traceback.format_exception(etype, value, tback)))
        return -1

    return DATABASE_VERSION


def db_get_tracked_files(session):
    """
    Transaction for retrieving the list of files tracked by the application database
    :param session: An ORM session
    :return: The list of filenames of the files
    """
    return [x[0] for x in session.query(models.File.id)]


def db_get_tracked_attachments(session):
    """
    Transaction for retrieving the list of attachment files tracked by the application database
    :param session: An ORM session
    :return: The list of filenames of the attachment files
    """
    ifiles = session.query(models.InternalFile.id).all()
    wbfiles = session.query(models.WhistleblowerFile.id).all()
    rfiles = session.query(models.ReceiverFile.id).all()

    return [x[0] for x in ifiles + wbfiles + rfiles]


@transact_sync
def sync_clean_untracked_files(session):
    """
    Transaction for removing files that are not tracked by the application database
    :param session: An ORM session
    """
    tracked_files = db_get_tracked_attachments(session)
    for filesystem_file in os.listdir(Settings.attachments_path):
        if filesystem_file not in tracked_files:
            file_to_remove = os.path.join(Settings.attachments_path, filesystem_file)
            log.debug('Removing untracked file: %s', file_to_remove)
            try:
                fs.srm(file_to_remove)
            except OSError:
                log.err('Failed to remove untracked file', file_to_remove)


@transact_sync
def sync_initialize_snimap(session):
    """
    Transaction for loading TLS certificates and initialize the SNI map
    :param session: An ORM session
    """
    for cfg in db_load_tls_configs(session):
        State.snimap.load(cfg['tid'], cfg)


def db_refresh_tenant_cache(session, to_refresh=None):
    active_tids = set([tid[0] for tid in session.query(models.Tenant.id).filter(models.Tenant.active.is_(True))])

    cached_tids = set(State.tenants.keys())

    disabled_tids = cached_tids - active_tids

    # Remove tenants that have been disabled
    for tid in disabled_tids:
        if tid not in State.tenants:
            continue

        tenant_cache = State.tenants[tid].cache

        State.tenant_uuid_id_map.pop(tenant_cache.uuid, None)
        State.tenant_subdomain_id_map.pop(tenant_cache.subdomain, None)

        for h in tenant_cache.hostnames + tenant_cache.onionnames:
            State.tenant_hostname_id_map.pop(h, None)

        State.snimap.unload(tid)

        if State.tor:
            State.tor.unload_onion_service(tid)

        del State.tenants[tid]

    if to_refresh is None or to_refresh == 1:
        tids = active_tids
    else:
        tids = [to_refresh] if to_refresh in active_tids else []

    if not tids:
        return

    tids = sorted(tids)

    for tid in tids:
        if tid not in State.tenants:
            State.tenants[tid] = TenantState()

        tenant_cache = State.tenants[tid].cache

        tenant_cache['redirects'] = {}
        tenant_cache['custodian'] = False
        tenant_cache['notification'] = ObjectDict()
        tenant_cache['notification'].admin_list = []
        tenant_cache['hostnames'] = []
        tenant_cache['onionnames'] = []
        tenant_cache['languages_enabled'] = []

    root_tenant_cache = State.tenants[1].cache

    for tid, lang in session.query(models.EnabledLanguage.tid, models.EnabledLanguage.name)\
                            .filter(models.EnabledLanguage.tid.in_(tids)):
        State.tenants[tid].cache['languages_enabled'].append(lang)

    for cfg in session.query(Config).filter(Config.tid.in_(tids)):
        tenant_cache = State.tenants[cfg.tid].cache

        if cfg.var_name in ['https_cert', 'tor_onion_key']:
            tenant_cache[cfg.var_name] = cfg.value
        elif cfg.var_name in ConfigFilters['node']:
            tenant_cache[cfg.var_name] = cfg.value
        elif cfg.var_name in ConfigFilters['notification']:
            tenant_cache['notification'][cfg.var_name] = cfg.value

    for tid, mail, pub_key in session.query(models.User.tid, models.User.mail_address, models.User.pgp_key_public) \
                                     .filter(models.User.role == 'admin',
                                             models.User.enabled.is_(True),
                                             models.User.notification.is_(True),
                                             models.User.tid.in_(tids)):
        State.tenants[tid].cache.notification.admin_list.extend([(mail, pub_key)])

    for custodian in session.query(models.User) \
                            .filter(models.User.role == 'custodian',
                                    models.User.enabled.is_(True),
                                    models.User.tid.in_(tids)):
        State.tenants[custodian.tid].cache['custodian'] = True

    for redirect in session.query(models.Redirect).filter(models.Redirect.tid.in_(tids)):
        State.tenants[redirect.tid].cache['redirects'][redirect.path1] = redirect.path2

    for tid in tids:
        tenant_cache = State.tenants[tid].cache

        State.tenant_uuid_id_map[tenant_cache.uuid] = tid

        if tenant_cache.hostname and tenant_cache.reachable_via_web:
            tenant_cache.hostnames.append(tenant_cache.hostname.encode())

        if tenant_cache.onionservice:
            tenant_cache.onionnames.append(tenant_cache.onionservice.encode())

        if not tenant_cache.onionservice and root_tenant_cache.onionservice:
            tenant_cache.onionservice = tenant_cache.subdomain + '.' + root_tenant_cache.onionservice

        if tenant_cache.subdomain:
            State.tenant_subdomain_id_map[tenant_cache.subdomain] = tid

            if root_tenant_cache.rootdomain and tenant_cache.reachable_via_web:
                tenant_cache.hostnames.append('{}.{}'.format(tenant_cache.subdomain, root_tenant_cache.rootdomain).encode())

            if root_tenant_cache.onionservice:
                tenant_cache.onionnames.append('{}.{}'.format(tenant_cache.subdomain, root_tenant_cache.onionservice).encode())

        State.tenant_hostname_id_map.update({h: tid for h in tenant_cache.hostnames + tenant_cache.onionnames})

    if getattr(State, 'tor'):
        State.tor.load_all_onion_services()

    if 1 in tids:
        log.setloglevel(State.tenants[1].cache.log_level)


@transact
def refresh_tenant_cache(session, tid=None):
    return db_refresh_tenant_cache(session, tid)


@transact_sync
def sync_refresh_tenant_cache(session, tid=None):
    return db_refresh_tenant_cache(session, tid)
