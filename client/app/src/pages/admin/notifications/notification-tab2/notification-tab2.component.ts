import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { NotificationsResolver } from 'app/src/shared/resolvers/notifications.resolver';
import { UtilsService } from 'app/src/shared/services/utils.service';

@Component({
  selector: 'src-notification-tab2',
  templateUrl: './notification-tab2.component.html',
  styleUrls: ['./notification-tab2.component.css']
})
export class NotificationTab2Component implements OnInit {
  @Input() notificationForm: NgForm;
  template: any
  notificationData: any = []
  constructor(public node: NodeResolver, public notification: NotificationsResolver, public utilsService: UtilsService) { }

  ngOnInit(): void {
    this.notificationData = this.notification.dataModel
  }
  updateNotification(notification: any) {
    this.utilsService.updateAdminNotification(notification).subscribe(res => {
      // this.utilsService.reloadCurrentRoute();
    })
  }
}
