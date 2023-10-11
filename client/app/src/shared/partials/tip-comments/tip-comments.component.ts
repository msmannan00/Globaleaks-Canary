import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { WbtipService } from "../../../services/wbtip.service";
import { AuthenticationService } from "../../../services/authentication.service";
import { UtilsService } from "../../services/utils.service";
import { orderBy, reverse } from "lodash";
import { OrderPipe } from 'ngx-order-pipe';
import { ScrollToBottomDirective } from "../../directive/scroll-to-bottom.directive";
import { RecieverTipService } from 'app/src/services/recievertip.service';

@Component({
  selector: 'src-tip-comments',
  templateUrl: './tip-comments.component.html',
  styleUrls: ['./tip-comments.component.css']
})
export class TipCommentsComponent {
  @Input() tipService: RecieverTipService | WbtipService;
  @Input() key: any;
  @ViewChild(ScrollToBottomDirective)
  scroll: ScrollToBottomDirective;

  collapsed = false
  newCommentContent = ""
  currentCommentsPage: number = 1;
  itemsPerPage = 5;

  public toggleColapse() {
    this.collapsed = !this.collapsed
  }

  constructor(private rtipService: RecieverTipService, public authenticationService: AuthenticationService, public utilsService: UtilsService) {

  }
  ngOnInit() {
    console.log(this.tipService.tip)
  }
  newComment() {
    this.tipService.newComment(this.newCommentContent, this.key);
    this.newCommentContent = "";
  }

  onEnableTwoWayCommentsChange() {
    this.rtipService.operation('api/recipient/rtips/' + this.tipService.tip.id, 'set', { 'key': 'enable_two_way_comments', 'value': this.tipService.tip.enable_two_way_comments })
  }
}
