import { Component, Input } from '@angular/core';
import { AuthenticationService } from 'app/src/services/authentication.service';
import { UtilsService } from '../../services/utils.service';
import { WbtipService } from 'app/src/services/wbtip.service';

@Component({
  selector: 'src-tip-field-answer-entry',
  templateUrl: './tip-field-answer-entry.component.html',
  styleUrls: ['./tip-field-answer-entry.component.css']
})
export class TipFieldAnswerEntryComponent {
  @Input() entry: any
  @Input() field: any
  @Input() fieldAnswers: any
  audiolist: any
  format = 'dd/MM/yyyy';
  locale = 'en-US';
  myDate = 'Tue Feb 05 2019 00:00:00 GMT+0530 (India Standard Time)';
  constructor(private utilsService: UtilsService, public authenticationService: AuthenticationService, public wbtipService: WbtipService) { }
  ngOnInit(): void {
    // this.fetchAudioFiles()
  }
  fetchAudioFiles(): void {
    // this.audiolist = {};
    // for (const file of this.wbtipService.tip.wbfiles) {
    //   this.utilsService.load("api/recipient/wbfiles/" + file.id).then((url: string) => {
    //     this.audiolist[file.reference_id] = url;
    //     console.log(this.audiolist, "this.audiolist");
    //
    //   });
    // }
  }
}
