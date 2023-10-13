import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FooterComponent} from "./shared/partials/footer/footer.component";
import {ReceiptComponent} from "./shared/partials/receipt/receipt.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslatorPipe} from "./shared/pipes/translate";
import {Enable2fa} from "./shared/partials/enable-2fa/enable-2fa";
import {TranslateModule} from "@ngx-translate/core";
import {QRCodeModule} from "angularx-qrcode";
import {PasswordChangeComponent} from "./shared/partials/password-change/password-change.component";
import {PasswordMeterComponent} from "./shared/components/password-meter/password-meter.component";
import {
  NgbPagination,
  NgbPaginationFirst, NgbPaginationLast,
  NgbPaginationNext, NgbPaginationNumber, NgbPaginationPages,
  NgbPaginationPrevious,
  NgbNav, NgbNavItem, NgbNavLink, NgbNavContent,
  NgbProgressbar, NgbDatepickerModule, NgbDropdownModule, NgbTooltipModule
} from "@ng-bootstrap/ng-bootstrap";
import {PrivacyBadgeComponent} from "app/src/shared/partials/privacybadge/privacy-badge.component";
import {MarkdownModule} from "ngx-markdown";
import {StripHtmlPipe} from "./shared/pipes/strip-html.pipe";
import {ReceiptValidatorDirective} from "app/src/shared/directive/receipt-validator.directive";
import {TipInfoComponent} from "./shared/partials/tip-info/tip-info.component";
import {TipSubmissionStatusComponent} from "./shared/partials/tip-submission-status/tip-submission-status.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {
  TipAdditionalQuestionnaireInviteComponent
} from "./shared/partials/tip-additional-questionnaire-invite/tip-additional-questionnaire-invite.component";
import {TipFieldComponent} from "./shared/partials/tip-field/tip-field.component";
import {TipFieldAnswerEntryComponent} from "./shared/partials/tip-field-answer-entry/tip-field-answer-entry.component";
import {
  TipQuestionnaireAnswersComponent
} from "./shared/partials/tip-questionnaire-answers/tip-questionnaire-answers.component";
import {DatePipe} from "./shared/pipes/date.pipe";
import {SplitPipe} from "./shared/pipes/split.pipe";
import {
  TipFilesWhistleblowerComponent
} from "./shared/partials/tip-files-whistleblower/tip-files-whistleblower.component";
import {WidgetWbFilesComponent} from "app/src/shared/partials/widget-wbfiles/widget-wb-files.component";
import {ByteFmtPipe} from "./shared/pipes/byte-fmt.pipe";
import {RFileUploadButtonComponent} from "app/src/shared/partials/rfile-upload-button/r-file-upload-button.component";
import {RFileUploadStatusComponent} from "app/src/shared/partials/rfile-upload-status/r-file-upload-status.component";
import {TipCommentsComponent} from "./shared/partials/tip-comments/tip-comments.component";
import {LimitToPipe} from "./shared/pipes/limit-to.pipe";
import {OrderByPipe} from "./shared/pipes/order-by.pipe";
import {ScrollToBottomDirective} from "./shared/directive/scroll-to-bottom.directive";
import {TipReceiverListComponent} from "./shared/partials/tip-receiver-list/tip-receiver-list.component";
import {FilterPipe} from "./shared/pipes/filter.pipe";
import {RequestSupportComponent} from "./shared/modals/request-support/request-support.component";
import {
  WhistleblowerIdentityFieldComponent
} from "./pages/field/whistleblower-identity-field/whistleblower-identity-field.component";
import {NgxFlowModule} from "@flowjs/ngx-flow";
import {RFilesUploadStatusComponent} from "app/src/shared/partials/rfiles-upload-status/r-files-upload-status.component";
import {NgFormChangeDirective} from "./shared/directive/ng-form-change.directive";
import {WbFilesComponent} from "app/src/shared/partials/wbfiles/wb-files.component";
import {DisableCcpDirective} from "./shared/directive/disable-ccp.directive";
import {SubdomainValidatorDirective} from "app/src/shared/directive/subdomain-validator.directive";
import {PasswordStrengthValidatorDirective} from "./shared/directive/password-strength-validator.directive";
import {UserHomeComponent} from "./shared/partials/user-home/user-home.component";
import {UserWarningsComponent} from "./shared/partials/user-warnings/user-warnings.component";
import {GrantAccessComponent} from "./shared/modals/grant-access/grant-access.component";
import {RevokeAccessComponent} from "./shared/modals/revoke-access/revoke-access.component";
import {DeleteConfirmationComponent} from "./shared/modals/delete-confirmation/delete-confirmation.component";
import {DateRangeSelectorComponent} from "./shared/components/date-selector/date-selector.component";
import {PreferencesComponent} from "./shared/partials/preferences/preferences.component";
import {PreferenceTab1Component} from "./shared/partials/preference-tabs/preference-tab1/preference-tab1.component";
import {PreferenceTab2Component} from "./shared/partials/preference-tabs/preference-tab2/preference-tab2.component";
import {Enable2faComponent} from "./shared/modals/enable2fa/enable2fa.component";
import {
  EncryptionRecoveryKeyComponent
} from "./shared/modals/encryption-recovery-key/encryption-recovery-key.component";
import {
  ConfirmationWithPasswordComponent
} from "./shared/modals/confirmation-with-password/confirmation-with-password.component";
import {ConfirmationWith2faComponent} from "./shared/modals/confirmation-with2fa/confirmation-with2fa.component";
import {
  TipOperationFileIdentityAccessRequestComponent
} from "./shared/modals/tip-operation-file-identity-access-request/tip-operation-file-identity-access-request.ompoent";
import {TipFilesReceiverComponent} from "./shared/partials/tip-files-receiver/tip-files-receiver.component";
import {
  TipOperationSetReminderComponent
} from "./shared/modals/tip-operation-set-reminder/tip-operation-set-reminder.component";
import {TipOperationPostponeComponent} from "./shared/modals/tip-operation-postpone/tip-operation-postpone.component";
import {FileViewComponent} from "./shared/modals/file-view/file-view.component";
import {TipUploadWbFileComponent} from "app/src/shared/partials/tip-upload-wbfile/tip-upload-wb-file.component";
import {ImageUploadDirective} from "./shared/directive/image-upload.directive";
import {ImageUploadComponent} from "./shared/partials/image-upload/image-upload.component";
import {EnableEncryptionComponent} from "./shared/modals/enable-encryption/enable-encryption.component";
import {AdminFileComponent} from "./shared/partials/admin-file/admin-file.component";
import {ConfirmationComponent} from "./shared/modals/confirmation/confirmation.component";
import {
  QuestionnaireDuplicationComponent
} from "./shared/modals/questionnaire-duplication/questionnaire-duplication.component";
import {AddOptionHintComponent} from "./shared/modals/add-option-hint/add-option-hint.component";
import {TriggerReceiverComponent} from "./shared/modals/trigger-receiver/trigger-receiver.component";
import {AssignScorePointsComponent} from "./shared/modals/assign-score-points/assign-score-points.component";
import {
  TipOperationFileIdentityAccessReplyComponent
} from "./shared/modals/tip-operation-file-identity-access-reply/tip-operation-file-identity-access-reply.component";
import {DemoComponent} from "./shared/partials/demo/demo.component";
import {MessageConsoleComponent} from "app/src/shared/partials/messageconsole/message-console.component";
import {AcceptAgreementComponent} from "./shared/modals/accept-agreement/accept-agreement.component";
import {DisclaimerComponent} from "./shared/modals/disclaimer/disclaimer.component";
import {
  SecurityAwarenessConfidentialityComponent
} from "./shared/modals/security-awareness-confidentiality/security-awareness-confidentiality.component";
import {TransferAccessComponent} from "./shared/modals/transfer-access/transfer-access.component";
import {BlankComponent} from "./shared/blank/blank.component";
import {VoiceRecorderComponent} from "./shared/partials/voice-recorder/voice-recorder.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    QRCodeModule,
    ReactiveFormsModule,
    NgbProgressbar,
    MarkdownModule,
    NgSelectModule,
    NgbPagination,
    NgbPaginationPrevious,
    NgbPaginationNext,
    NgbPaginationFirst,
    NgbPaginationLast,
    NgbPaginationNumber,
    NgbPaginationPages,
    NgxFlowModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    DateRangeSelectorComponent,
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavContent,
    NgbDropdownModule,
    NgbTooltipModule
  ],
  declarations: [
    FooterComponent,
    ReceiptComponent,
    TranslatorPipe,
    Enable2fa,
    PasswordChangeComponent,
    PasswordMeterComponent,
    PrivacyBadgeComponent,
    StripHtmlPipe,
    DatePipe,
    ReceiptValidatorDirective,
    TipInfoComponent,
    TipQuestionnaireAnswersComponent,
    TipSubmissionStatusComponent,
    TipAdditionalQuestionnaireInviteComponent,
    TipFieldComponent,
    TipFieldAnswerEntryComponent,
    DatePipe,
    SplitPipe,
    TipFilesWhistleblowerComponent,
    WidgetWbFilesComponent,
    ByteFmtPipe,
    RFileUploadButtonComponent,
    RFileUploadStatusComponent,
    TipCommentsComponent,
    LimitToPipe,
    OrderByPipe,
    ScrollToBottomDirective,
    TipReceiverListComponent,
    FilterPipe,
    RequestSupportComponent,
    WhistleblowerIdentityFieldComponent,
    RFilesUploadStatusComponent,
    NgFormChangeDirective,
    WbFilesComponent,
    DisableCcpDirective,
    SubdomainValidatorDirective,
    PasswordStrengthValidatorDirective,
    PasswordStrengthValidatorDirective,
    ImageUploadDirective,
    ImageUploadComponent,
    UserHomeComponent,
    UserWarningsComponent,
    GrantAccessComponent,
    RevokeAccessComponent,
    DeleteConfirmationComponent,
    PreferencesComponent,
    PreferenceTab1Component,
    PreferenceTab2Component,
    Enable2faComponent,
    EncryptionRecoveryKeyComponent,
    ConfirmationWithPasswordComponent,
    ConfirmationWith2faComponent,
    TipOperationFileIdentityAccessRequestComponent,
    TipFilesReceiverComponent,
    TipOperationSetReminderComponent,
    TipOperationPostponeComponent,
    FileViewComponent,
    TipUploadWbFileComponent,
    EnableEncryptionComponent,
    AdminFileComponent,
    ConfirmationComponent,
    QuestionnaireDuplicationComponent,
    AddOptionHintComponent,
    TriggerReceiverComponent,
    AssignScorePointsComponent,
    TipOperationFileIdentityAccessReplyComponent,
    DemoComponent,
    MessageConsoleComponent,
    MessageConsoleComponent,
    AcceptAgreementComponent,
    TransferAccessComponent,
    SecurityAwarenessConfidentialityComponent,
    DisclaimerComponent,
    BlankComponent,
    VoiceRecorderComponent
  ],
  exports: [
    FooterComponent,
    ReceiptComponent,
    TranslatorPipe,
    PrivacyBadgeComponent,
    Enable2fa,
    PasswordChangeComponent,
    StripHtmlPipe,
    FilterPipe,
    OrderByPipe,
    TipInfoComponent,
    TipQuestionnaireAnswersComponent,
    TipAdditionalQuestionnaireInviteComponent,
    TipFieldComponent,
    TipFilesWhistleblowerComponent,
    WidgetWbFilesComponent,
    TipCommentsComponent,
    TipReceiverListComponent,
    RFileUploadStatusComponent,
    RFileUploadButtonComponent,
    RFilesUploadStatusComponent,
    NgFormChangeDirective,
    DisableCcpDirective,
    SubdomainValidatorDirective,
    PasswordMeterComponent,
    PasswordStrengthValidatorDirective,
    ImageUploadDirective,
    ImageUploadComponent,
    UserHomeComponent,
    UserWarningsComponent,
    GrantAccessComponent,
    RevokeAccessComponent,
    DeleteConfirmationComponent,
    DateRangeSelectorComponent,
    TipOperationFileIdentityAccessRequestComponent,
    TipFilesReceiverComponent,
    TipOperationSetReminderComponent,
    TipUploadWbFileComponent,
    EnableEncryptionComponent,
    AdminFileComponent,
    ConfirmationComponent,
    QuestionnaireDuplicationComponent,
    AddOptionHintComponent,
    TriggerReceiverComponent,
    AssignScorePointsComponent,
    PreferencesComponent,
    DemoComponent,
    MessageConsoleComponent,
    AcceptAgreementComponent,
    TransferAccessComponent,
    SecurityAwarenessConfidentialityComponent,
    DisclaimerComponent,
    VoiceRecorderComponent
  ]
})
export class SharedModule {
}
