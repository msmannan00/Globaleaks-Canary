import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'app/src/app-data.service';
import { contextResolverModel } from 'app/src/models/resolvers/contextResolverModel';
import { AuthenticationService } from 'app/src/services/authentication.service';
import { DeleteConfirmationComponent } from 'app/src/shared/modals/delete-confirmation/delete-confirmation.component';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';
import { QuestionnairesResolver } from 'app/src/shared/resolvers/questionnaires.resolver';
import { UsersResolver } from 'app/src/shared/resolvers/users.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';

@Component({
  selector: 'src-context-editor',
  templateUrl: './context-editor.component.html',
  styleUrls: ['./context-editor.component.css']
})
export class ContextEditorComponent implements OnInit {
  @Input() contextsData: any[]
  @Input() context: any;
  @Input() index: any;
  @Input() editContext: NgForm;
  @Output() dataToParent = new EventEmitter<string>();
  editing: boolean = false;
  showAdvancedSettings: boolean = false
  showSelect: boolean = false;
  questionnairesData: any = []
  usersData: any = []
  nodeData: any = []
  selected = { value: null };
  admin_receivers_by_id: any
  constructor(private http: HttpClient, public modalService: NgbModal, public appDataService: AppDataService, public preference: PreferenceResolver, public httpService: HttpService, public authenticationService: AuthenticationService, public node: NodeResolver, public users: UsersResolver, public questionnaires: QuestionnairesResolver, public utilsService: UtilsService) {
  }

  ngOnInit(): void {
    // console.log(this.context, "context");
    this.questionnairesData = this.questionnaires.dataModel
    this.usersData = this.users.dataModel
    this.nodeData = this.node.dataModel

    this.admin_receivers_by_id = this.utilsService.array_to_map(this.usersData);

    // if (this.contexts.dataModel) {
    //   this.contextsData = this.contexts.dataModel
    // }
  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }

  onReminderSoftChanged(): void {
    if (this.context.tip_reminder_soft > this.context.tip_reminder_hard) {
      this.context.tip_reminder_hard = this.context.tip_reminder_soft;
    }
  }

  onReminderHardChanged(): void {
    if (this.context.tip_reminder_hard === 0) {
      this.context.tip_reminder_soft = 0;
    } else if (this.context.tip_reminder_hard < this.context.tip_reminder_soft) {
      this.context.tip_reminder_soft = this.context.tip_reminder_hard;
    }
  }
  onReminderChanged() { }
  swap($event: any, index: number, n: number): void {
    $event.stopPropagation();

    const target = index + n;
    if (target < 0 || target >= this.contextsData.length) {
      return;
    }

    [this.contextsData[index], this.contextsData[target]] =
      [this.contextsData[target], this.contextsData[index]];

    this.http.put("api/admin/contexts", {
      operation: "order_elements",
      args: { ids: this.contextsData.map(c => c.id) },
    }).subscribe(
      response => {
        // Handle the response if needed
      },
      error => {
        // Handle the error if needed
      }
    );
  }

  moveUp(e: any, idx: number): void {
    this.swap(e, idx, -1);
  }

  moveDown(e: any, idx: number): void {
    this.swap(e, idx, 1);
  }
  swapReceiver(index: number, n: number): void {
    const target = index + n;
    if (target > -1 && target < this.context.receivers.length) {
      const tmp = this.context.receivers[target];
      this.context.receivers[target] = this.context.receivers[index];
      this.context.receivers[index] = tmp;
    }
  }

  moveUpReceiver(index: number): void {
    this.swapReceiver(index, -1);
  }

  moveDownReceiver(index: number): void {
    this.swapReceiver(index, 1);
  }

  toggleSelect(): void {
    this.showSelect = true;
  }

  moveReceiver(rec: any): void {
    if (rec) {
      this.context.receivers.push(rec.id);
      this.showSelect = false;
    }
  }

  receiverNotSelectedFilter(item: any): boolean {
    return this.context.receivers.indexOf(item.id) === -1;
  }

  deleteContext(context: any): void {
    this.openConfirmableModalDialog(context, "")
  }
  openConfirmableModalDialog(arg: any, scope: any): Promise<any> {
    scope = !scope ? this : scope;
    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.arg = arg;
    modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = () => {
      return this.utilsService.deleteAdminContext(arg.id).subscribe(res => {
        this.sendDataToParent()
        // this.utilsService.reloadCurrentRoute()
      });
    };
    return modalRef.result;
  }
  save_context(context: any) {
    if (context.additional_questionnaire_id === null) {
      context.additional_questionnaire_id = "";
    }
    // var updated_context: contextResolverModel = this.utilsService.new_context();
    this.utilsService.updateAdminContext(context, context.id).subscribe(res => {
      this.sendDataToParent()
      // this.contextsData.push(res);
    })
  }
  sendDataToParent() {
    this.dataToParent.emit();
  }
}
