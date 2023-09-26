import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { BarServiceService } from 'src/services/bar-service.service'
import {
    FormControl,
    FormGroup,
    Validators,
    FormBuilder,
    ValidationErrors,
} from '@angular/forms';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
declare var jQuery: any;
import { HttpClient } from '@angular/common/http';
import { CustomersService } from 'src/app/services/customers.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    selector: 'app-top-customers',
    templateUrl: './top-customers.component.html',
    styleUrls: ['./top-customers.component.scss'],
})
export class TopCustomersComponent implements OnInit {
	curYear:any;
    constructor(private app: AppManagerService, private bar_Service: BarServiceService,
        private http: HttpClient, private customers: CustomersService,private note_service:NotificationService) {
        this.app.ShowReportDate = 'true';
    }
    months: any = [
        { "month": "Jan", "id": 1 }, { "month": "Feb", "id": 2 }, { "month": "Mar", "id": 3 }, { "month": "Apr", "id": 4 },
        { "month": "May", "id": 5 }, { "month": "Jun", "id": 6 }, { "month": "Jul", "id": 7 }, { "month": "Aug", "id": 8 },
        { "month": "Sep", "id": 9 }, { "month": "Oct", "id": 10 }, { "month": "Nov", "id": 11 }, { "month": "Dec", "id": 12 },
    ]
    searchText: any;
    selected: any;
    csvData: any = [];
    merchant_identify: string;
    finalData: any = [];
    public csvOptions: any = {};
    report_title: string;
    public jsonData: any = [];

    public ids: any = []

    ngOnInit(): void {
        this.selected = new Date().toLocaleDateString(undefined, { month: 'short' });
        this.loadScripts();
		this.curYear = new Date().getFullYear();
        //this.stepperfunction();

        this.getTopCustomers(this.selected);
    }

    private loadScripts(): void {
        (function ($) {
            'use strict';

            $('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
            $('#side_menu_bar > ul > li.nav-item > a#li_top_customers').addClass(
                'active'
            );
        })(jQuery);
    }

    //   private stepperfunction(): void {
    //     (($) => {
    //       'use strict';
    //       $(document).ready(function () {
    //         $('.stepper').mdbStepper();
    //       });

    //       function someFunction21() {
    //         setTimeout(function () {
    //           $('#horizontal-stepper').nextStep();
    //         }, 2000);
    //       }
    //     })(jQuery);
    //   }

    // jQuery SATHYA

    accountForm!: FormGroup;
    notification = false;
    appreciation = false;
    negotiate = false;
    apply_rate = false;
    step = 1;
    hr_Tag: boolean = false

    reportDownload() {
        this.csvData = [];
        if (this.finalData) {
            this.finalData.map((csv: any) => {
                let Obj: any = {};
                Obj['merchant_id'] = csv.merchant_id;
                Obj['merchant_name'] = csv.merchant_name;
                Obj['address'] = csv.address;
                Obj['expenses'] = csv.expenses
                Obj['seq_no'] = csv.seq_no
                Obj['average'] = csv.average
                Obj['total_credit'] = csv.total_credit
                this.csvData = [...this.csvData, Obj];
            })
        }
        const options = {
            title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
            headers: ['merchant_id', 'merchant_name', 'address', 'expenses', 'seq_no', 'average', 'total_credit']
        };
        this.csvOptions = options;
        this.report_title = 'Top 20 Customers';

        new AngularCsv(this.csvData, this.report_title, this.csvOptions);
    }

    next() {
        this.ids.map((obj: any) => {
            obj.step++
            this.customers.sendMail().subscribe(data=>{
                if(data.success === true){
                    this.note_service.showSuccess(`${200} : ${data.message}`,'')
                }else{
                    this.note_service.showError(`${data.status} : ${data.error.message}`,'')
                }
            })
        })
        // if (this.step == 1) {
        //     this.notification = true;
        //     this.step++
        // } else if (this.step == 2) {
        //     this.appreciation = true;
        //     this.step++
        // } else if (this.step == 3) {
        // this.negotiate = true;
        // this.step++
        // } else if (this.step == 4) {
        //     this.apply_rate = true;
        //     this.step++;
        // }

    };
    previous() {
        this.finalData.map((obj: any) => {
            if (this.merchant_identify === obj.merchant_name) {
                obj.step--
            }

        })
        //this.step--
        // if (this.step == 1) {
        //   this.notification = false;
        // } else if (this.step == 2) {
        //   this.appreciation = false;
        // } else if (this.step == 3) {
        //   this.negotiate = false;
        // } else if (this.step == 4) {
        //   this.apply_rate = false;
        // }
    };

    onMerchent(data: any) {
        this.merchant_identify = data;
        this.ids.map((obj: any) => {
            if (obj.merchantName === data) {
                obj.step = 1;
            }
        });
    }
    onSubmit() {
        console.log('Submit', this.accountForm.value);
    };

    async getTopCustomers(month: any) {
        let did = 7123897
        this.months.map((mdata: any) => {
            if (month === mdata.month) {
                let num = 1
                this.customers.getTopCustDetails(mdata.id).subscribe(data => {
                    data.topCustomers.map((data: any) => {
                        data.merchantName = "merchant" + num++
                        this.ids.push(data)
                    })
					console.log("###################################",this.ids)
                })
				
            }
			
        })
		
        this.jsonData.map((mData: any) => {
            if (this.selected === mData.month) {
                this.finalData = mData.data;
            }
        })
        this.finalData.map((jData: any) => {
            jData['step'] = 1
        });
    };

    onSelectMonth(e: any) {
        this.ids = []
        this.selected = e.target.value;
        this.getTopCustomers(this.selected)
        this.jsonData.map((mData: any) => {
            if (this.selected === mData.month) {
                this.finalData = mData.data;
            }
        });
        this.finalData.map((jData: any) => {
            jData['step'] = 1
        });
    };


}
