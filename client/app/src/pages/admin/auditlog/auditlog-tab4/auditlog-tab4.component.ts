import { Component } from '@angular/core';
import {tipsResolverModel} from "../../../../models/resolvers/tipsResolverModel";
import {TipsResolver} from "../../../../shared/resolvers/tips.resolver";
import {NodeResolver} from "../../../../shared/resolvers/node.resolver";
import {UtilsService} from "../../../../shared/services/utils.service";
import {AppDataService} from "../../../../app-data.service";
import {ngxCsv} from "ngx-csv";
import {JobResolver} from "../../../../shared/resolvers/job.resolver";
import {jobResolverModel} from "../../../../models/resolvers/jobResolverModel";

@Component({
  selector: 'src-auditlog-tab4',
  templateUrl: './auditlog-tab4.component.html'
})
export class AuditlogTab4Component {
  currentPage = 1;
  pageSize = 20;
  jobs:any = new jobResolverModel()
  constructor(private jobResolver: JobResolver, public nodeResolver:NodeResolver, public utilsService:UtilsService, public appDataService:AppDataService) {}

  ngOnInit() {
    this.loadAuditLogData();
  }

  loadAuditLogData() {
    this.jobs = this.jobResolver.dataModel
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.jobs.slice(startIndex, endIndex);
  }

  export_auditlog() {
    new ngxCsv(JSON.stringify(this.jobs), 'jobs', {
    });
  }
}
