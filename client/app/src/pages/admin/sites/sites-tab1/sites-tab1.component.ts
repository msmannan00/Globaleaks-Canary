import {Component, OnInit} from "@angular/core";
import {tenantResolverModel} from "@app/models/resolvers/tenant-resolver-model";
import {HttpService} from "@app/shared/services/http.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "src-sites-tab1",
  templateUrl: "./sites-tab1.component.html"
})
export class SitesTab1Component implements OnInit {
  search: string;
  newTenant: { name: string, active: boolean, mode: string, profile_id?: string, subdomain: string } = {
    name: "",
    active: true,
    mode: "default",
    profile_id: "default",
    subdomain: ""
  };
  tenants: tenantResolverModel[];
  profileTenants: tenantResolverModel[];
  showAddTenant: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  indexNumber: number = 0;

  ngOnInit(): void {
    this.fetchTenants();
  }

  fetchTenants() {
    forkJoin({
      tenants: this.httpService.fetchTenant(),
      profileTenants: this.httpService.fetchProfileTenant()
    }).subscribe({
      next: ({ tenants, profileTenants }) => {
        this.tenants = tenants;
        this.profileTenants = profileTenants;
      },
    });
  }
  
  toggleAddTenant() {
    this.showAddTenant = !this.showAddTenant;
  }

  constructor(private httpService: HttpService) {
  }

  addTenant() {
    this.httpService.addTenant(this.newTenant).subscribe(res => {
      this.tenants.push(res);
      this.newTenant.name = "";
      this.newTenant.profile_id = "default";
    });
  }
}