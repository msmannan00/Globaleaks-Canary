import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomepageComponent} from "./homepage/homepage.component";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "@app/shared.module";
import {MarkdownModule} from "ngx-markdown";
import {TippageComponent} from "./tippage/tippage.component";
import {
  WhistleblowerIdentityComponent
} from "@app/shared/partials/whistleblower-identity/whistleblower-identity.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SubmissionComponent} from "./submission/submission.component";
import {ContextSelectionComponent} from "./context-selection/context-selection.component";
import {SubmissionErrorComponent} from "./submission-error/submission-error.component";
import {StepErrorComponent} from "./step-error/step-error.component";
import {StepErrorEntryComponent} from "./step-error/template/step-error-entry/step-error-entry.component";
import {ReceiverSelectionComponent} from "./receiver-selection/receiver-selection.component";
import {ReceiverCardComponent} from "./receiver-card/receiver-card.component";
import {FormComponent} from "./form/form.component";
import {FormFieldInputsComponent} from "./form-field-inputs/form-field-inputs.component";
import {FormFieldInputComponent} from "./form-field-input/form-field-input.component";
import {
  WhistleblowerIdentityFieldComponent
} from "./fields/whistleblower-identity-field/whistleblower-identity-field.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {ReceiptComponent} from "./receipt/receipt.component";
import {
  TipAdditionalQuestionnaireFormComponent
} from "@app/shared/modals/tip-additional-questionnaire-form/tip-additional-questionnaire-form.component";


@NgModule({
  declarations: [
    HomepageComponent,
    TippageComponent,
    WhistleblowerIdentityComponent,
    SubmissionComponent,
    ContextSelectionComponent,
    SubmissionErrorComponent,
    StepErrorComponent,
    StepErrorEntryComponent,
    ReceiverSelectionComponent,
    ReceiverCardComponent,
    FormComponent,
    FormFieldInputsComponent,
    FormFieldInputComponent,
    WhistleblowerIdentityFieldComponent,
    ReceiptComponent,
    TipAdditionalQuestionnaireFormComponent,
  ],
  exports: [
    HomepageComponent,
    TippageComponent,
    SubmissionComponent,
    WhistleblowerIdentityFieldComponent,
    ReceiptComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    MarkdownModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgbInputDatepicker,
  ]
})
export class WhistleblowerModule {
}
