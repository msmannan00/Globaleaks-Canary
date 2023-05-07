import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, NgForm} from "@angular/forms";

@Component({
  selector: 'src-whistleblower-identity-field',
  templateUrl: './whistleblower-identity-field.component.html',
  styleUrls: ['./whistleblower-identity-field.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class WhistleblowerIdentityFieldComponent implements OnInit{
  @Input() submission:any
  @Input() field:any

  @Input() stepId:any
  @Input() fieldCol:any
  @Input() fieldRow:any
  @Input() index:any
  @Input() step:any
  @Input() answers:any
  @Input() entry:any
  @Input() fields:any
  @Input() displayErrors:any
  protected readonly JSON = JSON;


  ngOnInit(): void {
    this.submission._submission.identity_provided = true
  }
}
