import { Component, Input } from '@angular/core';
import { UtilsService } from '@app/shared/services/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatorPipe } from '@app/shared/pipes/translate';

@Component({
    selector: 'src-otkc-access',
    templateUrl: './otkc-access.component.html',
    standalone: true,
    imports: [
        FormsModule,
        TranslateModule,
        TranslatorPipe,
    ],
})
export class OtkcAccessComponent {
  @Input() arg: { receipt: any, formatted_receipt: any };
 
  confirmFunction: () => void;
  constructor(private modalService: NgbModal, protected utils: UtilsService) {
  }

  confirm() {
    this.confirmFunction();
    this.cancel();
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
