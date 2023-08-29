import { Component } from '@angular/core';
import {NodeResolver} from "../../../../shared/resolvers/node.resolver";
import {UtilsService} from "../../../../shared/services/utils.service";
import {ngxCsv} from "ngx-csv";
import {TipsResolver} from "../../../../shared/resolvers/tips.resolver";
import {tipsResolverModel} from "../../../../models/resolvers/tipsResolverModel";
import {AppDataService} from "../../../../app-data.service";

@Component({
  selector: 'src-auditlog-tab3',
  templateUrl: './auditlog-tab3.component.html'
})
export class AuditlogTab3Component {
  currentPage = 1;
  pageSize = 20;
  tips:any = new tipsResolverModel()
  constructor(private tipsResolver: TipsResolver, public nodeResolver:NodeResolver, public utilsService:UtilsService, public appDataService:AppDataService) {}

  ngOnInit() {
    this.loadAuditLogData();
  }

  loadAuditLogData() {
    this.tips = this.tipsResolver.dataModel
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.tips.slice(startIndex, endIndex);
  }

  export_auditlog() {
    new ngxCsv(JSON.stringify(this.tips), 'reports', {
      headers: ['id','progressive','creation_date','last_update','expiration_date','context_id','status','substatus','tor','comments','messages','files','last_access'],
    });
  }
}
