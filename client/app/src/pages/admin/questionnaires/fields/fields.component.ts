import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConfigService } from 'app/src/services/app-config.service';
import { AddOptionHintComponent } from 'app/src/shared/modals/add-option-hint/add-option-hint.component';
import { AssignScorePointsComponent } from 'app/src/shared/modals/assign-score-points/assign-score-points.component';
import { DeleteConfirmationComponent } from 'app/src/shared/modals/delete-confirmation/delete-confirmation.component';
import { TriggerReceiverComponent } from 'app/src/shared/modals/trigger-receiver/trigger-receiver.component';
import { FieldtemplatesResolver } from 'app/src/shared/resolvers/fieldtemplates.resolver';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { FieldUtilitiesService } from 'app/src/shared/services/field-utilities.service';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';
import { QuestionnariesService } from '../questionnaries.service';

@Component({
  selector: 'src-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
  // encapsulation: ViewEncapsulation.Emulated,
})
export class FieldsComponent implements OnInit {
  @Input() editField: NgForm
  @Input() field: any
  @Input() type: any
  @Output() dataToParent = new EventEmitter<string>();

  editing: boolean = false;
  openMinDate: boolean = false;
  openMaxDate: boolean = false;
  showAddTrigger: boolean = false;
  showAddQuestionFromTemplate: boolean = false;
  showAddQuestion: boolean = false;
  fieldIsMarkableSubjectToStats: any
  fieldIsMarkableSubjectToPreview: any
  fieldtemplatesData: any = []
  children: any
  new_trigger: { field: string; option: string; sufficient: boolean } = {
    field: "",
    option: "",
    sufficient: false,
  };
  parsedFields: any

  constructor(private questionnariesService: QuestionnariesService, public appConfigService: AppConfigService, public modalService: NgbModal, public node: NodeResolver, private httpService: HttpService, private utilsService: UtilsService, public fieldtemplates: FieldtemplatesResolver, private fieldUtilities: FieldUtilitiesService,) { }
  ngOnInit(): void {
    this.fieldtemplatesData = this.fieldtemplates.dataModel
    this.fieldIsMarkableSubjectToStats = this.isMarkableSubjectToStats(this.field);
    this.fieldIsMarkableSubjectToPreview = this.isMarkableSubjectToPreview(this.field);
    this.parsedFields = this.fieldUtilities.parseFields(this.fieldtemplates.dataModel, {});
    this.children = this.field.children;
  }
  save_field(field: any) {
    this.utilsService.assignUniqueOrderIndex(field.options);
    return this.httpService.requestUpdateAdminQuestionnaireField(field.id, field).subscribe(res => {
    return  this.questionnariesService.sendData();
    })
  }
  toggleEditing() {
    this.editing = !this.editing;
  }
  exportQuestion(field: any) {
    this.utilsService.download("/api/admin/fieldtemplates/" + field.id);
  }
  delField(field: any) {
    this.openConfirmableModalDialog(field, "")
  }
  openConfirmableModalDialog(arg: any, scope: any): Promise<any> {
    scope = !scope ? this : scope;
    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.arg = arg;
    modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = () => {
      return this.httpService.requestDeleteAdminQuestionareField(arg.id).subscribe(() => {
        this.dataToParent.emit();
        return this.questionnariesService.sendData();
        // this.appConfigService.reinit()
        // this.utilsService.reloadCurrentRoute()
      });
    };
    return modalRef.result;
    
  }
  moveUpAndSave(field: any): void {
    this.utilsService.moveUp(field);
    this.save_field(field);
  }

  moveDownAndSave(field: any): void {
    this.utilsService.moveDown(field);
    this.save_field(field);
  }

  moveLeftAndSave(field: any): void {
    this.utilsService.moveLeft(field);
    this.save_field(field);
  }

  moveRightAndSave(field: any): void {
    this.utilsService.moveRight(field);
    this.save_field(field);
  }

  typeSwitch(type: string): string {
    if (["inputbox", "textarea"].indexOf(type) !== -1) {
      return "inputbox_or_textarea";
    }

    if (["checkbox", "selectbox"].indexOf(type) !== -1) {
      return "checkbox_or_selectbox";
    }

    return type;
  }

  isMarkableSubjectToStats(field: any): boolean {
    return ["inputbox", "textarea", "fieldgroup"].indexOf(field.type) === -1;
  }

  isMarkableSubjectToPreview(field: any): boolean {
    return ["fieldgroup", "fileupload"].indexOf(field.type) === -1;
  }
  toggleMinDate() {
    this.openMinDate = !this.openMinDate;
  }

