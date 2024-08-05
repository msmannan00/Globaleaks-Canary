# -*- coding: UTF-8 -*-
from globaleaks.db.migrations.update import MigrationBase
from globaleaks.models import Config, Model
from globaleaks.models.properties import *
from globaleaks.utils.utility import datetime_now
from globaleaks.models.config_desc import ConfigDescriptor
from globaleaks.models.config import get_default

class Tenant_v_68(Model):
    __tablename__ = 'tenant'
    __table_args__ = {'sqlite_autoincrement': False}

    id = Column(Integer, primary_key=True, autoincrement=False)
    creation_date = Column(DateTime, default=datetime_now, nullable=False)
    active = Column(Boolean, default=False, nullable=False)

class MigrationScript(MigrationBase):


    def migrate_Tenant(self):
        MigrationScript.skip_count_check['Tenant'] = True
        MigrationScript.skip_count_check['Config'] = True

        # Query to fetch all tenants from the old session
        tenant_query = self.session_old.query(self.model_from['Tenant'])
        
        # Store the total number of tenants in a variable
        total_tenants = tenant_query.count()

        # Migrate tenant data
        for old_obj in tenant_query:
            new_obj = self.model_to['Tenant']()
            for key in new_obj.__mapper__.column_attrs.keys():
                setattr(new_obj, key, getattr(old_obj, key, None))
            self.session_new.add(new_obj)

        # Create a new tenant object with a specific ID and details
        new_tenant = self.model_to['Tenant']()
        new_tenant.id = 1000000
        new_tenant.creation_date = datetime_now()
        new_tenant.active = False
        self.session_new.add(new_tenant)

        # Add default configuration entries for tid=1000000
        self.add_default_config_entries(tid=1000000)

        # Manually add configuration entries for tid=1
        config_first = self.session_new.query(self.model_to['Config']).filter_by(tid=1).first()
        if config_first is not None:
            print('Adding configuration entries for tid=1...')
            config_entries = [
                ('tenant_counter', total_tenants),
                ('profile_counter', 999999),
            ]
            self.add_config_entries(config_entries, tid=1)


        default_config = self.get_config_entries(tid=1000000)
            
            # Retrieve all tenant ids excluding 1000000 and 1
        tenant_ids = self.session_new.query(Config.tid).distinct().filter(Config.tid.notin_([1000000, 1])).all()
        tenant_ids = [tid for tid, in tenant_ids]  # Extracting list of tenant ids from query result
    
            # Iterate over tenant IDs to compare and remove matching entries
        for tid in tenant_ids:
                self.remove_matching_entries(tid, default_config)
            # Committing the transaction to save all changes
        self.session_new.commit()
        
    def get_config_entries(self, tid):
        """Fetch all configuration entries for a given tenant ID."""
        entries = self.session_new.query(Config).filter_by(tid=tid).all()
        return {entry.var_name: entry.value for entry in entries}

    def add_default_config_entries(self, tid):
        """Add default configuration entries based on ConfigDescriptor."""
        variables = {}
        for name, desc in ConfigDescriptor.items():
            variables[name] = get_default(desc.default)
        for var_name, value in variables.items():
            config_entry = self.session_new.query(self.model_to['Config']).filter_by(
                tid=tid, var_name=var_name).first()

            if config_entry is None:
                new_config = self.model_to['Config']()
                new_config.tid = tid
                new_config.var_name = var_name
                new_config.value = value
                new_config.update_date = datetime_now()
                self.session_new.add(new_config)

    def add_config_entries(self, entries, tid):
        """Add specified configuration entries for a given tid."""
        for var_name, value in entries:
            new_config = self.model_to['Config']()
            new_config.tid = tid
            new_config.var_name = var_name
            new_config.value = value
            new_config.update_date = datetime_now()
            self.session_new.add(new_config)


    def remove_matching_entries(self, tid, default_config):
        """Remove config entries that match default config values."""
        # Fetch all configuration entries for the given tenant ID
        default_tenant_keys = ["subdomain", "onionservice", "https_admin", "https_analyst", "https_cert", "wizard_done", "uuid", "mode", "default_language", "name"]
        tenant_config = self.get_config_entries(tid=tid)
        for var_name, value in tenant_config.items():
            if var_name in default_config:
                # Check if value matches the default and not in default_tenant_keys
                if value == default_config[var_name] and var_name not in default_tenant_keys:
                    self.remove_val(tid, var_name)

    def remove_val(self, tid, var_name):
        """Remove a configuration entry for a specific tenant ID and variable name."""
        entry = self.session_new.query(Config).filter_by(tid=tid, var_name=var_name).one_or_none()
        if entry:
            self.session_new.delete(entry)
            self.session_new.commit()