import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecieverTipService } from 'app/src/services/recievertip.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';


@Component({
  selector: 'src-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {

  @Input() args: any;
  @Input() selected_tips: any;
  @Input() operation: any;
  confirmFunction: () => void;

  confirm() {
    this.cancel()
    this.confirmFunction()
    if (this.args) {
      if (this.args.operation === "delete") {
        return this.http.delete("api/rtips/" + this.args.tip.id)
          .subscribe(() => {
            this.router.navigate(['/recipient/reports']);
          });
      }
      return;
    }
    if (this.operation) {
      if (["delete"].indexOf(this.operation) === -1) {
        return;
      }
    }

    if (this.selected_tips) {
      return this.utils.runRecipientOperation(this.operation, { "rtips": this.selected_tips }, true).subscribe({
        next: response => {
          this.utils.reloadCurrentRoute()
        },
        error: (error: any) => {
          alert(JSON.stringify(error))
        }
      });
    } else {
      return null
    }

  }

  reload() {
    this.utils.reloadCurrentRoute();
  }

  cancel() {
    this.modalService.dismissAll();
  }

  constructor(
    private modalService: NgbModal,
    public tipsService: RecieverTipService,
    public http: HttpClient,
    public utils: UtilsService,
    public router: Router
  ) {
  }

  ngOnInit() {
  }
}
