import {Component, OnInit} from "@angular/core";
import {auditlogResolverModel} from "@app/models/resolvers/auditlogResolverModel";
import {AuditlogResolver} from "@app/shared/resolvers/auditlog.resolver";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";
import {UtilsService} from "@app/shared/services/utils.service";
import {ngxCsv} from "ngx-csv";

@Component({
  selector: "src-auditlog-tab1",
  templateUrl: "./audit-log-tab1.component.html"
})
export class AuditLogTab1Component implements OnInit {
  currentPage = 1;
  pageSize = 20;
  auditLog: any = new auditlogResolverModel();

  constructor(private auditLogResolver: AuditlogResolver, public nodeResolver: NodeResolver, public utilsService: UtilsService) {
  }

  ngOnInit() {
    this.loadAuditLogData();
  }

  loadAuditLogData() {
    this.auditLog = this.auditLogResolver.dataModel;
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.auditLog.slice(startIndex, endIndex);
  }

  exportAuditLog() {
    new ngxCsv(JSON.stringify(this.auditLog), "auditlog", {
      headers: ["Date", "Type", "Severity", "User", "Object", "data"],
    });
  }
}
