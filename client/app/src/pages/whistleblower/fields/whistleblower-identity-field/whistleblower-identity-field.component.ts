import {Component, Input} from '@angular/core';

@Component({
  selector: 'src-whistleblower-identity-field',
  templateUrl: './whistleblower-identity-field.component.html',
  styleUrls: ['./whistleblower-identity-field.component.css']
})
export class WhistleblowerIdentityFieldComponent {
  @Input() submission:any
  @Input() field:any
}
