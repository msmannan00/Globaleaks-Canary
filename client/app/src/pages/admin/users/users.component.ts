import { Component, OnInit } from '@angular/core';
import { userResolverModel } from 'app/src/models/resolvers/userResolverModel';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { TenantsResolver } from 'app/src/shared/resolvers/tenants.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';
import { Constants } from 'app/src/shared/constants/constants';
import { UsersResolver } from 'app/src/shared/resolvers/users.resolver';
import { AuthenticationService } from 'app/src/services/authentication.service';
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';
@Component({
  selector: 'src-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  showAddUser = false;
  tenantData: any = {}
  usersData: any 
  new_user: any = {};
  editing = false;
  protected readonly Constants = Constants;

  constructor(public preference:PreferenceResolver,public httpService: HttpService,public authenticationService: AuthenticationService, public node: NodeResolver,public users:UsersResolver, public tenants: TenantsResolver, public utilsService: UtilsService) { }

  ngOnInit(): void {
    if(this.users.dataModel){
      this.usersData = this.users.dataModel
    }
    if (this.node.dataModel.root_tenant) {
      this.tenantData = this.tenants.dataModel
      // this.tenants_by_id = this.Utils.array_to_map(this.resources.tenants);

      // this.httpService.requestAdminTenantResource().subscribe(
      //   (result: any) => {
      //     this.resources.tenants = result;
      //     this.tenants_by_id = this.Utils.array_to_map(this.resources.tenants);
      //   },
      //   (error: any) => {
      //     console.error('Error fetching tenants:', error);
      //   }
      // );
    }
  }
  handleDataFromChild(data: string) {
    this.utilsService.reloadCurrentRoute();
  }
  add_user(): void {
    var user: userResolverModel = this.utilsService.new_user();

    user.username = typeof this.new_user.username !== 'undefined' ? this.new_user.username : '';
    user.role = this.new_user.role;
    user.name = this.new_user.name;
    user.mail_address = this.new_user.email;
    user.language = this.node.dataModel.default_language;
    this.utilsService.addAdminUser(user).subscribe(res => {
      this.usersData.push(res);
      this.new_user = {};
    })
  }
  toggleAddUser(): void {
    this.showAddUser = !this.showAddUser;
  }
}
