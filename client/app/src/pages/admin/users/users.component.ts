import { Component } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { TenantsResolver } from 'app/src/shared/resolvers/tenants.resolver';
import { UtilsService } from 'app/src/shared/services/utils.service';

@Component({
  selector: 'src-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  showAddUser = false;
  constructor(public node: NodeResolver, public tenants: TenantsResolver,public utilsService: UtilsService) { }

  ngOnInit(): void {
    // if (this.node.dataModel.root_tenant) {
    //   this.adminTenantResource.query().subscribe(
    //     (result: any) => {
    //       this.resources.tenants = result;
    //       this.tenants_by_id = this.Utils.array_to_map(this.resources.tenants);
    //     },
    //     (error: any) => {
    //       console.error('Error fetching tenants:', error);
    //     }
    //   );
    // }
  }
  toggleAddUser(): void {
    this.showAddUser = !this.showAddUser;
  }
}
