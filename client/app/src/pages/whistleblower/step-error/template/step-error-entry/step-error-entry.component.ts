import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {AbstractControl, NgForm} from "@angular/forms";

@Component({
  selector: 'src-step-error-entry',
  templateUrl: './step-error-entry.component.html',
  styleUrls: ['./step-error-entry.component.css']
})
export class StepErrorEntryComponent implements OnInit{
  @Input() navigation:any
  @Input() err:any
  @Input() field_id_map:any
  @Input() form!: NgForm;
  pre = "fieldForm_";
  f_id:any
  field:any


  goToQuestion() {
    let form = document.getElementById(this.err)

    if(form){
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const offset = 35; // Adjust this value as needed (in pixels)
      const elementTop = form.getBoundingClientRect().top - window.pageYOffset;
      const scrollToPosition = elementTop - offset;
      window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    }
  }

  initlialize(){
    console.log()
    this.f_id =  this.err;
    this.f_id = this.f_id.substring(0, this.f_id.indexOf("$"));
    this.f_id = this.f_id.slice(this.pre.length).replace(new RegExp("_", "g"), "-");
    this.field = this.field_id_map[this.f_id];
  }

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.initlialize();
  }
}
