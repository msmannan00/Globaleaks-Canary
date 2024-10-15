import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, Renderer2} from "@angular/core";
import {AppConfigService} from "@app/services/root/app-config.service";
import {AppDataService} from "@app/app-data.service";
import {UtilsService} from "@app/shared/services/utils.service";
import { LangChangeEvent, TranslateService, TranslateModule } from "@ngx-translate/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import {BrowserCheckService} from "@app/shared/services/browser-check.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TranslationService} from "@app/services/helper/translation.service";
import { DOCUMENT, NgIf, NgClass } from "@angular/common";
import {AuthenticationService} from "@app/services/helper/authentication.service";
import { HeaderComponent } from "../../shared/partials/header/header.component";
import { NgbCollapse } from "@ng-bootstrap/ng-bootstrap";
import { TranslatorPipe } from "../../shared/pipes/translate";
import { FooterComponent } from "@app/shared/partials/footer/footer.component";
import { PrivacyBadgeComponent } from "@app/shared/partials/privacybadge/privacy-badge.component";
import { DemoComponent } from "@app/shared/partials/demo/demo.component";
import { MessageConsoleComponent } from "@app/shared/partials/messageconsole/message-console.component";
import { OperationComponent } from "@app/shared/partials/operation/operation.component";
import { AdminSidebarComponent } from "../admin/sidebar/sidebar.component";
import { AnalystSidebarComponent } from "../analyst/sidebar/sidebar.component";
import { CustodianSidebarComponent } from "../custodian/sidebar/sidebar.component";
import { ReceiptSidebarComponent } from "../recipient/sidebar/sidebar.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition(':enter, :leave', animate(150)),
        ])
    ],
    standalone: true,
    imports: [NgIf, NgClass, HeaderComponent,PrivacyBadgeComponent,AdminSidebarComponent,AnalystSidebarComponent,MessageConsoleComponent,DemoComponent,OperationComponent,CustodianSidebarComponent,ReceiptSidebarComponent, FooterComponent, NgbCollapse, RouterOutlet, TranslateModule, TranslatorPipe]
})
export class AppComponent implements AfterViewInit, OnInit {
  showSidebar: boolean = true;
  isNavCollapsed: boolean = true;
  showLoadingPanel = false;
  supportedBrowser = true;
  loading = false;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, protected browserCheckService: BrowserCheckService, private changeDetectorRef: ChangeDetectorRef, private router: Router, protected translationService: TranslationService, protected translate: TranslateService, protected appConfig: AppConfigService, protected appDataService: AppDataService, protected utilsService: UtilsService, protected authenticationService: AuthenticationService) {
    this.watchLanguage();
  }

  watchLanguage() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      document.getElementsByTagName("html")[0].setAttribute("lang", this.translate.currentLang);
      this.translationService.handleLTRandRTLStyling(event, this.renderer);
    });
  }

  checkToShowSidebar() {
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        const excludedUrls = [
          "/recipient/reports"
        ];
        const currentUrl = event.url;
        this.showSidebar = !excludedUrls.includes(currentUrl);
      }
    });
  }

  ngOnInit() {
    this.appConfig.routeChangeListener();
    this.checkToShowSidebar();
  }

  isWhistleblowerPage() {
    const temp = this.utilsService.isWhistleblowerPage(this.authenticationService, this.appDataService)
    if ((this.router.url === "/" || this.router.url === "/submission") && this.loading) {
      return true;
    } else {
      this.loading = temp;
      return this.loading;
    }
  }

  public ngAfterViewInit(): void {
    this.appDataService.showLoadingPanel$.subscribe((value:any) => {
      this.showLoadingPanel = value;
      this.supportedBrowser = this.browserCheckService.checkBrowserSupport();
      this.changeDetectorRef.detectChanges();
    });
  }

  protected readonly location = location;
}
