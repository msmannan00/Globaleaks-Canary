import {Component, OnInit} from '@angular/core';
import {auditlogResolverModel} from "../../../../models/resolvers/auditlogResolverModel";
import {AuditlogResolver} from "../../../../shared/resolvers/auditlog.resolver";
import {NodeResolver} from "../../../../shared/resolvers/node.resolver";
import {UtilsService} from "../../../../shared/services/utils.service";
import {ngxCsv} from "ngx-csv";

@Component({
  selector: 'src-auditlog-tab1',
  templateUrl: './auditlog-tab1.component.html'
})
export class AuditlogTab1Component implements OnInit{
  currentPage = 1;
  pageSize = 20;
  auditLog:any = new auditlogResolverModel()
  constructor(private auditlogResolver: AuditlogResolver, public nodeResolver:NodeResolver, public utilsService:UtilsService) {}

  ngOnInit() {
    this.loadAuditLogData();
  }

  loadAuditLogData() {
    this.auditLog = this.auditlogResolver.dataModel
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.auditLog.slice(startIndex, endIndex);
  }

  export_auditlog() {
    new ngxCsv(JSON.stringify(this.auditLog), 'auditlog', {
      headers: ['Date', 'Type', 'Severity', 'User', 'Object', 'data'],
    });
  }
}
