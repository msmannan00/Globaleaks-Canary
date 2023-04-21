import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./shared/partials/footer/footer.component";
import { ReceiptComponent } from './shared/partials/receipt/receipt.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslatorPipe} from "./shared/pipes/translate";
import { Enable2fa } from './shared/partials/enable-2fa/enable-2fa';
import {TranslateModule} from "@ngx-translate/core";
import {QRCodeModule} from "angularx-qrcode";
import { PasswordChangeComponent } from './shared/partials/password-change/password-change.component';
import { PasswordMeterComponent } from './shared/components/password-meter/password-meter.component';
import {
    NgbPagination,
    NgbPaginationFirst, NgbPaginationLast,
    NgbPaginationNext, NgbPaginationNumber, NgbPaginationPages,
    NgbPaginationPrevious,
    NgbProgressbar
} from "@ng-bootstrap/ng-bootstrap";
import { PrivacybadgeComponent } from './shared/partials/privacybadge/privacybadge.component';
import {MarkdownModule} from "ngx-markdown";
import { StripHtmlPipe } from './shared/pipes/strip-html.pipe';
import { ReceiptvalidatorDirective } from './shared/directive/receiptvalidator.directive';
import { TipInfoComponent } from './shared/partials/tip-info/tip-info.component';
import { TipSubmissionStatusComponent } from './shared/partials/tip-submission-status/tip-submission-status.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { TipAdditionalQuestionnaireInviteComponent } from './shared/partials/tip-additional-questionnaire-invite/tip-additional-questionnaire-invite.component';
import { TipFieldComponent } from './shared/partials/tip-field/tip-field.component';
import { TipFieldAnswerEntryComponent } from './shared/partials/tip-field-answer-entry/tip-field-answer-entry.component';
import {
    TipQuestionnaireAnswersComponent
} from "./shared/partials/tip-questionnaire-answers/tip-questionnaire-answers.component";
import { DatePipe } from './shared/pipes/date.pipe';
import { SplitPipe } from './shared/pipes/split.pipe';
import { TipFilesWhistleblowerComponent } from './shared/partials/tip-files-whistleblower/tip-files-whistleblower.component';
import { WidgetWbfilesComponent } from './shared/partials/widget-wbfiles/widget-wbfiles.component';
import { ByteFmtPipe } from './shared/pipes/byte-fmt.pipe';
import { RfileUploadButtonComponent } from './shared/partials/rfile-upload-button/rfile-upload-button.component';
import { RfileUploadStatusComponent } from './shared/partials/rfile-upload-status/rfile-upload-status.component';
import { TipCommentsComponent } from './shared/partials/tip-comments/tip-comments.component';
import { TipMessagesComponent } from './shared/partials/tip-messages/tip-messages.component';
import { TipMessageComponent } from './shared/partials/tip-message/tip-message.component';
import { LimitToPipe } from './shared/pipes/limit-to.pipe';

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
    ],
  declarations: [
    FooterComponent,
    ReceiptComponent,
    TranslatorPipe,
    Enable2fa,
    PasswordChangeComponent,
    PasswordMeterComponent,
    PrivacybadgeComponent,
    StripHtmlPipe,
    DatePipe,
    ReceiptvalidatorDirective,
    TipInfoComponent,
    TipQuestionnaireAnswersComponent,
    TipSubmissionStatusComponent,
    TipAdditionalQuestionnaireInviteComponent,
    TipFieldComponent,
    TipFieldAnswerEntryComponent,
    DatePipe,
    SplitPipe,
    TipFilesWhistleblowerComponent,
    WidgetWbfilesComponent,
    ByteFmtPipe,
    RfileUploadButtonComponent,
    RfileUploadStatusComponent,
    TipCommentsComponent,
    TipMessagesComponent,
    TipMessageComponent,
    LimitToPipe
  ],
    exports: [
        FooterComponent,
        ReceiptComponent,
        TranslatorPipe,
        PrivacybadgeComponent,
        Enable2fa,
        PasswordChangeComponent,
        StripHtmlPipe,
        TipInfoComponent,
        TipQuestionnaireAnswersComponent,
        TipAdditionalQuestionnaireInviteComponent,
        TipFieldComponent,
        TipFilesWhistleblowerComponent,
        WidgetWbfilesComponent,
        TipCommentsComponent,
        TipMessagesComponent,
    ]})
export class SharedModule { }
