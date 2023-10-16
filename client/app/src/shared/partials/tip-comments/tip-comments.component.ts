import {Component, Input, ViewChild} from "@angular/core";
import {WbtipService} from "@app/services/wbtip.service";
import {AuthenticationService} from "@app/services/authentication.service";
import {UtilsService} from "@app/shared/services/utils.service";
import {ScrollToBottomDirective} from "@app/shared/directive/scroll-to-bottom.directive";
import {ReceiverTipService} from "@app/services/receiver-tip.service";

@Component({
  selector: "src-tip-comments",
  templateUrl: "./tip-comments.component.html"
})
export class TipCommentsComponent {
  @Input() tipService: ReceiverTipService | WbtipService;
  @Input() key: any;
  @ViewChild(ScrollToBottomDirective)
  scroll: ScrollToBottomDirective;

  collapsed = false;
  newCommentContent = "";
  currentCommentsPage: number = 1;
  itemsPerPage = 5;

  constructor(private rTipService: ReceiverTipService, protected authenticationService: AuthenticationService, protected utilsService: UtilsService) {

  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  ngOnInit() {
  }

  newComment() {
    this.tipService.newComment(this.newCommentContent, this.key);
    this.newCommentContent = "";
  }

  onEnableTwoWayCommentsChange() {
    this.rTipService.operation("api/recipient/rtips/" + this.tipService.tip.id, "set", {
      "key": "enable_two_way_comments",
      "value": this.tipService.tip.enable_two_way_comments
    });
  }
}
