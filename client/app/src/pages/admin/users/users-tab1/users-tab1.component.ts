import {Component, OnInit} from "@angular/core";
import {new_user} from "app/src/models/admin/new_user";
import {Constants} from "app/src/shared/constants/constants";
import {NodeResolver} from "app/src/shared/resolvers/node.resolver";
import {TenantsResolver} from "app/src/shared/resolvers/tenants.resolver";
import {UsersResolver} from "app/src/shared/resolvers/users.resolver";
import {HttpService} from "app/src/shared/services/http.service";
import {UtilsService} from "app/src/shared/services/utils.service";

@Component({
  selector: "src-users-tab1",
  templateUrl: "./users-tab1.component.html"
})
export class UsersTab1Component implements OnInit {
  showAddUser = false;
  tenantData: any = {};
  usersData: any;
  new_user: any = {};
  editing = false;
  protected readonly Constants = Constants;

  constructor(private httpService: HttpService, public nodeResolver: NodeResolver, private usersResolver: UsersResolver, private tenantsResolver: TenantsResolver, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    if (this.usersResolver.dataModel) {
      this.usersData = this.usersResolver.dataModel;
    }
    if (this.nodeResolver.dataModel.root_tenant) {
      this.tenantData = this.tenantsResolver.dataModel;

    }
  }

  handleDataFromChild() {
    this.getResolver();
  }

  add_user(): void {
    let user: new_user = new new_user();

    user.username = typeof this.new_user.username !== "undefined" ? this.new_user.username : "";
    user.role = this.new_user.role;
    user.name = this.new_user.name;
    user.mail_address = this.new_user.email;
    user.language = this.nodeResolver.dataModel.default_language;
    this.utilsService.addAdminUser(user).subscribe(_ => {
      this.getResolver();
      this.new_user = {};
    });
  }

  getResolver() {
    return this.httpService.requestUsersResource().subscribe(response => {
      this.usersResolver.dataModel = response;
      this.usersData = response;
    });
  }

  toggleAddUser(): void {
    this.showAddUser = !this.showAddUser;
  }
}