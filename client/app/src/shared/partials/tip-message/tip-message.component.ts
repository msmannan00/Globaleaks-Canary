import {Component, Input} from '@angular/core';
import {WbtipService} from "../../../services/wbtip.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'src-tip-message',
  templateUrl: './tip-message.component.html',
  styleUrls: ['./tip-message.component.css']
})
export class TipMessageComponent {

  @Input() index: number;
  @Input() message: any;

  constructor(public wbtipService:WbtipService, public authenticationService:AuthenticationService) {
  }

}
