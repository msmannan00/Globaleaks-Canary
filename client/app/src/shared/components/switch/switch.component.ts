// switch.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent {
  @Input() label: string = 'Switch';
  @Input() isChecked: boolean = false; // Ensure this line is present
  @Output() switchChange = new EventEmitter<boolean>();

  onSwitchChange(event: any): void {
    this.isChecked = event.target.checked;
    this.switchChange.emit(this.isChecked);
  }
}
