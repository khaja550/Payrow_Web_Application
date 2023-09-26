import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { NotificationService } from 'src/app/core/services/notification.service';
declare var jQuery: any;
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { ServiceCatalogueService } from 'src/app/services/service-catalogue.service';
import { BarServiceService } from 'src/services/bar-service.service';

@Component({
  selector: 'app-pg-list',
  templateUrl: './pg-list.component.html',
  styleUrls: ['./pg-list.component.scss']
})
export class PgListComponent implements OnInit {
  mServiceForm!: FormGroup;
  feeForm!: FormGroup;
  isAddServ: boolean = false;
  isStaff: boolean = false;
  merchantList: any = [];
  catalogue: any;
  mainMerchantId: any = '';
  categories: any;
  totServices: any;
  serviceList: any;
  merServices: any;
  govtServices: any;
  enterpriseServices: any;
  isFee: boolean = false;
  isEdit: boolean = false;
  isCreate: boolean = false;
  taxes: any = [];
  allFees: any = [];
  servFees: any = [];
  userType: any = '';
  tempData: any = [];
  serviceID: any = '';
  constructor(private createAcnt: CreateAcntService,
    private bar_srv: BarServiceService,
    private srvc_Cat: ServiceCatalogueService, private note_Servce: NotificationService,
    private gatewayServ: GatewayService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.getMerchantServices()
    this.getMerchantsList();
    this.getCategory();
    this.getTaxes();
    this.loadScripts();
    // this.getServices();
    this.getAllFees();
    this.mServiceForm = this.fb.group({
      merchantId: new FormControl('', [Validators.required]),
      serviceId: new FormControl('', [Validators.required]),
      serviceName: new FormControl(''),
      serviceNameArabic: new FormControl(''),
      unitPrice: new FormControl(''),
      currency: new FormControl(''),
      taxCode: new FormControl(''),
      mainMerchantId: new FormControl(''),
      bankServiceId: new FormControl(''),
      englishDescription: new FormControl(''),
      arabicDescription: new FormControl(''),
      priceType: new FormControl(''),
      taxApplicable: new FormControl('')
    })
    this.feeForm = this.fb.group({
      feeId: new FormControl('', Validators.required),
      serviceId: new FormControl('', Validators.required),
      merchantId: new FormControl('', Validators.required),
      chargeType: new FormControl('', Validators.required),
      chargeValue: new FormControl('', Validators.required),
      chargeName: new FormControl('', Validators.required),
      chargeArabicName: new FormControl('', Validators.required),
      taxCode: new FormControl('', Validators.required),
      bankServiceId: new FormControl('', Validators.required),
      englishDescription: new FormControl('', Validators.required),
      arabicDescription: new FormControl('', Validators.required),
      taxApplicable: new FormControl('', Validators.required)
    })
  }
  merService() {
    this.isAddServ = !this.isAddServ;
    this.mServiceForm.reset();
    this.isEdit = false;
    this.isCreate = true;
    this.mServiceForm.enable();
    this.mServiceForm.patchValue({ mainMerchantId: this.mainMerchantId });
  }
  staff() {
    this.mainMerchantId = '';
    // this.getServices()
    this.isStaff = !this.isStaff;
  }
  addFee(id: any) {
    this.isFee = !this.isFee
    this.feeForm.reset()
    this.isEdit = false;
    this.isCreate = true;
    this.feeForm.enable();
    this.feeForm.patchValue({ merchantId: this.mainMerchantId, serviceId: id });
  }
  back() {
    this.isFee = !this.isFee;
  }
  getMerchantsList() {
    this.gatewayServ.getpgUsersDetails().subscribe(data => {
      this.merchantList = data.data;
    })
  }
  getTaxes() {
    this.srvc_Cat.getTaxCodes().subscribe(res => {
      this.taxes = res.data;
      console.log(res.data)
    })
  }

  getCategory() {
    //get smb catagories with services
    this.categories = []
    this.srvc_Cat.getCategory().subscribe(res => {
      this.categories = res.data
    })
  }

