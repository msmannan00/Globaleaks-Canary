import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import { RecieverTipService } from 'app/src/services/recievertip.service';
import { AppDataService } from 'app/src/app-data.service';

@Component({
  selector: 'src-tip-files-receiver',
  templateUrl: './tip-files-receiver.component.html',
  styleUrls: ['./tip-files-receiver.component.css']
})
export class TipFilesReceiverComponent implements OnInit{
  @Input() fileupload_url:any
  collapsed = false
  public toggleColapse(){
    this.collapsed = !this.collapsed
  }
  constructor(public utilsService:UtilsService,public tipService:RecieverTipService, public appDataService: AppDataService ) {
  }

  ngOnInit(): void {
  }

}