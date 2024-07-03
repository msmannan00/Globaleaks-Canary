import {HostListener, NgModule, CUSTOM_ELEMENTS_SCHEMA, EventEmitter} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "@app/app-routing.module";
import {AppComponent} from "@app/pages/app/app.component";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthModule} from "@app/pages/auth/auth.module";
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy, NgOptimizedImage,} from "@angular/common";
import {SharedModule} from "@app/shared.module";
import {HeaderComponent} from "@app/shared/partials/header/header.component";
import {UserComponent} from "@app/shared/partials/header/template/user/user.component";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {
  CompletedInterceptor,
  ErrorCatchingInterceptor,
  appInterceptor
} from "@app/services/root/app-interceptor.service";
import {NgIdleKeepaliveModule} from "@ng-idle/keepalive";
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {AuthenticationService} from "@app/services/helper/authentication.service";
import {HomeComponent} from "@app/pages/dashboard/home/home.component";
import {TranslatorPipe} from "@app/shared/pipes/translate";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {ActionModule} from "@app/pages/action/action.module";
import {WhistleblowerModule} from "@app/pages/whistleblower/whistleblower.module";
import {MarkdownModule} from "ngx-markdown";
import {ReceiptValidatorDirective} from "@app/shared/directive/receipt-validator.directive";
import {NgxFlowModule, FlowInjectionToken} from "@flowjs/ngx-flow";
import * as Flow from "@flowjs/flow.js";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SignupModule} from "@app/pages/signup/signup.module";
import {WizardModule} from "@app/pages/wizard/wizard.module";
import {RecipientModule} from "@app/pages/recipient/recipient.module";
import {AdminModule} from "@app/pages/admin/admin.module";
import {CustodianModule} from "@app/pages/custodian/custodian.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AnalystModule} from "@app/pages/analyst/analyst.module";
import { mockEngine } from './services/helper/mocks';
import { HttpService } from "./shared/services/http.service";
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "l10n/", "");
}

(window as any).mockEngine = mockEngine;
declare global {
  interface Window {
    GL: {
      language: string;
      mockEngine: any;
    };
  }
}
window.GL = {
  language: 'en', // Assuming a default language
  mockEngine: mockEngine
};

const translationModule = TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient],
    },
  })
;

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, UserComponent],
  imports: [
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    SignupModule,
    ActionModule,
    WizardModule,
    AdminModule,
    RecipientModule,
    translationModule,
    NgSelectModule,
    FormsModule,
    WhistleblowerModule,
    CustodianModule,
    AnalystModule,
    SharedModule,
    NgIdleKeepaliveModule.forRoot(),
    MarkdownModule.forRoot(),
    NgxFlowModule,
    NgOptimizedImage
  ],
  providers: [
    ReceiptValidatorDirective,
    {provide: 'MockEngine', useValue: mockEngine},
    TranslatorPipe, TranslateService,
    {provide: HTTP_INTERCEPTORS, useClass: appInterceptor, multi: true},
    {provide: APP_BASE_HREF, useValue: "/"},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CompletedInterceptor, multi: true},
    {provide: FlowInjectionToken, useValue: Flow},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {

  timedOut = false;
  title = "angular-idle-timeout";
  keepaliveEvent: EventEmitter<void> = new EventEmitter();

  constructor(private authenticationService: AuthenticationService,private httpService: HttpService, private idle: Idle) {
    this.initIdleState();
  }

  @HostListener("window:beforeunload")
  async ngOnDestroy() {
    this.reset();
  }

  initIdleState() {
    this.idle.setIdle(300);
    this.idle.setTimeout(1800);
    setInterval(() => {
      this.triggerKeepalive();
    }, 600000);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onTimeout.subscribe(() => {
      if (this.authenticationService && this.authenticationService.session) {
        if (this.authenticationService.session.role === "whistleblower") {
          window.location.replace("about:blank");
        } else {
          this.authenticationService.deleteSession();
          this.authenticationService.loginRedirect();
        }
      }
    });
    this.keepaliveEvent.subscribe(() => this.onKeepalive());
    this.reset();
  }

  triggerKeepalive() {
    this.keepaliveEvent.emit();
  }
  
  onKeepalive() {
    if (this.authenticationService && this.authenticationService.session) {
      this.httpService.requestGetUserSession().subscribe(
        res=>{
          this.authenticationService.session.id = res.id
        }
      );
    }
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
    this.authenticationService.reset();
  }
}