  getMerchantServices(mid: any, cat: any) {
    this.catalogue = cat;
    this.merServices = [];
    this.mainMerchantId = mid
    this.isStaff = true;
    this.userType = 'Services'
    //new
    this.gatewayServ.getServofMerbyId(mid).subscribe(res => {
      res.data.map((data: any) => {
        data.fee = false
        if (this.allFees.length !== 0) {
          this.allFees.map((fee: any) => {
            console.log(fee)
            if (data.serviceId === fee.serviceId) {
              console.log(data.serviceId, fee.serviceId)
              data.fee = true;
            }
          })
          this.merServices.push(data);
          console.log(this.merServices);
        }
        else {
          data.fee = false
          this.merServices.push(data);
        }
      })
    })
  }
  delete() {
    if (this.userType === "Services") {
      this.gatewayServ.removeServFrmMer(this.tempData[0]._id).subscribe(res => {
        if (res.success = 200) {
          this.getMerchantServices(this.mainMerchantId, this.catalogue);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    }
    if (this.userType === "fee") {
      this.gatewayServ.removeFee(this.tempData[0]._id).subscribe(res => {
        if (res.success = 200) {
          this.getAllFees();
          this.getMerchantServices(this.mainMerchantId, this.catalogue)
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
          this.isFee = !this.isFee
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    }
  }
  update() {
    if (this.userType === "Services") {
      const value = this.mServiceForm.value;
      console.log(value);
      this.gatewayServ.updateServFrmMer(value, this.tempData[0]._id).subscribe(res => {
        if (res.success = 200) {
          this.getAllFees();
          this.getMerchantServices(this.mainMerchantId, this.catalogue);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
          this.isAddServ = !this.isAddServ
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    }
    if (this.userType === "fee") {
      const value = this.feeForm.value;
      console.log(value)
      this.gatewayServ.updateFee(value, this.tempData[0]._id).subscribe(res => {
        if (res.success = 200) {
          this.getAllFees();
          this.getMerchantServices(this.mainMerchantId, this.catalogue)
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
          this.isFee = !this.isFee
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    }
  }
  edit() {
    this.isEdit = true;
    this.mServiceForm.enable();
    this.feeForm.enable();
  }
  addService() {
    // this.mServiceForm.value.mainMerchantId = this.mainMerchantId;
    const value = this.mServiceForm.value;
    // console.log(this.mainMerchantId)
    this.gatewayServ.addServToMer(value).subscribe(res => {
      if (res.success = 200) {
        this.isAddServ = !this.isAddServ;
        this.getMerchantServices(this.mainMerchantId, this.catalogue);
        this.mServiceForm.reset();
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
    })
  }

  addFeeDetails() {
    const value = this.feeForm.value;
    this.gatewayServ.createFee(value).subscribe(res => {
      if (res.success = 200) {
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.feeForm.reset()
        this.isFee = !this.isFee
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
      console.log("res", res);

    })
  }
  getAllFees() {
    this.gatewayServ.getFee().subscribe(res => {
      if (res.data == null) this.allFees = [];
      else this.allFees = res.data;
    })
  }
  getFeeDetails(id: any) {
    this.userType = 'fee'
    this.isEdit = false;
    this.isCreate = false;
    this.gatewayServ.getFeebyId(id).subscribe(res => {
      this.feeForm.patchValue(res.data[0]);
      this.isFee = !this.isFee;
      this.feeForm.disable();
      this.tempData = res.data
    })
  }
  getServDetails(id: any) {
    this.isEdit = false;
    this.isCreate = false;
    this.gatewayServ.getServofMerbyId(id).subscribe(res => {
      this.isAddServ = !this.isAddServ;
      this.mServiceForm.patchValue(res.data[0]);
      this.mServiceForm.disable();
      this.tempData = res.data
    })
  }
  removeServiceFormMer(id: any) {
    this.gatewayServ.removeServFrmMer(id).subscribe(res => {
      console.log(res);
      this.getMerchantServices(this.mainMerchantId, this.catalogue)
    })
  }


  onChangeStatus(e: any, data: any) {
    const Obj = {
      "status": e.target.value
    }
    this.createAcnt.deActivateMerchant(data.bankMID, Obj).subscribe(data => {
      if (data.succces === true) {
        alert("Status Updated Sucessfully");
      }
      else {
        alert("something went wrong");
      }
    })
  }
  private loadScripts(): void {
    (function ($) {
      "use strict";

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_acnt_status').addClass("active");


    })(jQuery);
  }
}