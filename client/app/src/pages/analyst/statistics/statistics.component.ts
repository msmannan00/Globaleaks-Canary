import { Component, OnInit } from '@angular/core';
import { StatisticsResolver } from '@app/shared/resolvers/statistics.resolver';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'src-statistics',
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {
  charts: any[] = [];

  constructor(private translateService: TranslateService, private statisticsResolver: StatisticsResolver) { }

  ngOnInit(): void {
    this.initializeCharts();
  }
  private initializeCharts(): void {
    const reports_count: number = this.statisticsResolver.dataModel.reports_count;

    let a_1: any = this.statisticsResolver.dataModel.reports_with_no_access || 0;
    let a_2: any = reports_count - this.statisticsResolver.dataModel.reports_with_no_access || 0;
    let totAcc = a_1 + a_2;
    a_1 = ((a_1 / totAcc) * 100).toFixed(1);
    a_2 = 100 - parseFloat(a_1);

    let b_1: any = this.statisticsResolver.dataModel.reports_anonymous || 0;
    let b_2: any = this.statisticsResolver.dataModel.reports_subscribed || 0;
    let b_3: any = this.statisticsResolver.dataModel.reports_initially_anonymous || 0;
    let totId = b_1 + b_2 + b_3;
    b_1 = ((b_1 / totId) * 100).toFixed(1);
    b_2 = ((b_2 / totId) * 100).toFixed(1);
    b_3 = 100 - parseFloat(b_1) - parseFloat(b_2);

    let c_1: any = this.statisticsResolver.dataModel.reports_tor || 0;
    let c_2: any = reports_count - this.statisticsResolver.dataModel.reports_tor || 0;
    let totTor = c_1 + c_2;
    c_1 = ((c_1 / totTor) * 100).toFixed(1);
    c_2 = 100 - parseFloat(c_1);

    let d_1: any = this.statisticsResolver.dataModel.reports_mobile || 0;
    let d_2: any = reports_count - this.statisticsResolver.dataModel.reports_mobile || 0;
    let totMobile = d_1 + d_2;
    d_1 = ((d_1 / totMobile) * 100).toFixed(1);
    d_2 = 100 - parseFloat(d_1);

    const returning_wb_labels = ["Yes", "No"].map((label) => this.translateService.instant(label));
    const anonymity_wb_labels = ["Anonymous", "Subscribed", "Subscribed later"].map((label) =>
      this.translateService.instant(label)
    );
    const tor_wb_labels = ["Yes", "No"].map((label) => this.translateService.instant(label));
    const mobile_wb_labels = ["Yes", "No"].map((label) => this.translateService.instant(label));

    returning_wb_labels[0] = `${returning_wb_labels[0]} ${a_1}% - (${reports_count - this.statisticsResolver.dataModel.reports_with_no_access})`;
    returning_wb_labels[1] = `${returning_wb_labels[1]} ${a_2}% - (${this.statisticsResolver.dataModel.reports_with_no_access})`;

    anonymity_wb_labels[0] = `${anonymity_wb_labels[0]} ${b_1}% - (${this.statisticsResolver.dataModel.reports_anonymous})`;
    anonymity_wb_labels[1] = `${anonymity_wb_labels[1]} ${b_2}% - (${this.statisticsResolver.dataModel.reports_subscribed})`;
    anonymity_wb_labels[2] = `${anonymity_wb_labels[2]} ${b_3}% - (${this.statisticsResolver.dataModel.reports_initially_anonymous})`;

    tor_wb_labels[0] = `${tor_wb_labels[0]} ${c_1}% - (${this.statisticsResolver.dataModel.reports_tor})`;
    tor_wb_labels[1] = `${tor_wb_labels[1]} ${c_2}% - (${reports_count - this.statisticsResolver.dataModel.reports_tor})`;

    mobile_wb_labels[0] = `${mobile_wb_labels[0]} ${d_1}% - (${this.statisticsResolver.dataModel.reports_mobile})`;
    mobile_wb_labels[1] = `${mobile_wb_labels[1]} ${d_2}% - (${reports_count - this.statisticsResolver.dataModel.reports_mobile})`;

    this.charts.push({
      title: this.translateService.instant("Returning whistleblowers"),
      total: totAcc,
      labels: returning_wb_labels,
      values: [parseFloat(a_1), a_2],
      colors: ["rgb(96,186,255)", "rgb(0,127,224)"],
      data: {
        labels: returning_wb_labels,
        datasets: [
          {
            data: [parseFloat(a_1), a_2],
            backgroundColor: ["rgb(96,186,255)", "rgb(0,127,224)"],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            onClick: (e: any) => e.stopPropagation(),
            display: true,
            position: 'left',
            labels: {
              color: '#333',
              font: { size: 12 }
            },
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                return context.dataset.label + ': ' + context.parsed;
              },
            },
          },
        },
      },
    });

    this.charts.push({
      title: this.translateService.instant("Anonymity"),
      labels: anonymity_wb_labels,
      values: [parseFloat(b_1), parseFloat(b_2), parseFloat(b_3)],
      colors: ["rgb(96,186,255)", "rgb(0,127,224)", "rgb(0,46,82)"],
      data: {
        labels: anonymity_wb_labels,
        datasets: [
          {
            data: [parseFloat(b_1), parseFloat(b_2), parseFloat(b_3)],
            backgroundColor: ["rgb(96,186,255)", "rgb(0,127,224)", "rgb(0,46,82)"],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            onClick: (e: any) => e.stopPropagation(),
            display: true,
            position: 'left',
            labels: {
              color: '#333',
              font: { size: 12 }
            },
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                return context.dataset.label + ': ' + context.parsed;
              },
            },
          },
        },
      },
    });

    this.charts.push({
      title: this.translateService.instant("Tor"),
      total: totTor,
      labels: tor_wb_labels,
      values: [parseFloat(c_1), c_2],
      colors: ["rgb(96,186,255)", "rgb(0,127,224)"],
      data: {
        labels: tor_wb_labels,
        datasets: [
          {
            data: [parseFloat(c_1), c_2],
            backgroundColor: ["rgb(96,186,255)", "rgb(0,127,224)"],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            onClick: (e: any) => e.stopPropagation(),
            display: true,
            position: 'left',
            labels: {
              color: '#333',
              font: { size: 12 }
            },
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                return context.dataset.label + ': ' + context.parsed;
              },
            },
          },
        },
      },
    });

    this.charts.push({
      title: this.translateService.instant("Mobile"),
      total: totMobile,
      labels: mobile_wb_labels,
      values: [parseFloat(d_1), d_2],
      colors: ["rgb(96,186,255)", "rgb(0,127,224)"],
      data: {
        labels: mobile_wb_labels,
        datasets: [
          {
            data: [parseFloat(d_1), d_2],
            backgroundColor: ["rgb(96,186,255)", "rgb(0,127,224)"],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            onClick: (e: any) => e.stopPropagation(),
            display: true,
            position: 'left',
            labels: {
              color: '#333',
              font: { size: 12 }
            },
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                return context.dataset.label + ': ' + context.parsed;
              },
            },
          },
        },
      },
    });
  }

}
