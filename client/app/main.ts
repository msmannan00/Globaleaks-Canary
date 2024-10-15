

const translationModule = TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient],
    },
  })
;

// https://github.com/globaleaks/GlobaLeaks/issues/3277
// Create a proxy to override localStorage methods with sessionStorage methods
(function() {
  const localStorageProxy = {
    getItem: (key: string) => sessionStorage.getItem(key),
    setItem: (key: string, value: string) => sessionStorage.setItem(key, value),
    removeItem: (key: string) => sessionStorage.removeItem(key),
    clear: () => sessionStorage.clear(),
    key: (index: number) => sessionStorage.key(index),
    get length() {
      return sessionStorage.length;
    }
  };

  // Assign the proxy to localStorage
  Object.defineProperty(window, 'localStorage', {
    value: localStorageProxy,
    configurable: false,
    writable: false
  });
})();

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "@app/app.module";
import { ReceiptValidatorDirective } from "@app/shared/directive/receipt-validator.directive";
import { mockEngine } from "./src/services/helper/mocks";
import { TranslatorPipe } from "@app/shared/pipes/translate";
import { TranslateService, TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient, HttpClient } from "@angular/common/http";
import { appInterceptor, ErrorCatchingInterceptor, CompletedInterceptor } from "@app/services/root/app-interceptor.service";
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy, NgOptimizedImage } from "@angular/common";
import { FlowInjectionToken, NgxFlowModule } from "@flowjs/ngx-flow";
import { NgbDatepickerI18n, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CustomDatepickerI18n } from "@app/shared/services/custom-datepicker-i18n";
import { AppRoutingModule } from "@app/app-routing.module";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { RecipientModule } from "@app/pages/recipient/recipient.module";
import { createTranslateLoader } from "./src/app.module";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { CustodianModule } from "@app/pages/custodian/custodian.module";
import { AnalystModule } from "@app/pages/analyst/analyst.module";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { MarkdownModule, MARKED_OPTIONS } from "ngx-markdown";
import { AppComponent } from "./src/pages/app/app.component";
import { importProvidersFrom } from "@angular/core";
import * as Flow from "@flowjs/flow.js";

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule, NgbModule, BrowserModule, RecipientModule, translationModule, NgSelectModule, FormsModule, CustodianModule, AnalystModule, NgIdleKeepaliveModule.forRoot(), MarkdownModule.forRoot({
            markedOptions: {
                provide: MARKED_OPTIONS,
                useValue: {
                    breaks: true
                }
            }
        }), NgxFlowModule, NgOptimizedImage),
        ReceiptValidatorDirective,
        { provide: 'MockEngine', useValue: mockEngine },
        TranslatorPipe, TranslateService,
        { provide: HTTP_INTERCEPTORS, useClass: appInterceptor, multi: true },
        { provide: APP_BASE_HREF, useValue: "/" },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CompletedInterceptor, multi: true },
        { provide: FlowInjectionToken, useValue: Flow },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
    ]
})
  .catch(err => console.error(err));
