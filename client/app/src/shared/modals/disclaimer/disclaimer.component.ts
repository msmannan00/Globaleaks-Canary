import {Component, OnInit} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppDataService} from "@app/app-data.service";
import {Node} from "@app/models/app/public-model";
import { MarkdownComponent } from "ngx-markdown";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";
import { StripHtmlPipe } from "@app/shared/pipes/strip-html.pipe";

@Component({
    selector: "src-disclaimer",
    templateUrl: "./disclaimer.component.html",
    standalone: true,
    imports: [
        MarkdownComponent,
        TranslateModule,
        TranslatorPipe,
        StripHtmlPipe,
    ],
})
export class DisclaimerComponent implements OnInit {
  nodeData: Node;

  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal, protected appDataService: AppDataService) {
  }

  confirmFunction: () => void;

  ngOnInit(): void {
    if (this.appDataService.public.node) {
      this.nodeData = this.appDataService.public.node;
    }
  }

  confirm() {
    this.confirmFunction();
    return this.activeModal.close();
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
