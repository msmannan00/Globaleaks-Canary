import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import {
  APP_BASE_HREF,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { AppConfigService } from './app-config.service';
import { SharedModule } from './shared_component/shared.module';
import { HeaderComponent } from './shared_component/header/header.component';
import { UserComponent } from './shared_component/header/template/user/user.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {ErrorCatchingInterceptor, RequestInterceptor} from "./services/http-interceptor.service";
import {Keepalive, NgIdleKeepaliveModule} from "@ng-idle/keepalive";
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {AuthenticationService} from "./services/authentication.service";
import { HomeComponent } from './dashboard/home/home.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent, HomeComponent],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  idleState = 'Not started.';
  timedOut = false;
  title = 'angular-idle-timeout';

  constructor(public appConfigService: AppConfigService, private idle: Idle, private keepalive: Keepalive, public authentication: AuthenticationService) {
    this.globalInitializations();
    this.initIdleState();
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
        }
      }
    });

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}

