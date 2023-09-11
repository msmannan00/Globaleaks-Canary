import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'src-password-meter',
  templateUrl: './password-meter.component.html'
})
export class PasswordMeterComponent implements OnChanges{

  @Input() passwordStrengthScore = 0
  Strengthtype: string = "";
  Strengthtext: string = "";

  ngOnChanges(changes: SimpleChanges): void {
    if (this.passwordStrengthScore < 2) {
      this.Strengthtype = "bg-danger";
      this.Strengthtext = "Weak";
    } else if (this.passwordStrengthScore < 3) {
      this.Strengthtype = "bg-warning";
      this.Strengthtext = "Acceptable";
    } else {
      this.Strengthtype = "bg-primary";
      this.Strengthtext = "Strong";
    }
  }
}
