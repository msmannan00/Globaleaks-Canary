import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct, NgbDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecieverTipService } from 'app/src/services/recievertip.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';

@Component({
    selector: 'src-tip-operation-postpone',
    templateUrl: './tip-operation-postpone.component.html',
    styleUrls: ['./tip-operation-postpone.component.css']
})
export class TipOperationPostponeComponent {
    request_motivation: any;
    model: NgbDateStruct;
    @Input() args: any;
    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;


    confirm() {
        this.cancel()

        if (this.args.operation === "postpone" || this.args.operation === "set_reminder") {
            let date: number;

            const { year, month, day } = this.args.expiration_date;
            let dateData = new Date(year, month - 1, day);
            const timestamp = dateData.getTime();

            if (this.args.operation === "postpone")
                date = timestamp;
            // date = this.args.expiration_date.getTime();
            else {
                date = this.args.reminder_date.getTime();
                // date = new Date().getTime();
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
    reload() {
        this.utils.reloadCurrentRoute();
    }

    cancel() {
        this.modalService.dismissAll();
    }

    ngOnInit() {
        if (this.args && this.args.expiration_date) {
            const expirationDate = this.args.expiration_date;
            const ngbExpirationDate: NgbDateStruct = {
                year: expirationDate.getUTCFullYear(),
                month: expirationDate.getUTCMonth() + 1,
                day: expirationDate.getUTCDate()
            };
            this.args.expiration_date = ngbExpirationDate;
        }

        if (this.args && this.args.dateOptions) {
            this.minDate = this.parseNgbDate(this.args.dateOptions.minDate);
            this.maxDate = this.parseNgbDate(this.args.dateOptions.maxDate);
        }
    }
   private parseNgbDate(date: any): NgbDateStruct {
    const dateObj = new Date(date);
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() + 1; // Months are zero-based, so add 1
    const day = dateObj.getUTCDate();

    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      return { year, month, day };
    }
  // Handle invalid or null input by returning a default value or an empty NgbDateStruct
  return { year: 0, month: 0, day: 0 };
}

      
    constructor(
        private modalService: NgbModal,
        public tipsService: RecieverTipService,
        public http: HttpClient,
        public utils: UtilsService,
        public activeModal: NgbActiveModal,
        private router: Router,
        private config: NgbDatepickerConfig) {
    }
}
