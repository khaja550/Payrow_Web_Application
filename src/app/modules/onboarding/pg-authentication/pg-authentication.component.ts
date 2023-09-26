import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceCatalogueService } from 'src/app/services/service-catalogue.service';
import { GatewayService } from 'src/app/services/gateway.service';

declare var jQuery: any;

@Component({
  selector: 'app-pg-authentication',
  templateUrl: './pg-authentication.component.html',
  styleUrls: ['./pg-authentication.component.scss']
})
export class PgAuthenticationComponent implements OnInit {
  pgConfigForm: FormGroup

  merchantList: any = []
  midPerData: any;
  isTrack: any;
  selItem: boolean = false
  isForm: boolean = false;
  searchText: any;
  getID: any;
  mid: any
  taxes: any
  gatewayConfigList: any
  gatewayConfig: any
  isUpdate: boolean = false
  isCreate: boolean = false
  // isAllocated: boolean = false;
  // isDone:boolean=false;
  searchId: any;
  constructor(private app: AppManagerService, private createAcnt: CreateAcntService,
    private srvc_Cat: ServiceCatalogueService,
    private note_service: NotificationService, private fb: FormBuilder,
    private gateway_serv: GatewayService) {
    this.app.ShowReportDate = 'true';

  }

  ngOnInit(): void {
    this.getMerchantConfig()
    // this.getMerchantsList()
    this.loadScripts();
    this.getTaxes()
    this.pgConfigForm = this.fb.group({
      mainMerchantId: new FormControl('', Validators.required),
      bankUsername: new FormControl('', Validators.required),
      bankPassword: new FormControl('', Validators.required),
      payrowMerchantId: new FormControl('', Validators.required),
      payrowChargesValue: new FormControl('', Validators.required),
      bankChargesValue: new FormControl('', Validators.required),
      payrowServiceId: new FormControl('', Validators.required),
      payrowServiceTaxCode: new FormControl('', Validators.required),
      bankMerchantId: new FormControl('', Validators.required),
      bankServiceId: new FormControl('', Validators.required),
      bankChargesType: new FormControl('', Validators.required),
      payrowTRN: new FormControl('', Validators.required),
      bankTRN: new FormControl('', Validators.required),
      bankServiceTaxCode: new FormControl('', Validators.required),
      payrowChargesType: new FormControl('', Validators.required),
      otherChargesType: new FormControl('', Validators.required),
      otherChargesBankServiceId: new FormControl('', Validators.required),
      otherChargesBankMerchantId: new FormControl('', Validators.required),
      otherChargesValue: new FormControl('', Validators.required),
      otherChargesTaxCode: new FormControl('', Validators.required),
      otherChargesTRN: new FormControl('', Validators.required),
      fullUrl: new FormControl('', Validators.required)
    })
  }
  getMerchantsList() {
    this.gateway_serv.getpgUsersDetails().subscribe(data => {
      this.merchantList = data.data;
      this.gatewayConfigList.map((data: any) => {
        this.merchantList.map((mData: any) => {
          if (data.payrowMerchantId === mData.payRowId) {
            mData.config = true
          }
          else {
            mData.config = false
          }
        })
      })
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
  addMerchantConfig() {
    const value = this.pgConfigForm.value
    console.log(value)
    this.gateway_serv.createMerchantConfig(value).subscribe(res => {
      console.log(res.data, 'dasada')
    })
  }
  getMerchantConfig() {
    this.gatewayConfigList = []
    this.gateway_serv.getConfigDetails().subscribe(res => {
      this.gatewayConfigList = res.data
      this.getMerchantsList()
      console.log(res.data)
    })
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
    this.selItem = false
    this.getMerchantsList()
  }
  getTaxes() {
    this.srvc_Cat.getTaxCodes().subscribe(res => {
      this.taxes = res.data;
      console.log(res.data)
    })
  }
  back() {
    this.isForm = !this.isForm;
    this.isUpdate = false
    this.isCreate = false
    this.pgConfigForm.reset()
    this.getMerchantConfig()
  }
  // create() {
  //   this.isForm = !this.isForm
  //   this.isCreate = !this.isCreate
  // }
  configForm(id: any, config: any) {
    if (config === true) {
      this.gatewayConfig = []
      this.gatewayConfigList.map((data: any) => {
        if (data.payrowMerchantId === id) {
          this.gatewayConfig.push(data)
        }
      })
      this.pgConfigForm.patchValue(this.gatewayConfig[0])
      this.pgConfigForm.disable()
      this.isForm = !this.isForm;
    }
    else {
      this.isForm = !this.isForm
      this.isCreate = !this.isCreate
      this.pgConfigForm.patchValue({ payrowMerchantId: id })
    }
  }
  edit() {
    this.pgConfigForm.enable()
    this.isUpdate = !this.isUpdate
  }
  update() {
    const value = this.pgConfigForm.value
    console.log(value)
    this.gateway_serv.updateDetailsbyId(value, this.gatewayConfig[0]._id).subscribe(data => {
      if (data.success === true) {
        this.note_service.showSuccess(`${200}`, 'Merchant config details updated Successfully')
        this.isUpdate = !this.isUpdate
        this.pgConfigForm.disable
      } else {
        this.note_service.showError(`${data.status} : ${data.error.message}`, '')
      }
    })
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

