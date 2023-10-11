import {AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'app/src/app-data.service';
import { RecieverTipService } from 'app/src/services/recievertip.service';
import { GrantAccessComponent } from 'app/src/shared/modals/grant-access/grant-access.component';
import { RevokeAccessComponent } from 'app/src/shared/modals/revoke-access/revoke-access.component';
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';
import { Observable } from 'rxjs';
import { FieldUtilitiesService } from 'app/src/shared/services/field-utilities.service';
import { TipOperationSetReminderComponent } from 'app/src/shared/modals/tip-operation-set-reminder/tip-operation-set-reminder.component';
import { DeleteConfirmationComponent } from 'app/src/shared/modals/delete-confirmation/delete-confirmation.component';
import { HttpClient } from '@angular/common/http';
import { TipOperationPostponeComponent } from 'app/src/shared/modals/tip-operation-postpone/tip-operation-postpone.component';
import { CryptoService } from "../../../crypto.service";
import { TransferAccessComponent } from 'app/src/shared/modals/transfer-access/transfer-access.component';
import { AuthenticationService } from 'app/src/services/authentication.service';


@Component({
  selector: 'src-tip',
  templateUrl: './tip.component.html',
})
export class TipComponent implements AfterViewInit {
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  @ViewChild('tab2') tab2!: TemplateRef<any>;
  @ViewChild('tab3') tab3!: TemplateRef<any>;

  tip_id: string | null;
  itemsPerPage: number = 5;
  currentCommentsPage: number = 1;
  answers: any = {};
  uploads: any = {};
  questionnaire: any = {};
  rows: any = {}
  tip: any = {};
  contexts_by_id: any;
  submission_statuses: any;
  score: any;
  ctx: string;
  submission: {};
  fileupload_url: string;
  showEditLabelInput: boolean;
  tabs: any[];
  active:string

  constructor(
    private cdr: ChangeDetectorRef,
    private cryptoService: CryptoService,
    public utils: UtilsService,
    public preferencesService: PreferenceResolver,
    public modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    public httpService: HttpService,
    public http: HttpClient,
    public appDataService: AppDataService,
    public rtipService: RecieverTipService,
    public fieldUtilities: FieldUtilitiesService,
    public authenticationService: AuthenticationService,
  ) {
    this.loadTipDate();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.active="Everyone"
      this.tabs = [
        {
          title: 'Everyone',
          component: this.tab1
        },
        {
          title: 'Recipients only',
          component: this.tab2
        },
        {
          title: 'Only me',
          component: this.tab3
        },
      ];
      this.cdr.detectChanges()
    });
  }

  loadTipDate() {
    this.tip_id = this.activatedRoute.snapshot.paramMap.get('tip_id');
    let requestObservable: Observable<any> = this.httpService.recieverTip(this.tip_id)
    requestObservable.subscribe(
      {
        next: (response: any) => {
          this.rtipService.initialize(response)
          this.tip = this.rtipService.tip
          this.activatedRoute.queryParams.subscribe((params: { [x: string]: any; }) => {
            this.tip.tip_id = params['tip_id']
          });

          this.tip.receivers_by_id = this.utils.array_to_map(this.tip.receivers);
          this.score = this.tip.score;
          this.ctx = "rtip";
          this.showEditLabelInput = this.tip.label === "";
          this.preprocessTipAnswers(this.tip);
          this.tip.submissionStatusStr = this.utils.getSubmissionStatusText(this.tip.status, this.tip.substatus, this.appDataService.submission_statuses)
          this.submission = {};
          this.cdr.detectChanges()
        }
      }
    )
  }

  openGrantTipAccessModal(): void {
    this.utils.runUserOperation("get_users_names", {}, true).subscribe((response: any) => {
      const modalRef = this.modalService.open(GrantAccessComponent);
      modalRef.componentInstance.args = {
        users_names: response
      };
      modalRef.componentInstance.confirmFun = (receiver_id: any) => {
        const req = {
          operation: "grant",
          args: {
            receiver: receiver_id
          },
        };
        this.httpService.tipOperation(req.operation, req.args, this.rtipService.tip.id)
          .subscribe(() => {
            this.reload();
          });
      };

      modalRef.componentInstance.cancelFun = null;
    });
  }

  openRevokeTipAccessModal() {
    this.utils.runUserOperation("get_users_names", {}, true).subscribe(
      {
        next: response => {
          const modalRef = this.modalService.open(RevokeAccessComponent);
          modalRef.componentInstance.args = {
            users_names: response
          };
          modalRef.componentInstance.confirmFun = (receiver_id: any) => {
            const req = {
              operation: "revoke",
              args: {
                receiver: receiver_id
              },
            };
            this.httpService.tipOperation(req.operation, req.args, this.rtipService.tip.id)
              .subscribe(() => {
                this.reload();
              });
          };
          modalRef.componentInstance.cancelFun = null;
        }
      }
    );
  }

  openTipTransferModal() {
    this.utils.runUserOperation("get_users_names", {}, true).subscribe(
      {
        next: (response: any) => {
          const selectableRecipients: any = [];
          this.appDataService.public.receivers.forEach(async (receiver: { id: string | number; }) => {
            if (receiver.id !== this.authenticationService.session.user_id && !this.tip.receivers_by_id[receiver.id]) {
              selectableRecipients.push(receiver);
            }
          });
          const modalRef = this.modalService.open(TransferAccessComponent);
          modalRef.componentInstance.usersNames = response;
          modalRef.componentInstance.selectableRecipients = selectableRecipients;
          modalRef.result.then(
            (receiverId) => {
              if (receiverId) {
                const req = {
                  operation: 'transfer',
                  args: {
                    receiver: receiverId,
                  },
                };
                this.http
                  .put(`api/recipient/rtips/${this.tip.id}`, req)
                  .subscribe(() => { });
              }
            },
            () => {
            }
          );
        }
      }
    )
  }

  reload(): void {
    this.utils.reloadCurrentRoute();
  }
  filterNotTriggeredField(parent: any, field: any, answers: any): void {
    let i;
    if (this.fieldUtilities.isFieldTriggered(parent, field, answers, this.tip.score)) {
      for (i = 0; i < field.children.length; i++) {
        this.filterNotTriggeredField(field, field.children[i], answers);
      }
    }
  }

  preprocessTipAnswers(tip: any) {
    let x, i, j, k, step;

    for (x = 0; x < tip.questionnaires.length; x++) {
      this.questionnaire = tip.questionnaires[x];
      this.fieldUtilities.parseQuestionnaire(this.questionnaire, {});

      for (i = 0; i < this.questionnaire.steps.length; i++) {
        step = this.questionnaire.steps[i];
        if (this.fieldUtilities.isFieldTriggered(null, step, this.questionnaire.answers, this.tip.score)) {
          for (j = 0; j < step.children.length; j++) {
            this.filterNotTriggeredField(step, step.children[j], this.questionnaire.answers);
          }
        }
      }

      for (i = 0; i < this.questionnaire.steps.length; i++) {
        step = this.questionnaire.steps[i];
        j = step.children.length;
        while (j--) {
          if (step.children[j]["template_id"] === "whistleblower_identity") {
            this.tip.whistleblower_identity_field = step.children[j];
            this.tip.whistleblower_identity_field.enabled = true;
            step.children.splice(j, 1);

            this.questionnaire = {
              steps: [{ ... this.tip.whistleblower_identity_field }]
            };

            this.tip.fields = this.questionnaire.steps[0].children;
            this.rows = this.fieldUtilities.splitRows(this.tip.fields);
            this.fieldUtilities.onAnswersUpdate(this);

            for (k = 0; k < this.tip.whistleblower_identity_field.children.length; k++) {
              this.filterNotTriggeredField(this.tip.whistleblower_identity_field, this.tip.whistleblower_identity_field.children[k], this.tip.data.whistleblower_identity);
            }
          }
        }
      }
    }
  }

  tipToggleStar() {
    this.httpService.tipOperation("set", { "key": "important", "value": !this.rtipService.tip.important }, this.rtipService.tip.id)
      .subscribe(() => {
        this.rtipService.tip.important = !this.rtipService.tip.important;
      });
  }
  tipNotify(enable: boolean) {
    this.httpService.tipOperation("set", { "key": "enable_notifications", "value": enable }, this.rtipService.tip.id)
      .subscribe(() => {
        this.rtipService.tip.enable_notifications = enable;
      });
  }

  tipDelete() {
    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.args = {
      tip: this.rtipService.tip,
      operation: "delete"
    };
  }
  setReminder() {
    const modalRef = this.modalService.open(TipOperationSetReminderComponent);
    modalRef.componentInstance.args = {
      tip: this.rtipService.tip,
      operation: "set_reminder",
      contexts_by_id: this.contexts_by_id,
      reminder_date: this.utils.getPostponeDate(this.appDataService.contexts_by_id[this.tip.context_id].tip_reminder),
      dateOptions: {
        minDate: new Date(this.tip.creation_date)
      },
      opened: false,

    };
  }
  tip_postpone() {
    const modalRef = this.modalService.open(TipOperationPostponeComponent);
    modalRef.componentInstance.args = {
      tip: this.rtipService.tip,
      operation: "postpone",
      contexts_by_id: this.contexts_by_id,
      expiration_date: this.utils.getPostponeDate(this.appDataService.contexts_by_id[this.tip.context_id].tip_timetolive),
      dateOptions: {
        minDate: new Date(this.tip.expiration_date),
        maxDate: this.utils.getPostponeDate(Math.max(365, this.appDataService.contexts_by_id[this.tip.context_id].tip_timetolive * 2))
      },
      opened: false,
      Utils: this.utils
    };
  }

  exportTip(tipId: any) {
    const param = JSON.stringify({});
    this.httpService.requestToken(param).subscribe
      (
        {
          next: async token => {
            const ans = await this.cryptoService.proofOfWork(token.id);
            window.open("api/recipient/rtips/" + tipId + "/export" + "?token=" + token.id + ":" + ans);
          }
        }
      );
  }
}
