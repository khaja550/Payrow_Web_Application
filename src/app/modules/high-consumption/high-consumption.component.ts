import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import {
	FormControl,
	FormGroup,
	Validators,
	FormBuilder,
	ValidationErrors,
  } from '@angular/forms';
import { BarServiceService } from 'src/services/bar-service.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
declare var jQuery: any;

@Component({
  selector: 'app-high-consumption',
  templateUrl: './high-consumption.component.html',
  styleUrls: ['./high-consumption.component.scss']
})
export class HighConsumptionComponent implements OnInit {
	constructor(private app: AppManagerService,private bar_Service:BarServiceService) {
		this.app.ShowReportDate = 'true';
	}
	searchText: any;
	selected:any;
	csvData:any=[];
	merchant_identify:string;
	finalData:any=[];
	public csvOptions: any = {};
	report_title: string;
	public jsonData: any = [];
	
	ngOnInit(): void {
		this.selected = new Date().toLocaleDateString(undefined, { month: 'short' });
		this.loadScripts();
		//this.stepperfunction();
		
		this.getTopCustomers();
	}
	
	private loadScripts(): void {
		(function ($) {
		'use strict';
	
		$('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
		$('#side_menu_bar > ul > li.nav-item > a#li_high_consumption').addClass(
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
			this.report_title = 'tap to pay';
	
			new AngularCsv(this.csvData, this.report_title, this.csvOptions);
	}
	
	next() {
		this.finalData.map((obj:any)=>{
			if(this.merchant_identify === obj.merchant_name){
				obj.step++
			}
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
		this.finalData.map((obj:any)=>{
			if(this.merchant_identify === obj.merchant_name){
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
	
	onMerchent(data:any){
		this.merchant_identify =data;
		this.jsonData.map((obj:any)=>{
			if(obj['merchant_name'] === data){
				this.step =obj.step;
			}
		})
	};
	onSubmit() {
		console.log('Submit', this.accountForm.value);
	};
	
	async getTopCustomers(){
		await this.bar_Service.getTopCustomers().then(data=>{
			this.jsonData =data;
	
		});
		this.jsonData.map((mData:any)=>{
			if(this.selected === mData.month){
				this.finalData =mData.data;
			}
		})
		this.finalData.map((jData:any)=>{
			jData['step']=1
		});
	};
	
	onSelectMonth(e:any){
		this.selected = e.target.value;
		this.jsonData.map((mData:any)=>{
			if(this.selected === mData.month){
				this.finalData =mData.data;
			}
		});
		this.finalData.map((jData:any)=>{
			jData['step']=1
		});
	};
	
	}
