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

  private calculatePercentage(value: number, total: number): string {
    return ((value / total) * 100).toFixed(1);
  }

  private formatLabels(labels: string[], ...percentages: (number | string)[]): string[] {
    return labels.map((label, index) => {
      const translatedLabel = this.translateService.instant(label);
      const percentageLabel = `${translatedLabel} ${percentages[index]}%`;

      if (label === "Anonymous" || label === "Subscribed" || label === "Subscribed later") {
        return `${percentageLabel} - (${percentages[index + labels.length]})`;
      } else {
        return percentageLabel;
      }
    });
  }

  private createChart(title: string, total: number, labels: string[], values: number[], colors: string[]) {
    return {
      title: this.translateService.instant(title),
      total: total,
      labels: labels,
      values: values,
      colors: colors,
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
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
              font: { size: 12 },
            },
          },
          tooltip: {
            callbacks: {
              label: (context: any) => context.dataset.label + ': ' + context.parsed,
            },
          },
        },
      },
    };
  }

  private initializeCharts(): void {
    const { dataModel } = this.statisticsResolver;
    const reports_count: number = dataModel.reports_count;

    const a_1: number = dataModel.reports_with_no_access || 0;
    const a_2: number = reports_count - dataModel.reports_with_no_access || 0;
    const totAcc: number = a_1 + a_2;

    const b_1: number = dataModel.reports_anonymous || 0;
    const b_2: number = dataModel.reports_subscribed || 0;
    const b_3: number = dataModel.reports_initially_anonymous || 0;
    const totId: number = b_1 + b_2 + b_3;

    const c_1: number = dataModel.reports_tor || 0;
    const c_2: number = reports_count - dataModel.reports_tor || 0;
    const totTor: number = c_1 + c_2;

    const d_1: number = dataModel.reports_mobile || 0;
    const d_2: number = reports_count - dataModel.reports_mobile || 0;
    const totMobile: number = d_1 + d_2;

    const torAccLabels = this.formatLabels(["Yes", "No"], this.calculatePercentage(a_1, totAcc), this.calculatePercentage(a_2, totAcc), dataModel.reports_with_no_access);
    const anonymityLabels = this.formatLabels(["Anonymous", "Subscribed", "Subscribed later"], this.calculatePercentage(b_1, totId), this.calculatePercentage(b_2, totId), this.calculatePercentage(b_3, totId), dataModel.reports_anonymous, dataModel.reports_subscribed, dataModel.reports_initially_anonymous);
    const torLabels = this.formatLabels(["Yes", "No"], this.calculatePercentage(c_1, totTor), this.calculatePercentage(c_2, totTor), dataModel.reports_tor);
    const mobileLabels = this.formatLabels(["Yes", "No"], this.calculatePercentage(d_1, totMobile), this.calculatePercentage(d_2, totMobile), dataModel.reports_mobile);

    this.charts.push(this.createChart("Returning whistleblowers", totAcc, torAccLabels, [a_1, a_2], ["rgb(96,186,255)", "rgb(0,127,224)"]));
    this.charts.push(this.createChart("Anonymity", totId, anonymityLabels, [b_1, b_2, b_3], ["rgb(96,186,255)", "rgb(0,127,224)", "rgb(0,46,82)"]));
    this.charts.push(this.createChart("Tor", totTor, torLabels, [c_1, c_2], ["rgb(96,186,255)", "rgb(0,127,224)"]));
    this.charts.push(this.createChart("Mobile", totMobile, mobileLabels, [d_1, d_2], ["rgb(96,186,255)", "rgb(0,127,224)"]));
  }
}
