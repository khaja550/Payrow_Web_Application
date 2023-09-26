import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { IAxisLabelRenderEventArgs, Chart } from '@syncfusion/ej2-charts';

import {
    ILoadedEventArgs,
    ChartComponent,
    ChartTheme,
    IPointRenderEventArgs,
    ITooltipRenderEventArgs,
} from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { saveComplete } from '@syncfusion/ej2-angular-grids';
import { HttpClient } from '@angular/common/http';
import { HomeService } from 'src/app/services/home.service';
declare var jQuery: any;
declare var FusionCharts: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    maxValue: any;
    isDashboardURL: Boolean = false;
    // toggleButton: boolean = true;
    data: any = [];
    taptoPayTrans: any = [];
    invoiceTrans: any = [];
    donutData1:any=[];
    toggleButton: boolean = true;
    toggleQuater: boolean = true;
    toggleStatus: boolean = true;
    btnVal: string = "Update";
    Qbtn: string = "Update";
    StatusBtn: string = "Update";
    finalData: any = [];
    finalQuarterData: any = [];
    finalDataFooter: any = [];
    finalDonutData: any = [];
    shortNumber: any;
    donutEvnt: boolean = true;


    d: any = 'assets/images/crUpdate.png';
    public dounttitle1: string = 'SEQUENCE';
    public dounttitle2: string = 'CRUpdate';
    public svgImg1: string = `${this.d}`;
    public color1: string = 'color:#6CB49C';
    public value1: any = 100000;


    public donutDataFooter: any = [
        { dounttitle: "Store Manager", svgImg: 'assets/images/credit.png', value: 10000, color: '#6CB49C', target: 1000000000, actual: 750000000, percent: null },
        { dounttitle: "Delivery POS", svgImg: 'assets/images/credit.png', value: 1000, color: '#AACC00', target: 1000000000, actual: 700000000, percent: null },
        { dounttitle: "Staff POS", svgImg: 'assets/images/credit.png', value: 500, color: '#3F88A9', target: 5000000000, actual: 3000000000, percent: null }
    ]

    public donutData: any = []

    //     {
    //         id: 1,
    //         dounttitle: 'CREDIT',
    //         svgImg: 'assets/images/credit.png',
    //         value: 10000,
    //         color: '#6CB49C',
    //         target: 1000000,
    //         actual: 800000,
    //         percent: null,
    //     },
    //     // {
    //     //     id: 2,
    //     //     dounttitle: 'APP DOWNLOAD',
    //     //     svgImg: 'assets/images/credit.png',
    //     //     value: 1000,
    //     //     color: '#AACC00',
    //     //     target: 1000000,
    //     //     actual: 500000,
    //     //     percent: null,
    //     // },
    //     {
    //         id: 3,
    //         dounttitle: 'CASH',
    //         svgImg: 'assets/images/credit.png',
    //         value: 500,
    //         color: '#3F88A9',
    //         target: 5000000,
    //         actual: 300000,
    //         percent: null,
    //     },
    //     {
    //         id: 4,
    //         dounttitle: 'TAP TO PAY',
    //         svgImg: 'assets/images/credit.png',
    //         value: 500,
    //         color: '#DDD700',
    //         target: 5600000,
    //         actual: 4000000,
    //         percent: null,
    //     },

    // ];
    public quarterData: any = [
        { id: 1, quarterTitle: 'Q1' },
        { id: 2, quarterTitle: 'Q2' },
        { id: 3, quarterTitle: 'Q3' },
        { id: 4, quarterTitle: 'Q4' },
    ];
    public yearlyData: any = []
    //     { id: 1, target: 1100000, actual: 11000, month: 'Jan' }, { id: 2, target: 1500000, actual: 11000, month: 'Feb' }, { id: 3, target: 1200000, actual: 14000, month: 'Mar' },
    //     { id: 4, target: 1400000, actual: 10000, month: 'Apr' }, { id: 5, target: 1400000, actual: 24000, month: 'May' }, { id: 6, target: 1100000, actual: 11000, month: 'Jun' },
    //     { id: 7, target: 1100000, actual: 18000, month: 'Jul' }, { id: 8, target: 1100000, actual: 17090, month: 'Aug' }, { id: 9, target: 1400000, actual: 14909, month: 'Sep' },
    //     { id: 10, target: 1100000, actual: 23000, month: 'Oct' }, { id: 11, target: 3600000, actual: 22000, month: 'Nov' }, { id: 12, target: 2800000, actual: 12098, month: 'Dec' },
    // ]
    months: any = [
        { "month": "Jan", "id": 1 }, { "month": "Feb", "id": 2 }, { "month": "Mar", "id": 3 }, { "month": "Apr", "id": 4 },
        { "month": "May", "id": 5 }, { "month": "Jun", "id": 6 }, { "month": "Jul", "id": 7 }, { "month": "Aug", "id": 8 },
        { "month": "Sep", "id": 9 }, { "month": "Oct", "id": 10 }, { "month": "Nov", "id": 11 }, { "month": "Dec", "id": 12 },
    ]
    //Initializing Primary X Axis
    public prXAxis: Object = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        valueType: 'Category',
    };
    //Initializing Primary Y Axis
    public prYAxis: any = {
        lineStyle: { width: 0 },
        minimum: 0,
        //maximum: 25,
        interval: 5,
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 0 },
        minorTickLines: { width: 0 },

    };
    public radius: Object = {
        bottomLeft: 0,
        bottomRight: 0,
        topLeft: 5,
        topRight: 5,
    };
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Top',
            font: { fontWeight: '600', color: '#ffffff' },
        },
    };
    public title: string = '';
    public tooltip: Object = {
        enable: false,
    };
    public legend: Object = {
        visible: false,
    };
    public chartArea: Object = {
        border: {
            width: 0,
        },
    };
    public width: string = Browser.isDevice ? '100%' : '96%';
    // custom code start
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
    // custom code end

    constructor(private app: AppManagerService, private router: Router, private cdr: ChangeDetectorRef,
        private http: HttpClient, private dashboard: HomeService) {
        this.app.ShowReportDate = 'true';
    }

    ngOnInit(): void {
        this.getDashboardData()
        const curUrl = this.router.url;
        console.log(curUrl);
        const URLs = [
            '/dashboard/tap-to-pay',
            '/dashboard/cash-invoice',
            '/dashboard/expenses',
        ];
        console.log(URLs.indexOf(curUrl));

        if (URLs.indexOf(curUrl) !== -1) {
            this.isDashboardURL = true
            setTimeout(() => this.externalRouts(), 0)
        }
        else {
            this.isDashboardURL = false;
        }

        // this.barChartData();
        this.donutChartsData()
        if (this.isDashboardURL === true) {
            this.prYAxis['maximum'] = 50;
        } else {
            this.prYAxis['maximum'] = 50
        }

        // this.prYAxis['labelFormat'] = '${value}' + `${this.shortNumber}`;
    }
    private loadjQueryScripts(): void {
        (($) => {
            'use strict';
            $('.knob').knob();

            $('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
            $('#side_menu_bar > ul > li.nav-item > a#li_dashboard').addClass(
                'active'
            );
        })(jQuery);
    }

    getDashboardData() {
        let cash: any=0,tap:any=0,credit:any=0,target:any=0;
        this.dashboard.DashboardBarchart().subscribe((data) => {
            data.dashboard.map((item: any) => {
                this.months.map((mData: any) => {
                    if (mData.id === item.month) {
                        this.yearlyData.push(
                            { id: item.month, target: item.targetValue, actual: item.CREDIT, month: mData.month }
                        )
                        cash=cash+item.cashValue;
                        tap=tap+item.tapValue;
                        credit=credit+item.CREDIT;
                        target=item.targetValue
                    }
                })
            })
            this.donutData.push(
                {dounttitle: 'Total Revenue',svgImg: 'assets/images/credit.png',color: '#6CB49C',
                target: target,actual: credit,percent: null},
                {dounttitle: 'TAP TO PAY',svgImg: 'assets/images/credit.png',color: '#DDD700',
                target: target,actual: tap,percent: null},
                {dounttitle: 'CASH',svgImg: 'assets/images/credit.png',color: '#3F88A9',
                target: target,actual: cash,percent: null})
            this.barChartData()
            this.donutChartsData()
        })
    }
    barChartData() {
        this.finalData = [];
        this.finalQuarterData = [];
        this.data = [];
        let max: any;
        if (this.yearlyData && this.yearlyData.length > 0) {
            this.yearlyData.map((x: any) => {
                const Obj: any = {};
                x.percent = Math.round(x.actual / x.target * 100);
                this.finalData.push(x);
                Obj.x = x.month;
                Obj.y = x.actual / 1000;
                this.data = [...this.data, Obj];

                for (let i in this.quarterData) {
                    this.quarterData[i].quarter =
                        this.quarterData[i].quarterTitle === "Q1" ? this.yearlyData.slice(0, 3) :
                            this.quarterData[i].quarterTitle === "Q2" ? this.yearlyData.slice(3, 6) :
                                this.quarterData[i].quarterTitle === "Q3" ? this.yearlyData.slice(6, 9) : this.yearlyData.slice(9, 12);
                }
            });
            max = this.yearlyData.reduce(function (prev: any, current: any) {
                return (prev.actual > current.actual) ? prev : current
            }, 0);
            this.maxValue = max.actual

        }
        if (this.quarterData && this.quarterData.length > 0) {
            this.quarterData.map((x: any) => {
                x.target = 0;
                x.actual = 0;
                x.quarter.map((q: any) => {
                    x.target = x.target + q.target;
                    x.actual = x.actual + q.actual;
                })
                x.percent = Math.round(x.actual / x.target * 100);
                this.finalQuarterData.push(x);
            })
        }
        this.shortNumber = this.shortNumberFunc(max.actual);
        this.prYAxis['labelFormat'] = '{value}' + `${this.shortNumber}`;
    }
    shortNumberFunc(value: any) {
        if (value === null) return null;
        if (value === 0) return "0";
        var fractionSize = 1;
        var abs = Math.abs(value);
        var rounder = Math.pow(10, fractionSize);
        var isNegative = value < 0;
        var key = '';
        var powers = [
            { key: "Q", value: Math.pow(10, 15) },
            { key: "T", value: Math.pow(10, 12) },
            { key: "B", value: Math.pow(10, 9) },
            { key: "M", value: Math.pow(10, 6) },
            { key: "k", value: 1000 }
        ];
        for (let i in powers) {
            var reduced = abs / powers[i].value;
            reduced = Math.round(reduced * rounder) / rounder;
            if (reduced >= 1) {
                abs = reduced;
                key = powers[i].key;
                break;
            }
        }
        return (isNegative ? '-' : '') + key;
    }
    ngAfterViewInit(): void {

        this.loadjQueryScripts();
    }
    // Enable & Disable Target function

    enable(value: any) {

        switch (value) {
            case 'target':
                this.toggleButton = !this.toggleButton;
                // this.btnVal = this.btnVal === 'Update'? 'Save' : 'Update';
                break;
            case 'current':
                this.toggleStatus = !this.toggleStatus;
                //this.StatusBtn = this.StatusBtn === 'Update'? 'Save' : 'Update';
                break;
            default:
                break;
        }
    }
    update(row: any) {
        this.yearlyData.map((yrData: any) => {
            if (row.id === yrData.id) {
                yrData.target = parseInt(row.target)
            }
        });
        this.donutData.map((donutrow: any) => {
            if (row.id === donutrow) {
                donutrow.target = parseInt(donutrow.target);
            }
        })
    }

    Save(i: any) {
        if (i === 'target') {
            this.finalData = [];
            this.finalQuarterData = [];
            this.barChartData();
            this.toggleButton = true
        }
        if (i === 'current') {
            this.toggleStatus = true;
            //this.donutData=[];
            this.donutChartsData();

        }
    }


    //taptoPay And Cash Invoice ==>temporarily  i have fixed this functionality ,Once Realdata appears we will chnage it
    externalRouts() {
        let max: any;
        const curUrl = this.router.url;
        this.finalData = [];
        this.finalQuarterData = [];
        this.data = [];
        this.yearlyData.map((yrData: any) => {
            yrData.target = yrData.target / 2;
            yrData.actual = yrData.actual / 2;
            this.taptoPayTrans = [...this.taptoPayTrans, yrData];
            this.invoiceTrans = [...this.invoiceTrans, yrData];

            const Obj: any = {};
            yrData.percent = Math.round(yrData.actual / yrData.target * 100);
            this.finalData.push(yrData);
            Obj.x = yrData.month;
            Obj.y = yrData.actual / 1000;
            this.data = [...this.data, Obj];

            for (let i in this.quarterData) {
                this.quarterData[i].quarter =
                    this.quarterData[i].quarterTitle === "Q1" ? this.yearlyData.slice(0, 3) :
                        this.quarterData[i].quarterTitle === "Q2" ? this.yearlyData.slice(3, 6) :
                            this.quarterData[i].quarterTitle === "Q3" ? this.yearlyData.slice(6, 9) : this.yearlyData.slice(9, 12);
            }
        });
        max = this.yearlyData.reduce(function (prev: any, current: any) {
            return (prev.actual > current.actual) ? prev : current
        });
        this.maxValue = max.actual;
        if (this.quarterData && this.quarterData.length > 0) {
            this.quarterData.map((x: any) => {
                x.target = 0;
                x.actual = 0;
                x.quarter.map((q: any) => {
                    x.target = x.target + q.target;
                    x.actual = x.actual + q.actual;
                })
                x.percent = Math.round(x.actual / x.target * 100);
                this.finalQuarterData.push(x);
            })
        }
        this.shortNumber = this.shortNumberFunc(max.actual);
    }
    donutChartsData() {

        this.finalDonutData = [];
        if (this.donutData && this.donutData.length > 0) {
            this.donutData.map((x: any) => {
                x.percent = Math.round(x.actual / x.target * 100);
                const tempVal = 100 - x.percent;
                x.doNut = `${x.percent} ${tempVal}`
                this.finalDonutData.push(x);
            })
        }
        if (this.donutDataFooter && this.donutDataFooter.length > 0) {
            this.donutDataFooter.map((x: any) => {

                x.percent = Math.round(x.actual / x.target * 100);
                const tempVal = 100 - x.percent;
                x.doNut = `${x.percent} ${tempVal}`
                this.finalDataFooter.push(x);
            })
        }
        (($) => {
            'use strict';
            $('.knob').knob();
        })(jQuery);
    }

}
