import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { timer } from "rxjs";

@Component({
  selector: "src-blank",
  templateUrl: "./blank.component.html"
})
export class BlankComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    timer(500).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
