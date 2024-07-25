import {Component} from "@angular/core";
import {tenantResolverModel} from "@app/models/resolvers/tenant-resolver-model";
import {HttpService} from "@app/shared/services/http.service";


@Component({
  selector: 'src-sites-tab3',
  templateUrl: './sites-tab3.component.html',
})
export class SitesTab3Component {
  search: string;
  newTenant: { name: string, active: boolean, profile_id?: string, mode: string, subdomain: string } = {
    name: "",
    active: true,
    mode: "default",
    profile_id: "default",
    subdomain: ""
  };
  tenants: tenantResolverModel[];
  showAddTenant: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  indexNumber: number = 0;

  ngOnInit(): void {
    this.httpService.fetchProfileTenant().subscribe(
      tenants => {
        this.tenants = tenants;
      }
    );
  }

  toggleAddTenant() {
    this.showAddTenant = !this.showAddTenant;
  }

  constructor(private httpService: HttpService) {
  }

  addTenant() {
    this.httpService.addProfileTenant(this.newTenant).subscribe(res => {
      this.tenants.push(res);
      this.newTenant.name = "";
    });
  }
}
