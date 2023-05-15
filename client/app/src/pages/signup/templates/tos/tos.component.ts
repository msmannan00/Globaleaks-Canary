import {Component, Input} from '@angular/core';
import {AppDataService} from "../../../../app-data.service";
import {ControlContainer, NgForm} from "@angular/forms";

@Component({
  selector: 'src-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class TosComponent {

  @Input() signup:any

  constructor(public appDataService:AppDataService) {
  }

}
