import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  dashboardData: any;
  // lineChart4
  public lineChart4Data: Array<any> = [
    {
      data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
      label: 'Series A'
    }
  ];
  public lineChart4Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public lineChart4Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        points: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: { point: { radius: 0 } },
    legend: {
      display: false
    }
  };
  public lineChart4Colours: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      borderWidth: 2
    }
  ];
  public lineChart4Legend = false;
  public lineChart4Type = 'line';


  // barChart2
  public barChart2Data: Array<any> = [
    {
      data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
      label: 'Series A',
      barPercentage: 0.6
    }
  ];
  public barChart2Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
        ticks: {
          beginAtZero: true,
        }
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart2Colours: Array<any> = [
    {
      backgroundColor: 'rgba(0,0,0,.2)',
      borderWidth: 0
    }
  ];
  public barChart2Legend = false;
  public barChart2Type = 'bar';


  constructor(private _DS: DashboardService) { }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData() {
    this._DS.getDashboardData().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.dashboardData = data.data;
        }
      }
    )
  }

}
