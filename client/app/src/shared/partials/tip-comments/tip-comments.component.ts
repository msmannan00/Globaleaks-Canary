import { Component } from '@angular/core';
import {WbtipService} from "../../../services/wbtip.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {UtilsService} from "../../services/utils.service";
import {orderBy, reverse} from "lodash";
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'src-tip-comments',
  templateUrl: './tip-comments.component.html',
  styleUrls: ['./tip-comments.component.css']
})
export class TipCommentsComponent {

  collapsed = false
  newCommentContent = ""
  currentCommentsPage: number = 1;
  itemsPerPage = 5;

  public toggleColapse(){
    this.collapsed = !this.collapsed
  }

  constructor(public wbtipService:WbtipService, public authenticationService:AuthenticationService, public utilsService:UtilsService) {

  }

  newComment() {

  }
}
