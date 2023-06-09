import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecieverTipService } from 'app/src/services/recievertip.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';


@Component({
    selector: 'src-tip-operation-set-reminder',
    templateUrl: './tip-operation-set-reminder.component.html',
    styleUrls: ['./tip-operation-set-reminder.component.css']
})
export class TipOperationSetReminderComponent {
    request_motivation: any;
    model: NgbDateStruct;
    @Input() args: any;
 


    confirm() {
        this.cancel()

        if (this.args.operation === "postpone" || this.args.operation === "set_reminder") {
            let date: number;
            if (this.args.operation === "postpone")
                date = this.args.expiration_date.getTime();
            else{
                // date = this.args.reminder_date.getTime();
                date = new Date().getTime();
            }

            const req = {
                "operation": this.args.operation,
                "args": {
                    "value": date
                }
            };

            return this.http.put("api/rtips/" + this.args.tip.id, req)
                .subscribe(() => {
                    this.reload();
                });
        } 
        return;
    }
    disableReminder() {
        this.cancel()
        const req = {
            "operation": "set_reminder",
            "args": {
              "value": 32503680000000
            }
          };
          this.http.put("api/rtips/" + this.args.tip.id, req)
          .subscribe(() => {
            this.reload();
          });
    }
    reload() {
        this.utils.reloadCurrentRoute();
    }

    cancel() {
        this.modalService.dismissAll();
    }
   
    ngOnInit() {
    }

    constructor(
        private modalService: NgbModal,
        public tipsService: RecieverTipService,
        public http: HttpClient,
        public utils: UtilsService,
        public activeModal: NgbActiveModal,
        private router: Router) {
    }
}
