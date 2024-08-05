# -*- coding: utf-8 -*-
from sqlalchemy import not_
from sqlalchemy import or_
from globaleaks.models import Config, ConfigL10N, EnabledLanguage
from globaleaks.models.properties import *
from globaleaks.models.config_desc import ConfigDescriptor, ConfigFilters, ConfigL10NFilters
from globaleaks.utils.onion import generate_onion_service_v3


from globaleaks.utils.utility import datetime_null


import copy
# List of variables that on creation are set with the value
# they have on the root tenant
inherit_from_root_tenant = ['default_questionnaire']
default_tenant_keys = ["subdomain", "onionservice", "https_admin", "https_analyst", "https_cert", "wizard_done", "uuid", "mode", "default_language", "name"]


def get_default(default):
    if callable(default):
        return default()

    return default

def process_items(combined_values, pid, tid):
    result = {}
    p_result = {}
    t_result = {}
    for item in combined_values:
        if item.tid == pid:
            p_result[item.var_name] = item
            if item.var_name not in result:
                result[item.var_name] = item
        if item.tid == tid:
            t_result[item.var_name] = item
            result[item.var_name] = item

    return result, p_result, t_result

def db_get_configs(session, filter_name):
    configs = {}
    _configs = session.query(Config).filter(Config.var_name.in_(ConfigFilters[filter_name]))

    for c in _configs:
        if c.tid not in configs:
            configs[c.tid] = {}

        configs[c.tid][c.var_name] = c.value

    return configs


class ConfigFactory(object):
    def __init__(self, session, tid):
        self.session = session
        self.pid = 1000000
        self.tid = tid

    def get_all(self, filter_name):
        combined_values = self.session.query(Config).filter(
            Config.var_name.in_(ConfigFilters[filter_name]),
            or_(
                Config.tid == self.pid,
                Config.tid == self.tid
            )
        ).all()

        return process_items(combined_values, self.pid, self.tid)

    def update(self, filter_name, data):
        result, p_result, t_result = self.get_all(filter_name)
        for k, v in result.items():
            if k in data:
                if self.tid != self.pid:
                    if k in t_result:
                        if data[k] == p_result[k].value and k not in default_tenant_keys:
                            self.remove_val(k)
                        else:
                            v.set_v(data[k])
                    elif data[k] != p_result[k].value:
                        self.session.add(Config({'tid': self.tid, 'var_name': k, 'value': data[k]}))
                else:
                    v.set_v(data[k])

    def get_cfg(self, var_name):
        subquery = self.session.query(Config).filter(Config.var_name == var_name).filter(or_(Config.tid == self.tid, Config.tid == 1)).order_by(Config.tid.desc()).limit(2).subquery()
        return self.session.query(Config).select_entity_from(subquery).order_by(subquery.c.tid.desc()).first()

    def get_val(self, var_name):
        config = self.get_cfg(var_name)
        if config is None:
            return get_default(ConfigDescriptor[var_name].default)

        new_config = copy.deepcopy(config)
        new_config.tid = self.tid
        return new_config.value

    def set_val(self, var_name, value):
        v = self.get_cfg(var_name)
        if v:
            v.set_v(value)

    def remove_val(self, var_name):
        v = self.session.query(Config).filter(Config.tid == self.tid, Config.var_name == var_name).one_or_none()

        if v:
            self.session.delete(v)
            self.session.commit()

    def serialize(self, filter_name):
        values, _, _ = self.get_all(filter_name)
        return {k: v.value for k, v in values.items()}

    def update_defaults(self):
        actual = set([c[0] for c in self.session.query(Config.var_name).filter(Config.tid == self.tid)])
        allowed = set(ConfigDescriptor.keys())
        extra = list(actual - allowed)

        if extra:
            self.session.query(Config).filter(Config.tid == self.tid, Config.var_name.in_(extra)).delete(synchronize_session=False)

        missing = list(allowed - actual)
        for key in missing:
            self.session.add(Config({'tid': self.tid, 'var_name': key, 'value': get_default(ConfigDescriptor[key].default)}))


