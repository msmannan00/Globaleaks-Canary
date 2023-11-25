import {AfterViewInit, ChangeDetectorRef, Component, Renderer2} from "@angular/core";
import {AppConfigService} from "@app/services/app-config.service";
import {AppDataService} from "@app/app-data.service";
import {UtilsService} from "@app/shared/services/utils.service";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {NavigationEnd, Router} from "@angular/router";
import {BrowserCheckService} from "@app/shared/services/browser-check.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TranslationService} from "@app/services/translation.service";

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
  waitForLoader = false;

  constructor(private renderer: Renderer2, protected browserCheckService: BrowserCheckService, private changeDetectorRef: ChangeDetectorRef, private router: Router, protected translationService: TranslationService, protected translate: TranslateService, protected appConfig: AppConfigService, protected appDataService: AppDataService, protected utilsService: UtilsService) {
    this.watchLanguage();
  }

  watchLanguage() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.waitForLoader = this.translationService.loadBootstrapStyles(event, this.renderer);
    });
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
      if(!value){
        this.waitForLoader = value;
      }
      this.supportedBrowser = this.browserCheckService.checkBrowserSupport();
      this.changeDetectorRef.detectChanges();
    });
  }
}
