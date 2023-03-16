import { Component } from '@angular/core';

@Component({
  selector: 'app-aria',
  templateUrl: './aria.component.html',
  styleUrls: ['./aria.component.css']
})
export class AriaComponent {

  executeButton() {
    alert("wow");
  }
}
