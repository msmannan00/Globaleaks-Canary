import {AfterViewInit, ChangeDetectorRef, Component, Inject, Renderer2} from "@angular/core";
import {AppConfigService} from "@app/services/app-config.service";
import {AppDataService} from "@app/app-data.service";
import {UtilsService} from "@app/shared/services/utils.service";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {NavigationEnd, Router} from "@angular/router";
import {BrowserCheckService} from "@app/shared/services/browser-check.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DOCUMENT} from "@angular/common";

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
  ]
})
export class AppComponent implements AfterViewInit {
  showSidebar: boolean = true;
  isNavCollapsed: boolean = true;
  showLoadingPanel = false;
  supportedBrowser = true;
  loading = false;
  firstTimeLanguageChange = true;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, protected browserCheckService: BrowserCheckService, private changeDetectorRef: ChangeDetectorRef, private router: Router, protected translate: TranslateService, protected appConfig: AppConfigService, protected appDataService: AppDataService, protected utilsService: UtilsService) {
    this.watchLanguage();
  }

  watchLanguage() {
    this.translate.onLangChange.subscribe((_: LangChangeEvent) => {
      if(this.firstTimeLanguageChange){
        this.firstTimeLanguageChange = false
      }else {
        this.loadBootstrapStyles();
      }
    });
  }

  loadBootstrapStyles() {
    const defaultBootstrapLink = this.document.head.querySelector('link[href*="./lib/bootstrap/bootstrap.css"], link[href*="./lib/bootstrap/bootstrap.rtl.css"]');
    if (defaultBootstrapLink) {
      this.renderer.removeChild(this.document.head, defaultBootstrapLink);
    }

    const lang = this.translate.currentLang;
    const bootstrapCssFilename = lang === 'ar' ? 'bootstrap.rtl.css' : 'bootstrap.css';
    const bootstrapCssPath = `./lib/bootstrap/${bootstrapCssFilename}`;
    const newLinkElement = this.renderer.createElement('link');
    this.renderer.setAttribute(newLinkElement, 'rel', 'stylesheet');
    this.renderer.setAttribute(newLinkElement, 'type', 'text/css');
    this.renderer.setAttribute(newLinkElement, 'href', bootstrapCssPath);
    const firstLink = this.document.head.querySelector('link');
    this.renderer.insertBefore(this.document.head, newLinkElement, firstLink);
  }


  checkToShowSidebar() {
    this.router.events.subscribe(event => {
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

  public openGithubReport() {
    window.open("https://github.com/msmannan00/globaleaks-angular-fork/issues", "_blank");
  }

  isWhistleblowerPage() {
    let temp = this.utilsService.isWhistleblowerPage()
    if((this.router.url === "/" || this.router.url === "/submission") && this.loading){
      return true;
    }else {
      this.loading = temp;
      return this.loading;
    }
  }

  public ngAfterViewInit(): void {
    this.appDataService.showLoadingPanel$.subscribe((value) => {
      this.showLoadingPanel = value;
      this.supportedBrowser = this.browserCheckService.checkBrowserSupport();
      this.changeDetectorRef.detectChanges();
    });
  }

  public getDirection(): string {
    const rtlLanguages = ['ar', 'dv', 'fa', 'fa_AF', 'he', 'ps', 'ug', 'ur'];
    return rtlLanguages.includes(this.translate.currentLang) ? 'rtl' : 'ltr';
  }
}