  toggleMaxDate() {
    this.openMaxDate = !this.openMaxDate;
  }
  toggleAddTrigger() {
    this.showAddTrigger = !this.showAddTrigger;
  };
  delTrigger(trigger: any): void {
    const index = this.field.triggered_by_options.indexOf(trigger);
    if (index !== -1) {
      this.field.triggered_by_options.splice(index, 1);
    }
  }

  addTrigger() {
    this.field.triggered_by_options.push(this.new_trigger);
    this.toggleAddTrigger();
    this.new_trigger = { "field": "", "option": "", "sufficient": false };
  }
  showOptions(field: any): boolean {
    if (field.instance === 'reference') {
      return false;
    }

    if (['checkbox', 'selectbox', 'multichoice'].indexOf(field.type) > -1) {
      return true;
    }

    return false;
  }
  addOption(): void {
    const new_option: any = {
      id: '',
      label: '',
      hint1: '',
      hint2: '',
      block_submission: false,
      score_points: 0,
      score_type: 'none',
      trigger_receiver: [],
    };

    new_option.order = this.utilsService.newItemOrder(this.field.options, 'order');

    this.field.options.push(new_option);
  }
  delOption(option: any): void {
    const index = this.field.options.indexOf(option);
    if (index !== -1) {
      this.field.options.splice(index, 1);
    }
  }
  moveOptionUp(idx: number): void {
    this.swapOption(idx, -1);
  }

  moveOptionDown(idx: number): void {
    this.swapOption(idx, 1);
  }
  addOptionHintDialog(option: any) {
    // return $scope.Utils.openConfirmableModalDialog("views/modals/add_option_hint.html", option, $scope);
    this.openOptionHintDialog(option)

  }
  openOptionHintDialog(arg: any): Promise<any> {
    const modalRef = this.modalService.open(AddOptionHintComponent);
    modalRef.componentInstance.arg = arg;
    // modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = (res: any) => {

      // return this.httpService.requestDeleteAdminQuestionareField(arg.id).subscribe(res => {
      //   this.appConfigService.reinit()
      //   // this.utilsService.reloadCurrentRoute()
      // });
    };
    return modalRef.result;
  }
  private swapOption(index: number, n: number): void {
    const target = index + n;
    if (target < 0 || target >= this.field.options.length) {
      return;
    }
    const a = this.field.options[target];
    const b = this.field.options[index];
    this.field.options[target] = b;
    this.field.options[index] = a;
  }
  flipBlockSubmission(option: any): void {
    option.block_submission = !option.block_submission;
  }
  triggerReceiverDialog(option: any): void {
    // const addReceiver = (rec: any) => {
    //   option.trigger_receiver.push(rec.id);
    // };

    // const receiverNotSelectedFilter = (item: any) => {
    //   return option.trigger_receiver.indexOf(item.id) === -1;
    // };
    this.openTriggerReceiverDialog(option)

  }
  openTriggerReceiverDialog(arg: any): Promise<any> {
    const modalRef = this.modalService.open(TriggerReceiverComponent);
    modalRef.componentInstance.arg = arg;
    // modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = (res: any) => {
      // return this.httpService.requestDeleteAdminQuestionareField(arg.id).subscribe(res => {
      //   this.appConfigService.reinit()
      //   // this.utilsService.reloadCurrentRoute()
      // });
    };
    return modalRef.result;
  }
  assignScorePointsDialog(option: any) {
    // return $scope.Utils.openConfirmableModalDialog("views/modals/assign_score_points.html", option, $scope);
    this.openAssignScorePointsDialog(option)
  }
  openAssignScorePointsDialog(arg: any): Promise<any> {
    const modalRef = this.modalService.open(AssignScorePointsComponent);
    modalRef.componentInstance.arg = arg;
    // modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = (res: any) => {
      // return this.httpService.requestDeleteAdminQuestionareField(arg.id).subscribe(res => {
      //   this.appConfigService.reinit()
      //   // this.utilsService.reloadCurrentRoute()
      // });
    };
    return modalRef.result;
  }
  toggleAddQuestionFromTemplate() {
    this.showAddQuestionFromTemplate = !this.showAddQuestionFromTemplate;
    this.showAddQuestion = false;
  }
  toggleAddQuestion() {
    this.showAddQuestion = !this.showAddQuestion;
    this.showAddQuestionFromTemplate = false;
  }
  listenToAddField(data: any) {
    this.showAddQuestion = false
    // this.questionnariesService.sendData('')
  }
  listenToAddFieldFormTemplate(data: any) {
    this.showAddQuestionFromTemplate = false
    // this.questionnariesService.sendData('')
  }
}
