import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NotificationsRoutingModule} from "@app/pages/admin/notifications/notifications-routing.module";
import {NotificationsComponent} from "@app/pages/admin/notifications/notifications.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbNavModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";

import {NotificationTab1Component} from "@app/pages/admin/notifications/notification-tab1/notification-tab1.component";
import {NotificationTab2Component} from "@app/pages/admin/notifications/notification-tab2/notification-tab2.component";


@NgModule({
    imports: [
    CommonModule,
    NotificationsRoutingModule, NgbNavModule, NgbModule, RouterModule, FormsModule, NgSelectModule,
    NotificationsComponent,
    NotificationTab1Component,
    NotificationTab2Component,
]
})
export class NotificationsModule {
}