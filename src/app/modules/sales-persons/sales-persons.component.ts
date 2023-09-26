import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {DistributorService} from 'src/app/services/distributor.service';
import {IdentityService} from 'src/app/core/services/identity.service'
declare var jQuery: any;
@Component({
  selector: 'app-sales-persons',
  templateUrl: './sales-persons.component.html',
  styleUrls: ['./sales-persons.component.scss']
})
export class SalesPersonsComponent implements OnInit {
    isShow:boolean=false;
    searchText:any;
    salesForm: FormGroup;
    disId:any;
    // salesPersons: any=[];
    distData: any;
    salesPersons:any=[
        {salesPersonId:"SID81621",emiratesId:"2973198",firstName:"Supriya",lastName:"M",title:"Mrs",gender:"Female",mobileNumber:"9843618221",
        basicSalary:"10000",houseAllowance:"2000",transportAllowance:"2000",bonus:"2000",bankName:"HDFC",accountNumber:"826198"},
        {salesPersonId:"SID81622",emiratesId:"1287387",firstName:"Sudhakar",lastName:"P",title:"Mr",gender:"Male",mobileNumber:"9211361618",
        basicSalary:"10000",houseAllowance:"2000",transportAllowance:"2000",bonus:"2000",bankName:"HDFC",accountNumber:"826198"},
        {salesPersonId:"SID81623",emiratesId:"9712686",firstName:"Sushmitha",lastName:"P",title:"Mrs",gender:"Female",mobileNumber:"7351822555",
        basicSalary:"10000",houseAllowance:"2000",transportAllowance:"2000",bonus:"2000",bankName:"HDFC",accountNumber:"826198"},
    ]
    constructor(private fb: FormBuilder,private dist :DistributorService, private identity:IdentityService) { }

    ngOnInit(): void {
        this.loadScripts();
        // this.getDistributors();

        this.salesForm = this.fb.group({
            emiratesId: new FormControl("", [Validators.required]),
            firstName: new FormControl("", [Validators.required]),
            lastName: new FormControl("", [Validators.required]),
            title: new FormControl("", [Validators.required]),
            gender: new FormControl("", [Validators.required]),
            mobileNumber: new FormControl("", [Validators.required]),
            basicSalary: new FormControl("", [Validators.required]),
            houseAllowance: new FormControl("", [Validators.required]),
            transportAllowance: new FormControl("", [Validators.required]),
            bonus: new FormControl("", [Validators.required]),
            bankName: new FormControl("", [Validators.required]),
            accountNumber: new FormControl("", [Validators.required])

            
        })
    };

    private loadScripts(): void {
        (function($) {
        "use strict";

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_sales_persons').addClass("active");
        })(jQuery);
    }

    addsalesPersons(){
        this.isShow=!this.isShow;  
    }
    // submit(){
    //     const obj =this.salesForm.value;
    //     this.dist.addSalesPerson(obj,this.distData._id).subscribe(data=>{
    //         if(data.success === true){
    //             alert("sales person added sucessfully!!")
    //             this.getDistributors();
    //             this.salesForm.reset();
    //         }
    //     });
    // }

    getDistributors() {
        //  this.disId = this.identity.getUser().distId;
        // this.dist.getSalesPersons(this.disId).subscribe(data => {
        //     this.distData = data.data;
        //     this.salesPersons = data.data.salesPersons;
        // })
        
    }

}


