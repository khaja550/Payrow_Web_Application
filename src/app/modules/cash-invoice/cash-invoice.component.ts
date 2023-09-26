import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { BarServiceService } from 'src/services/bar-service.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import * as _ from 'lodash';
import { AdminAPIService } from 'src/app/services/admin-api.service';
import { HttpParams } from '@angular/common/http';
declare var jQuery: any;

@Component({
    selector: 'app-cash-invoice',
    templateUrl: './cash-invoice.component.html',
    styleUrls: ['./cash-invoice.component.scss']
})
export class CashInvoiceComponent implements OnInit {

    constructor(
        private app: AppManagerService, private bar_service: BarServiceService, private admin: AdminAPIService
    ) {
        this.app.ShowReportDate = 'true';
    }
    searchText: any;
    sortType: string;
    sortReverse: boolean = false;
    public csvOptions: any = {};
    public csvData: any = [];
    finalData: any = [];
    report_title: string;
    selected: any;
    months: any = [
        { "month": "Jan", "id": 1 }, { "month": "Feb", "id": 2 }, { "month": "Mar", "id": 3 }, { "month": "Apr", "id": 4 },
        { "month": "May", "id": 5 }, { "month": "Jun", "id": 6 }, { "month": "Jul", "id": 7 }, { "month": "Aug", "id": 8 },
        { "month": "Sep", "id": 9 }, { "month": "Oct", "id": 10 }, { "month": "Nov", "id": 11 }, { "month": "Dec", "id": 12 },
    ]
    public month: any;
    public cashInvoiceData: any = []
    public cashinvoiceData: any = []

    ngOnInit(): void {
        this.selected = new Date().toLocaleDateString(undefined, { month: 'short' });
        this.getCashInvoiceData();
        this.loadScripts();
        this.getCashData(this.selected)
    }

    private loadScripts(): void {
        (function ($) {
            "use strict";

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_cash_invoice').addClass("active");


        })(jQuery);
    }
    sortOrders(prop: any) {
        this.sortType = prop;
        this.cashInvoiceData = this.sortReverse === false ?
            _.orderBy(this.cashInvoiceData, [prop], ['desc']) :
            _.orderBy(this.cashInvoiceData, [prop], ['asc']);
        this.sortReverse = !this.sortReverse;
    }

    reportDownload() {
        this.csvData = [];
        if (this.finalData) {
            this.finalData.map((csv: any) => {
                let Obj: any = {};
                Obj['date'] = csv.date;
                Obj['time'] = csv.time;
                Obj['merchant_id'] = csv.merchant_id;
                Obj['posType'] = csv.posType;
                Obj['pos_id'] = csv.pos_id
                Obj['item'] = csv.item
                Obj['email_id'] = csv.email_id
                Obj['mobile'] = csv.mobile
                Obj['sequence_no'] = csv.sequence_no
                Obj['receipt_no'] = csv.receipt_no
                Obj['vat'] = csv.vat
                Obj['total_credit'] = csv.total_credit
                this.csvData = [...this.csvData, Obj];
            })
        }
        const options = {
            title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
            headers: ['date', 'time', 'merchant_id', 'posType', 'pos_id', 'item', 'email_id', 'mobile', 'sequence_no', 'receipt_no', 'vat', 'total_credit']
        };
        this.csvOptions = options;
        this.report_title = 'Cash Invoice';

        new AngularCsv(this.csvData, this.report_title, this.csvOptions);
    }

    async getCashInvoiceData() {
        await this.bar_service.getPosPerformanceData().then(data => {
            this.cashInvoiceData = data;
        });
        this.getfInvoiceData(this.selected)

    }
    onSelectMonth(event: any) {
        this.selected = event.target.value;
        this.getfInvoiceData(this.selected)

        // this.getCashData(this.selected)
    }

    async getfInvoiceData(month: any) {
        this.finalData = [];
        await this.cashInvoiceData.map((mData: any) => {
            if (month === mData.month) {
                mData.data.map((fData: any) => {
                    this.finalData.push(fData);
                })
            }
        })
    }
    // async getCashDatabyDid(month: any) {
    //     this.cashinvoiceData=[]
    //     let value: any
    //     let did: any = 7123897
    //     this.months.map((mData: any) => {
    //         if (month === mData.month) {
    //             this.admin.getcashDetailsByDid(did,mData.id).subscribe(data => {
    //                 if (data) {
    //                     data.map((tData: any) => {
    //                         let vat = (tData._id.cash * 5) / 100
    //                         tData.vat = vat
    //                         this.cashinvoiceData.push(tData)
    //                         console.log(this.cashinvoiceData)
    //                     });
    //                 }
    //             })
    //         }
    //     })
    // }
    async getCashData(month: any) {
        this.cashinvoiceData=[]
        let value: any
        this.months.map((mData: any) => {
            if (month === mData.month) {
                this.admin.getcashDetails(mData.id).subscribe(data => {
                    if (data) {
                        data.map((tData: any) => {
                            let vat = (tData.value.cashValue * 5) / 100
                            tData.vat = vat
                            this.cashinvoiceData.push(tData)
                        });
                    }
                })
            }
        })
    }
}
