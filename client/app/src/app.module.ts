import {HostListener, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import {
  APP_BASE_HREF,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { AppConfigService } from './services/app-config.service';
import { SharedModule } from './shared_component/shared.module';
import { HeaderComponent } from './shared_component/header/header.component';
import { UserComponent } from './shared_component/header/template/user/user.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {ErrorCatchingInterceptor, RequestInterceptor} from "./services/glResuestInterceptor";
import {Keepalive, NgIdleKeepaliveModule} from "@ng-idle/keepalive";
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {AuthenticationService} from "./services/authentication.service";
import {HomeComponent} from "./dashboard/home/home.component";
import { TranslatePipe } from './pipes/translate';
import {ApplicationPipedModule} from "./pipes/application-piped/application-piped.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './data/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent, HomeComponent],
  imports: [
    ApplicationPipedModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    NgIdleKeepaliveModule.forRoot(),
    AuthModule,
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgSelectModule,
    FormsModule,
  ],
  providers: [
    TranslatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  timedOut = false;
  title = 'angular-idle-timeout';

  constructor(public appConfigService: AppConfigService, private idle: Idle, private keepalive: Keepalive, public authentication: AuthenticationService) {
    this.globalInitializations();
    this.initIdleState();
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.reset();
  }

  globalInitializations() {
    this.appConfigService.initTranslation();
  }

  initIdleState(){
    this.idle.setIdle(300);
    this.idle.setTimeout(1800);
    this.keepalive.interval(600);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onTimeout.subscribe(() => {
      if (this.authentication && this.authentication.session) {
        if (this.authentication.session.role === "whistleblower") {
          window.location.replace("about:blank");
        } else {
          this.authentication.deleteSession();
          this.authentication.loginRedirect(false)
        }
      }
    });

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
    this.authentication.reset()
  }
}

