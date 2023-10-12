export class preferenceResolverModel {
  id: string;
  creation_date: string;
  username: string;
  salt: string;
  orm: string;
  role: string;
  enabled: boolean;
  require_two_factor: boolean = false;
  last_login: string;
  name: string;
  description: string;
  public_name: string;
  mail_address: string;
  change_email_address: string;
  language: string;
  password_change_needed: boolean;
  password_change_date: string;
  pgp_key_fingerprint: string;
  pgp_key_public: string;
  pgp_key_expiration: string;
  pgp_key_remove: boolean;
  picture: boolean;
  tid: number;
  notification: boolean;
  encryption: boolean;
  escrow: boolean;
  two_factor: boolean = false;
  forcefully_selected: boolean;
  can_postpone_expiration: boolean;
  can_delete_submission: boolean;
  can_grant_access_to_reports: boolean;
  can_edit_general_settings: boolean;
  can_transfer_access_to_reports: boolean;
  clicked_recovery_key: boolean;
  contexts: any[];
}
