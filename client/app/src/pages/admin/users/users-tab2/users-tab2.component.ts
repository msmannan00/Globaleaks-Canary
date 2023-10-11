import { Component, OnInit } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { UsersResolver } from 'app/src/shared/resolvers/users.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';

@Component({
  selector: 'src-users-tab2',
  templateUrl: './users-tab2.component.html',
  styleUrls: ['./users-tab2.component.css']
})
export class UsersTab2Component implements OnInit {
  nodeData:any=[]
  constructor(public httpService: HttpService, public node: NodeResolver, public users: UsersResolver, public utilsService: UtilsService) { }
  ngOnInit(): void { 
    if(this.node.dataModel){
      this.nodeData = this.node.dataModel
    }
  }
  updateNode() {
    this.utilsService.update(this.nodeData).subscribe(res=>{
      this.utilsService.reloadCurrentRoute();
    })
  }
}
