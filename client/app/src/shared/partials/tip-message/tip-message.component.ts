import {Component, Input} from '@angular/core';
import {WbtipService} from "../../../services/wbtip.service";
import {AuthenticationService} from "../../../services/authentication.service";
import { RecieverTipService } from 'app/src/services/recievertip.service';

@Component({
  selector: 'src-tip-message',
  templateUrl: './tip-message.component.html',
  styleUrls: ['./tip-message.component.css']
})
export class TipMessageComponent {
  @Input() tipService: RecieverTipService | WbtipService  ;

  @Input() index: number;
  @Input() message: any;

  constructor( public authenticationService:AuthenticationService) {
  }
  ngOnInit(): void {
  }
  protected readonly JSON = JSON;
}
