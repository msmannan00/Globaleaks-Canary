export class tenantResolverModel {
  id: number;
  creation_date: string;
  active: boolean;
  hostname: string;
  mode: string;
  profile_tenant_id?: string;
  name: string;
  onionservice: string;
  rootdomain: string;
  subdomain: string;
}