import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class TitleResolver implements Resolve<void> {
  constructor(private titleService: Title) {
  }

  resolve(route: ActivatedRouteSnapshot): void {
    const title = route.data["title"] || "Globaleaks";
    this.titleService.setTitle(title);
  }
}
