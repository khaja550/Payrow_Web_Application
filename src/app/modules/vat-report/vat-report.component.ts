import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash'
import {BarServiceService} from 'src/services/bar-service.service';
import { ILoadedEventArgs, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-vat-report',
  templateUrl: './vat-report.component.html',
  styleUrls: ['./vat-report.component.scss']
})
export class VatReportComponent implements OnInit {
  complaintsData: any = []
  distributorForm: FormGroup;
  searchText: any;
  public palette: String[];
  sortValue: any;
  sortType: string;
  sortReverse: boolean = false;
  complaintObj: any = []
  remarksoutData: any = [];

  public remarksMsg: any
  public finalTabularData: any = [];
  public finalData: any = [];
  selectedStatus: any = ""
  constructor(
    private app: AppManagerService, private fb: FormBuilder, private bar_srvc: BarServiceService
  ) {
    this.app.ShowReportDate = 'true';
  }
  status: any = [{ key: "Open", color: "green" }, { key: "Close", color: "Yellow" }, { key: "Dispute", color: "Red" }]
  public complaintsList: any = [
    { trn: 201, user_name: "Arvind", tapToPay: "989763", cashInvoice: "989763", expenses:"989763",totalVat:"989763", totCredit: 732984, attachment:"",reqNo:"123",delay: 7, status: "Open" },
    { trn: 202, user_name: "Sudhakar", tapToPay: "772598", cashInvoice: "772598", expenses:"772598", totalVat:"772598", totCredit: 987124, attachment:"",reqNo:"123",delay: 12, status: "Open" },
    { trn: 203, user_name: "Chandra", tapToPay: "874543", cashInvoice: "874543", expenses:"874543", totalVat:"874543", totCredit: 912739, attachment:"",reqNo:"123",delay: 5, status: "Dispute" },
    { trn: 204, user_name: "Sadhana", tapToPay: "653254", cashInvoice: "653254", expenses:"653254", totalVat:"653254", totCredit: 561433, attachment:"",reqNo:"123",delay: 10, status: "Open" },
    { trn: 205, user_name: "Vikram", tapToPay: "987585", cashInvoice: "987585", expenses:"987585", totalVat:"987585", totCredit: 614276, attachment:"",reqNo:"123",delay: 3, status: "Close" },
    { trn: 206, user_name: "Arun Kumar", tapToPay: "815746", cashInvoice: "815746", expenses:"815746", totalVat:"815746", totCredit: 187251, attachment:"",reqNo:"123",delay: 9, status: "Dispute" },
    { trn: 207, user_name: "Ram", tapToPay: "672379", cashInvoice: "672379", expenses:"672379", totalVat:"672379", totCredit: 986753, attachment:"",reqNo:"123",delay: 5, status: "Open" },
    { trn: 208, user_name: "Krishna", tapToPay: "953637", cashInvoice: "953637", expenses:"953637", totalVat:"953637", totCredit: 564365, attachment:"",reqNo:"123",delay: 10, status: "Close" },
    { trn: 209, user_name: "Prasd", tapToPay: "757258", cashInvoice: "757258", expenses:"757258", totalVat:"757258", totCredit: 635272, attachment:"",reqNo:"123",delay: 4, status: "Dispute" },
    { trn: 210, user_name: "RadheSyam", tapToPay: "958723", cashInvoice: "958723", expenses:"958723", totalVat:"958723", totCredit: 847982, attachment:"",reqNo:"123",delay: 11, status: "Open" },
    { trn: 211, user_name: "Kiran", tapToPay: "976563", cashInvoice: "976563", expenses:"976563", totalVat:"976563", totCredit: 416798, attachment:"",reqNo:"123",delay: 7, status: "Close" }
  ]

  public remarksData: any = [];

  public radius: Object = { bottomLeft: 0, bottomRight: 0, topLeft: 5, topRight: 5 }
  months: String[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', ' Nov', 'Dec'];
  public tooltip: Object = {
    enable: true
  };
  public title: string = '';
  public legend: Object = {
    visible: false
  }
  public chartArea: Object = {
    border: {
      width: 0
    }
  };

  ngOnInit(): void {

    console.log("####################################", new Date().toISOString().slice(0, 10));
    this.getcomplaintsData();
    this.complaintsList;

  }

  ngAfterViewInit(): void {

    this.loadScripts()
  }
  public randomIntFromInterval(min: any, max: any): any { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  private loadScripts(): void {
    (function ($) {
      "use strict";
      $('.knob').knob();

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_vat_report').addClass("active");
    })(jQuery);
  }
  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(
      (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
        /-dark/i,
        'Dark'
      )
    );

  }

  sortOrders(prop: any) {
    this.sortType = prop;
    this.complaintsList = this.sortReverse === false ?
      _.orderBy(this.complaintsList, [prop], ['desc']) :
      _.orderBy(this.complaintsList, [prop], ['asc']);
    this.sortReverse = !this.sortReverse;
  }


  sort(event: any) {
    if (event) {
      this.sortValue = event;
    }
    this.complaintsList = event === "A to Z" ? _.orderBy(this.complaintsList, [(obj) => obj['cust_name'].toLowerCase()], ['asc'])
      : event === "Z to A" ? _.orderBy(this.complaintsList, [(obj) => obj['cust_name'].toLowerCase()], ['desc'])
        : event === "date_low" ? _.orderBy(this.complaintsList, ['date'], ['asc'])
          : _.orderBy(this.complaintsList, ['date'], ['desc'])
  }

  async getcomplaintsData() {
    this.complaintsList.map((data: any) => {
      data.color = data.status === 'Dispute' ? 'red' : data.status === 'Close' ? 'green' : 'yellow'
    })
  }
  updateRemarks(msg: any) {
    let obj: any = {};
    this.remarksoutData = []
    obj["data"] = msg;
    obj["date"] = new Date().toISOString().slice(0, 10);
    obj["name"] = "Distributor Name Here"
    this.complaintObj[0].remarks.map((data: any) => {
      data.out = [...data.out, obj]
    });
    this.remarksoutData = this.complaintObj[0].remarks[0].out;
    this.remarksMsg = ""
  }
  edit(complaint: any) {
    this.complaintObj = [];
    this.complaintObj.push(complaint);
    this.remarksData = [];
    for (let i in complaint.remarks) {
      complaint.remarks[i].in.map((iData: any) => {
        iData["name"] = complaint.cust_name;
      })
      this.remarksData = complaint.remarks[i].in;
    }

  }

}