class ConfigL10NFactory(object):
    def __init__(self, session, tid):
        self.session = session
        self.pid = 1000000
        self.tid = tid

    def initialize(self, keys, lang, data):
        if self.tid == self.pid or self.tid == 1:
            for key in keys:
                value = data[key][lang] if key in data else ''
                self.session.add(ConfigL10N({'tid': self.tid, 'lang': lang, 'var_name': key, 'value': value}))

    def get_all(self, filter_name, lang):
        combined_values = self.session.query(ConfigL10N).filter(
            ConfigL10N.lang == lang,
            ConfigL10N.var_name.in_(ConfigL10NFilters[filter_name]),
            or_(
                ConfigL10N.tid == self.pid,
                ConfigL10N.tid == self.tid
            )
        ).all()

        result, p_result, t_result = process_items(combined_values, self.pid, self.tid)
        return list(result.values()), p_result, t_result

    def serialize(self, filter_name, lang):
        rows, _, _ = self.get_all(filter_name, lang)
        return {c.var_name: c.value for c in rows if c.var_name in ConfigL10NFilters[filter_name]}

    def update(self, filter_name, data, lang):
        result, p_result, t_result = self.get_all(filter_name, lang)
        c_map = {c.var_name: c for c in result}

        for key in (x for x in ConfigL10NFilters[filter_name] if x in data):
            if key in c_map:
                if self.tid != self.pid:
                    if key in t_result:
                        if data[key] == p_result[key].value and key not in default_tenant_keys:
                            self.remove_val(key, lang)
                        else:
                            c_map[key].set_v(data[key])
                    elif data[key] != p_result[key].value:
                        self.session.add(ConfigL10N({'tid': self.tid, 'lang': lang, 'var_name': key, 'value': data[key]}))
                else:
                    c_map[key].set_v(data[key])

    def update_defaults(self, filter_name, langs, data, reset=False):
        null = datetime_null()
        templates = data.get('templates', {})

        for lang in langs:
            old_keys = []

            values, _, _ = self.get_all(filter_name, lang)
            for cfg in values:
                old_keys.append(cfg.var_name)
                if (cfg.update_date == null or reset) and cfg.var_name in templates:
                    cfg.value = templates[cfg.var_name][lang]

            ConfigL10NFactory.initialize(self, list(set(ConfigL10NFilters[filter_name]) - set(old_keys)), lang, data)

    def get_val(self, var_name, lang):
        v = self.session.query(ConfigL10N.value).filter(ConfigL10N.tid == self.tid, ConfigL10N.lang == lang, ConfigL10N.var_name == var_name).one_or_none()
        if v is None:
            return ''

        return v.value

    def remove_val(self, var_name, lang):
        v = self.session.query(ConfigL10N).filter(ConfigL10N.tid == self.tid, ConfigL10N.lang == lang, ConfigL10N.var_name == var_name).one_or_none()
        if v:
            self.session.delete(v)
            self.session.commit()

    def set_val(self, var_name, lang, value):
        v = self.session.query(ConfigL10N).filter(ConfigL10N.tid == self.tid, ConfigL10N.lang == lang, ConfigL10N.var_name == var_name).one_or_none()
        if v:
            v.set_v(value)

    def reset(self, filter_name, data):
        langs = [x[0] for x in self.session.query(EnabledLanguage.name).filter(EnabledLanguage.tid == self.tid)]
        self.update_defaults(filter_name, langs, data, reset=True)


def db_get_config_variable(session, tid, var):
    return ConfigFactory(session, tid).get_val(var)


def db_set_config_variable(session, tid, var, val):
    ConfigFactory(session, tid).set_val(var, val)


def initialize_config(session, tid, data):
    variables = {}

    # Initialization valid for any tenant
    for name, desc in ConfigDescriptor.items():
        variables[name] = get_default(desc.default)

    if tid != 1:
        # Initialization valid for secondary tenants
        variables['mode'] = data['mode']

    if data['mode'] == 'default':
        variables['onionservice'], variables['tor_onion_key'] = generate_onion_service_v3()

    if data['mode'] == 'wbpa':
        root_tenant_node = ConfigFactory(session, 1).serialize('node')
        for name in inherit_from_root_tenant:
            variables[name] = root_tenant_node[name]

    if tid in (1, 1000000):
        variables.pop('default_profile', None)

    for name, value in variables.items():
        if tid in (1, 1000000) or name in default_tenant_keys:
            session.add(Config({'tid': tid, 'var_name': name, 'value': value}))

    default_profile = data.get('default_profile')
    if default_profile and default_profile != 'default':
        variables['default_profile'] = default_profile
        session.add(Config({'tid': tid, 'var_name': 'default_profile', 'value': default_profile}))

        default_config = session.query(Config).filter(
            Config.tid == default_profile,
        ).all()

        default_config_lang = session.query(ConfigL10N).filter(
            ConfigL10N.tid == default_profile,
        ).all()

        for item in default_config:
            if item.var_name not in default_tenant_keys:
                session.add(Config({'tid': tid, 'var_name': item.var_name, 'value': item.value}))

        for item in default_config_lang:
                session.add(ConfigL10N({'tid': tid,'lang': item.lang, 'var_name': item.var_name, 'value': item.value}))

def add_new_lang(session, tid, lang, appdata_dict):
    l = EnabledLanguage()
    l.tid = tid
    l.name = lang
    session.add(l)

    ConfigL10NFactory(session, tid).initialize(ConfigL10NFilters['node'], lang, appdata_dict['node'])
    ConfigL10NFactory(session, tid).initialize(ConfigL10NFilters['notification'], lang, appdata_dict['templates'])


def update_defaults(session, tid, appdata):
    ConfigFactory(session, tid).update_defaults()

    langs = [x[0] for x in session.query(EnabledLanguage.name).filter(EnabledLanguage.tid == tid)]

    session.query(ConfigL10N).filter(ConfigL10N.tid == tid, not_(ConfigL10N.var_name.in_(list(set(ConfigL10NFilters['node']).union(ConfigL10NFilters['notification']))))).delete(synchronize_session=False)

    ConfigL10NFactory(session, tid).update_defaults('node', langs, appdata['node'])
    ConfigL10NFactory(session, tid).update_defaults('notification', langs, appdata['templates'])