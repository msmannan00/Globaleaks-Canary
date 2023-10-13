import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {NotificationsRoutingModule} from "./notifications-routing.module";
import {NotificationsComponent} from "./notifications.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbNavModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {SharedModule} from "app/src/shared.module";
import {NotificationTab1Component} from "./notification-tab1/notification-tab1.component";
import {NotificationTab2Component} from "./notification-tab2/notification-tab2.component";


@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationTab1Component,
    NotificationTab2Component
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule, SharedModule, NgbNavModule, NgbModule, RouterModule, FormsModule, NgSelectModule,
  ]
})
export class NotificationsModule {
}