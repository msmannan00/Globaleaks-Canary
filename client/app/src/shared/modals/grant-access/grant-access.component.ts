import { Component, Input } from '@angular/core';


@Component({
  selector: 'src-grant-access',
  templateUrl: './grant-access.component.html',
  styleUrls: ['./grant-access.component.css']
})
export class GrantAccessComponent {
  @Input() users_names: any;
  @Input() confirmFun: (receiver_id: any) => any;
  constructor() {
  }

  ngOnInit(){
   console.log(this.users_names);
   console.log(this.confirmFun)
  }
}
