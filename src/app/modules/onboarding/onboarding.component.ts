import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
declare var jQuery: any;

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  midData: any = [
    {
      sNo: 1, mid: 863832, name: "Aravind", email: "aravind@gmail.com", address: "UAE", joiningDate: "10-21-2021",
      salesPerName: "Supriya", salesPerAdd: "supriya@gmail.com", cust_score: 10, isAllocated: true
    },
    {
      sNo: 2, mid: 'Pending', name: "Sadhana", email: "Sadhana@gmail.com", address: "India", joiningDate: "10-21-2021",
      salesPerName: "Rishabh", salesPerAdd: "rishabh@gmail.com", cust_score: 8, isAllocated: false
    },
    {
      sNo: 3, mid: 'Pending', name: "Sudhakar", email: "Sudhakar@gmail.com", address: "USA", joiningDate: "10-21-2021",
      salesPerName: "Sathya", salesPerAdd: "sathya@gmail.com", cust_score: 9, isAllocated: false
    }
  ];
  merchantList: any = []
  midPerData: any;
  isTrack: any;
  selItem: boolean = false
  isForm: boolean = false;
  searchText: any;
  getID: any;
  mid: any
  // isAllocated: boolean = false;
  // isDone:boolean=false;
  searchId: any;
  constructor(private app: AppManagerService, private createAcnt: CreateAcntService, private note_service:NotificationService) {
    this.app.ShowReportDate = 'true';

  }

  ngOnInit(): void {
    this.getMerchantsList()
    this.loadScripts();
  }
  getMerchantsList() {
    this.createAcnt.getMerchants().subscribe(data => {
      this.merchantList = data.data;
      console.log(this.merchantList)
    })
  }
  private loadScripts(): void {
    (function ($) {
      'use strict';

      $('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
      $('#side_menu_bar > ul > li.nav-item > a#li_onboarding').addClass(
        'active'
      );
    })(jQuery);
  }
  midProcess(sno: any) {
    this.isTrack = !this.isTrack;
  }
  AllocateMID() {
    // this.selItem = !this.selItem
    var mData: any;
    console.log(this.midPerData)
    this.midPerData.map((mdata: any) => {
      mData = mdata
    })
    const value = {
      bankMID: this.getID, status: {
        status: "Ongoing",
        stage: "merchant Allocation"
      },
    }
    let id = mData._id
    console.log(id, value, '13')
    this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
      console.log(data)
      if (data.success === true) {
        this.note_service.showSuccess(`${200}`, 'Merchant ID Allicated Successfully')
      } else {
        this.note_service.showError(`${data.status} : ${data.error.message}`, '')
      }
    })

    // if (data) {
    //   let merchant = data.data
    //   let obj: any = {};
    //   console.log(data, 'dadt')
    //   obj.merchantId = merchant.bankMID,
    //     obj.merchantName = merchant.firstName,
    //     obj.merchantAddress = merchant.addressDetails,
    //     // merchantCategoryCode= merchant.,
    //     obj.mobileNo = merchant.storeDetails[0].mobileNumber,
    //     obj.bankName = merchant.bankDetails[0].bankName,
    //     obj.branchName = merchant.bankDetails[0].branchName,
    //     obj.accountNumber = merchant.bankDetails[0].accountNumber,
    //     // maxAmountPerTransaction= merchant.,
    //     // maxTransactionPerDay= merchant.,
    //     // maxAmountPerDay= merchant.,
    //     obj.terminalInfo = []
    //     const value=obj
    //     this.youCloud.registerMerchant(value).subscribe((data)=>{
    //       if(data){
    //         console.log(data)
    //       }
    //     })
    //     console.log(obj,'obj')
    // }
  }

  userDetailsFunc(id: any) {
    this.isTrack = !this.isTrack;
    this.midPerData = [];
    this.merchantList.map((sData: any) => {
      // console.log(sData, 'sss')
      if (id === sData._id) {
        this.isTrack = id;
        this.midPerData.push(sData);
        console.log(this.midPerData, 'ss')
        // this.selectStoreCat = sData.data[0].cat;
      }
    });

    if (this.midPerData.length === 0) {
      alert(`${id} Does Not Exist`)
    };
    this.searchId = "";
    //console.log("###########################",this.storeCatData[0].data[0].cat);
  };
  backToList() {
    this.isTrack = !this.isTrack;
    this.getMerchantsList()
  }
  back() {
    this.isForm = !this.isForm;
  }
  showForm(id: any) {
    this.mid = id;

    // this.midPerData
    // this.createAcnt.getMerchantById(id).subscribe(data => {
    //   if (data) {
    //     // data.data.map((mdata:any)=>{
    //       this.midPerData = data.data
    //       console.log(this.midPerData, 'daaa')
    //     // })
    this.isForm = !this.isForm;
    //   }
    // })
  }
}

