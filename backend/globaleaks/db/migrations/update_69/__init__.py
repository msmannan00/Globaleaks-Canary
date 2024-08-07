# -*- coding: UTF-8 -*-
from globaleaks import models
from globaleaks.db.migrations.update import MigrationBase
from globaleaks.models import Model
from globaleaks.models.properties import *
from globaleaks.utils.utility import datetime_now
from globaleaks.models.config_desc import ConfigDescriptor
from globaleaks.models.config import get_default
from globaleaks.db.appdata import load_appdata

class Tenant_v_68(Model):
    __tablename__ = 'tenant'
    __table_args__ = {'sqlite_autoincrement': False}

    id = Column(Integer, primary_key=True, autoincrement=False)
    creation_date = Column(DateTime, default=datetime_now, nullable=False)
    active = Column(Boolean, default=False, nullable=False)

class MigrationScript(MigrationBase):

    def migrate_Tenant(self):
        # Define default tenant keys that should not be removed
        default_tenant_keys = ["subdomain", "onionservice", "https_admin", "https_analyst", "https_cert",
                               "wizard_done", "uuid", "mode", "default_language", "name"]
    
        # Migrate existing tenants
        tenant_query = self.session_old.query(self.model_from['Tenant'])
        total_tenants = tenant_query.count()
    
        for old_obj in tenant_query:
            new_obj = self.model_to['Tenant']()
            for key in new_obj.__mapper__.column_attrs.keys():
                setattr(new_obj, key, getattr(old_obj, key, None))
            self.session_new.add(new_obj)
    
        # Add a new tenant with id 1000000
        new_tenant = self.model_to['Tenant']()
        new_tenant.id = 1000000
        new_tenant.creation_date = datetime_now()
        new_tenant.active = False
        self.session_new.add(new_tenant)
        self.entries_count['Tenant'] += 1
        self.session_new.commit()
    
        # Handle configurations
        self.handle_configurations(total_tenants, default_tenant_keys)
    
    def handle_configurations(self, total_tenants, default_tenant_keys):
        # Insert default configurations for the new tenant
        variables = {name: get_default(desc.default) for name, desc in ConfigDescriptor.items()}
        for var_name, value in variables.items():
            if not self.session_new.query(self.model_to['Config']).filter_by(tid=1000000, var_name=var_name).first():
                new_config = self.model_to['Config']()
                new_config.tid = 1000000
                new_config.var_name = var_name
                new_config.value = value
                new_config.update_date = datetime_now()
                self.session_new.add(new_config)
                self.entries_count['Config'] += 1
        models.config.add_new_lang(self.session_new, 1000000, 'en', load_appdata())
        self.entries_count['ConfigL10N'] += 72
        self.entries_count['EnabledLanguage'] += 1
        # Set up special configuration entries for tid=1
        special_entries = [('tenant_counter', total_tenants),('profile_counter', 999999)]
        for var_name, value in special_entries:
            if not self.session_new.query(self.model_to['Config']).filter_by(tid=1, var_name=var_name).first():
                new_config = self.model_to['Config']()
                new_config.tid = 1
                new_config.var_name = var_name
                new_config.value = value
                new_config.update_date = datetime_now()
                self.session_new.add(new_config)
                self.entries_count['Config'] += 1
        self.session_new.commit()
    
        # Remove redundant configurations for other tenants
        default_config = {entry.var_name: entry.value for entry in self.session_new.query(self.model_to['Config']).filter_by(tid=1000000).all()}
        tenant_ids = [tid for tid, in self.session_new.query(self.model_to['Config'].tid).distinct().filter(self.model_to['Config'].tid.notin_([1000000, 1])).all()]
    
        for tid in tenant_ids:
            tenant_config = {entry.var_name: entry.value for entry in self.session_new.query(self.model_to['Config']).filter_by(tid=tid).all()}
            for var_name, value in tenant_config.items():
                if var_name in default_config and value == default_config[var_name] and var_name not in default_tenant_keys:
                    entry = self.session_new.query(self.model_to['Config']).filter_by(tid=tid, var_name=var_name).one_or_none()
                    if entry:
                        self.session_new.delete(entry)
                        self.entries_count['Config'] -= 1
                        self.session_new.commit()