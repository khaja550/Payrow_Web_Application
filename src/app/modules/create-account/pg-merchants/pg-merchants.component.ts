import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { Router } from '@angular/router';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { CustomValidators } from '../custom-validators';
import { BankFormComponent } from '../reuseble-forms/bank-form/bank-form.component';
import { LicenceFormComponent } from '../reuseble-forms/licence-form/licence-form.component';
import { PersonalComponent } from '../reuseble-forms/personal/personal.component';
import { GatewayService } from 'src/app/services/gateway.service';
import { ServiceCatalogueService } from 'src/app/services/service-catalogue.service';
import { NotificationService } from 'src/app/core/services/notification.service';



declare var jQuery: any;

@Component({
  selector: 'app-pg-merchants',
  templateUrl: './pg-merchants.component.html',
  styleUrls: ['./pg-merchants.component.scss']
})
export class PgMerchantsComponent implements OnInit {
  @ViewChild(PersonalComponent) PersonalComponent: PersonalComponent;
  @ViewChild(BankFormComponent) BankFormComponent: BankFormComponent;
  @ViewChild(LicenceFormComponent) LicenceFormComponent: LicenceFormComponent;

  pgMerchantsForm!: FormGroup;
  gatewayUserForm!: FormGroup;
  subMerchantForm!: FormGroup
  basicForm!: FormGroup;
  idForm: any; //need to clarify
  totalData: any
  cats: any = [];
  merchntObj: any = {};
  basic_step = false;
  personal_step = false;
  busiType_step = false;
  card_step = false;
  license_step = false;
  business_step = false;
  terms_step = false;
  education_step = false;
  step = 1;
  mainMer: boolean = false;
  isUser: boolean = false;
  isChecked: boolean = false;
  selectedCat: any = []
  selectedSer: any = "Select Service"
  dropdownList: any = [];
  selectedItems: any = []
  merchantData: any = [];
  sData: any = []
  merchantType: any;
  requiredField: boolean = false;
  onCheckdData: any = [];
  gatewayUsers: any = []
  gatewayuserData: any = [];
  subMerchantList: any = []
  subMerData: any = []
  subMer: boolean = false
  bankList: any = ['Mid Request Form', 'OnBoarding Form', 'Wps Form'];
  businesstypes: any = [];
  merchantList: any = [];
  userType: any = '';
  isEdit: boolean = false;
  isCreate: boolean = false;
  mainMerchantId: any = '';
  tempData: any=[];
  @ViewChild("myNameElem") myNameElem: ElementRef;
  errorMessage: String;
  displayLocationDeletePopup: boolean = false;
  srvcData: any = [];
  dropdownSettings: {
    singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; clearSearchFilter: boolean, enableCheckAll: boolean, searchPlaceholderText: string,
    limitSelection: Number
  };
  selectCategory: any = [];
  public number: number = 1;

  constructor(private app: AppManagerService, private fb: FormBuilder,
    private createAcnt: CreateAcntService, private gatewayServ: GatewayService,
    private srvc_cats: ServiceCatalogueService, private note_Servce: NotificationService) {
    this.app.ShowReportDate = 'true';

  }

  ngOnInit(): void {
    this.loadScripts();
    this.getAllMerMasterList();
    this.getMerchantsList();
    this.getSubMerchants();
    this.gatewayUserForm = this.fb.group({
      username: new FormControl('', Validators.required),
      PasswordHash: new FormControl('', Validators.required),
      gatewayMerchantId: new FormControl('', Validators.required),
    })
    this.subMerchantForm = this.fb.group({
      merchantId: new FormControl('', Validators.required),
      mainMerchantId: new FormControl('', Validators.required),
      merchantName: new FormControl('', Validators.required),
      merchantNameArabic: new FormControl('', Validators.required),
      marchantAddress: new FormControl('', Validators.required),
      merchantCountry: new FormControl('', Validators.required),
      merchantEmail: new FormControl('', Validators.required),
      merchantContactNumber: new FormControl('', Validators.required),
    })
    this.basicForm = this.fb.group({
      merchantId: new FormControl('', [Validators.required]),
      merchantName: new FormControl('', [Validators.required]),
      merchantNameArabic: new FormControl('', [Validators.required]),
      marchantAddress: new FormControl('', Validators.required),
      merchantCountry: new FormControl('', Validators.required),
      merchantEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      merchantContactNumber: new FormControl('', Validators.required),
      // globalUserRole: ('store owner'),
      // salesPersonId: new FormControl('', Validators.required),
      groupId: new FormControl('', Validators.required),
      // distributorId: new FormControl('', Validators.required),
      // dateOfBirth: new FormControl('', [Validators.required]),
      payrowFees: new FormControl('', Validators.required),
      bankFees: new FormControl('', Validators.required),
      // governamentEntity: new FormControl('', Validators.required),
      merchantPostBackUrl: new FormControl('', Validators.required),
      status: {
        status: new FormControl(""),
        stage: new FormControl("")
      },
    })
    this.pgMerchantsForm = this.fb.group({
      personalDetails: new FormControl(""),
      bankDetails: new FormControl(""),
      licenseDetails: new FormControl(""),
      businessDetails: new FormControl(""),
    }),
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        textField: 'x',
        clearSearchFilter: true,
        enableCheckAll: false,
        searchPlaceholderText: "Search Here",
        limitSelection: 25

      };
  }
  private loadScripts(): void {
    (function ($) {
      "use strict";
      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_create_account').addClass("active");
    })(jQuery);
  }

  getAllMerMasterList() {
    this.gatewayServ.getGatewayUser().subscribe(res => {
      this.gatewayUsers = res.data
    })
  }
  merMastersList(mid: any) {
    this.gatewayuserData = [];
    this.mainMerchantId = mid;
    this.userType = '';
    this.mainMer = true;
    this.userType = 'Gatewayuser';
    console.log('main',this.mainMerchantId)
    this.gatewayServ.getGatewayUserbyID(this.mainMerchantId).subscribe(res => {
      this.gatewayuserData=res.data;
    })
  }
  createGatewayMer() {
    const value = this.gatewayUserForm.value
    this.gatewayServ.creategatewayUser(value).subscribe(res => {
      if (res.success = 200) {
        this.merMastersList(this.mainMerchantId);
        this.note_Servce.showSuccess(`200 - ${res.message}`, '');
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
      console.log('master', res);
    })
  }
  getPGUserByID(id: any) {
    this.tempData = []
    this.isEdit = false;
    this.isCreate = false;
    this.gatewayServ.getGatewayUserbyID(id).subscribe(res => {
      console.log('res', res);
      this.tempData=res.data
      this.gatewayUserForm.patchValue(res.data[0]);
      this.gatewayUserForm.disable();
    })
  }
  delUser() {
    if (this.userType === "Gatewayuser") {
      this.gatewayServ.delGatewayUserbyID(this.tempData[0]._id).subscribe(res => {
        if (res.success = 200) {
          this.merMastersList(this.mainMerchantId);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        } 
      })
    }
    if (this.userType === "Submerchant") {
      this.gatewayServ.delSubMerchant(this.tempData[0]._id).subscribe(res => {
        if (res.success = 200) {
          this.subMerchant(this.mainMerchantId);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        } 
      })
    }
  }
  updateUser() {
    if (this.userType === "Gatewayuser") {
      const value = this.gatewayUserForm.value;
      console.log(value);
      this.gatewayServ.updateGatewayUserByID(value, this.tempData[0]._id).subscribe(res => {
        if (res.success = 200) {
          this.merMastersList(this.mainMerchantId);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        } 
      })
    }
    if (this.userType === "Submerchant") {
      const value = this.subMerchantForm.value;
      console.log(value)
      this.gatewayServ.updateSubMerchantByID(value, this.tempData[0]._id).subscribe(res => {
        if (res.success = 200) {
          this.subMerchant(this.mainMerchantId);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        } 
      })
    }
  }
  edit() {
    this.isEdit = true;
    this.gatewayUserForm.enable();
    this.subMerchantForm.enable();
  }
  resetForm() {
    this.isEdit = false;
    this.isCreate = true;
    this.gatewayUserForm.enable();
    this.gatewayUserForm.reset();
    this.gatewayUserForm.patchValue({ gatewayMerchantId: this.mainMerchantId });
    this.subMerchantForm.enable();
    this.subMerchantForm.reset();
    this.subMerchantForm.patchValue({ mainMerchantId: this.mainMerchantId });
  }
  addUser() {
    this.isUser = !this.isUser
  }
  onSelectCat(event: any) {
    this.selectCategory = [];
    this.onCheckdData = [];
    this.selectedSer = event.target.value;
    this.getBusiTypes(this.selectedSer)
    // this.commercial = true
  }

  getSubMerchants() {
    this.subMerchantList = []
    this.gatewayServ.getSubMerchant().subscribe(res => {
      this.subMerchantList = res.data;
    })
  }
  getSubMerchantsByID(id: any) {
    this.tempData = [];
    this.isEdit = false;
    this.isCreate = false;
    this.gatewayServ.getSubMerchantbyID(id).subscribe(res => {
      this.tempData = res.data
      this.subMerchantForm.patchValue(res.data[0]);
      this.subMerchantForm.disable();
    })
  }
  createsubMerchant() {
    const value = this.subMerchantForm.value;
    this.gatewayServ.createSubMerchant(value).subscribe(res => {
      console.log(res.data);
      if (res.success = 200) {
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.subMerchant(this.mainMerchantId);
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      } 
    })
  }
  subMerchant(mid: any) {
    this.subMerData = [];
    this.mainMerchantId = mid;
    this.userType = ''
    this.subMer = true;
    this.userType = 'Submerchant';
    this.gatewayServ.getSubMerchantbyID(this.mainMerchantId).subscribe(res => {
      this.subMerData=res.data
    })
  }
  back() {
    this.subMer = false;
    this.mainMer = false;
    this.mainMerchantId = ''
  }
  getMerchantsList() {
    this.merchantList = []
    this.gatewayServ.getpgUsersDetails().subscribe(data => {
      this.merchantList = data.data;
    })
  }
  getBusiTypes(serch: any) {
    this.businesstypes = [];
    // this.srvcData =[];
    if (serch === 'SMB') {
      this.srvc_cats.getCategory().subscribe(data => {
        this.businesstypes = data.data.map((itemData: any) => {
          return { x: itemData.serviceName, y: itemData.serviceCode, z: itemData.serviceItems, id: this.number++ }
        });
      })
    } else if (serch === 'Enterprise' || serch === 'Govt') {
      this.srvc_cats.getService().subscribe((data) => {
        this.srvcData = data.data;
        this.srvcData.map((s: any) => {
          s.Selected = false;
        })
      })
    }
  }


  createOwner() {

  }

  // back() {
  //   this.isUser = !this.isUser
  // }




  subTabs(id: any) {
    this.step = 1;
  }
  next() {
    if (this.step == 1) {
      this.basicForm.patchValue({ status: { status: 'Ongoing', stage: 'create account' } })
      const value = this.basicForm.value;
      this.gatewayServ.createpgUser(value).subscribe((data) => {
        if (data) {
          this.sData = data.data
          this.basic_step = true;
          this.step++
        }
      })
    } else if (this.step == 2) {
      let id = this.sData._id;
      let data = this.pgMerchantsForm.value.personalDetails;
      let documentsData: any = [
        {
          documentType: "emiratesDocument",
          documentTitle: "Emirates Document",
          documentExpiry: data.eIExpiry,
          documentNumber: data.eINumber
        },
        {
          documentType: "passportDocument",
          documentTitle: "Passport Document",
          documentExpiry: data.passportExpiry,
          documentNumber: data.passportNum
        }
      ]
      const fdata = new FormData();
      fdata.append("city", data.city)
      fdata.append("addressDetails", data.addressDetails)
      fdata.append("country", data.country)
      fdata.append("emiratesId", data.eINumber)
      fdata.append("documentsData", JSON.stringify(documentsData))
      fdata.append("status[status]", "Ongoing")
      fdata.append("status[stage]", "personal details")
      fdata.append("emiratesDocument", data.emiratesFileName)
      fdata.append("passportDocument", data.passportFileName)
      const value = fdata;
      this.gatewayServ.updatepgUser(value, id).subscribe((data) => {
        if (data) {
          this.personal_step = true;
          this.step++
        }
      })
    } else if (this.step == 3) {
      let id = this.sData._id;
      let BankDetailsList = { bankDetails: [this.pgMerchantsForm.value.bankDetails], status: { status: 'Ongoing', stage: 'bank details' } }
      const value = BankDetailsList;
      this.gatewayServ.updatepgUser(value, id).subscribe((data) => {
        if (data) {
          this.card_step = true;
          this.step++
        }
      })
    } else if (this.step == 4) {
      let id = this.sData._id;
      let data = this.pgMerchantsForm.value.licenseDetails
      const fdata = new FormData();
      let documentsData: any = [
        {
          documentType: "licenseDocument",
          documentTitle: "License Document",
          documentExpiry: data.licenceExpiry,
          documentNumber: data.licenceNum
        },
        {
          documentType: "ecCopy",
          documentTitle: "EC Document",
          documentNumber: data.eCNumber
        }
      ]
      fdata.append("companyName", data.companyName)
      fdata.append("documentsData", JSON.stringify(documentsData))
      fdata.append("licenseDocument", data.licenseDocument)
      fdata.append("ecCopy", data.ecCopy)
      fdata.append("status[status]", " Active")
      fdata.append("status[stage]", " license details")
      const value = fdata;
      this.gatewayServ.updatepgUser(value, id).subscribe((data) => {
        if (data) {
          this.license_step = true;
          this.step++;
        }
      })
    }
    else if (this.step == 5) {
      let id = this.sData._id;
      const value = { businessDetails: this.pgMerchantsForm.value.businessDetails, status: { status: 'Ongoing', stage: 'business details' } }
      this.gatewayServ.updatepgUser(value, id).subscribe((data) => {
        if (data) {
          this.business_step = true;
          this.step++;
        }
      })

    } else if (this.step == 6) {
      let value: any;

      let id = this.sData._id
      if (this.selectedSer === "SMB") {
        this.onCheckdData.map((o: any) => {
          this.cats.map((c: any) => {
            if (o.serviceName === c.categoryName) {
              let Obj: any = {}
              Obj.serviceId = o.serviceId;
              Obj.serviceName = o.itemName
              c.categoryItems = [...c.categoryItems, Obj];
            }
          })
        })

        value = { merchantType: this.selectedSer, merchantItems: this.cats, status: { status: 'Ongoing', stage: 'item details' } }
      } else if (this.selectedSer === "Govt") {
        this.onCheckdData.map((o: any) => {
          this.cats.map((c: any) => {
            let Obj: any = {}
            Obj.serviceId = o.serviceId;
            Obj.serviceName = o.serviceName
            c.categoryItems.push(Obj);

          })

        })
        value = { merchantType: this.selectedSer, merchantItems: this.cats, status: { status: 'Ongoing', stage: 'item details' } }

      }

      this.gatewayServ.updatepgUser(value, id).subscribe((data) => {
        if (data) {
          this.busiType_step = true;
          this.totalData = data.data;
          this.step++;
        }
      })
    } else if (this.step == 7) {
      let id = this.sData._id
      this.idForm = this.sData._id
      this.terms_step = true;
      this.step++;
      this.sData = [];
    }
  }
  previous() {
    this.step--
    if (this.step == 1) {
      this.basic_step = false;
    } else if (this.step == 2) {
      this.personal_step = false;
    } else if (this.step == 3) {
      this.card_step = false;
    } else if (this.step == 4) {
      this.license_step = false;

    } else if (this.step == 5) {
      this.business_step = false;
    } else if (this.step == 6) {
      this.busiType_step = false;
    }
    else if (this.step == 7) {
      this.terms_step = false;
    }
  }

  onChecked(e: any, id: String) {
    if (e.target.checked) {
      this.selectedCat.push(id);
    }
    else {
      this.selectedCat = this.selectedCat.filter((m: any) => m != id)
    }
  }
  get f() {
    return (this.pgMerchantsForm.controls);
  }
  onOwnerSubmit() {
    this.pgMerchantsForm.reset();
    this.sData = [];
    this.step = 1
  }

  // BacktoList() {
  //   this.isOwner = !this.isOwner;
  // }

  //multiselect Functionalities

  onItemSelect(item: any) {
    // this.srvcData=[];
    // this.srvcData.filter((e:any)=>{
    // 	return e.Selected === true;
    // })
    this.srvc_cats.getCategory().subscribe(data => {
      data.data.map((iData: any) => {
        this.selectCategory.map((mData: any) => {
          if (iData.serviceName === mData.x && iData.serviceItems.length > 0) {
            for (let i in iData.serviceItems) {
              iData.serviceItems[i].serviceId = iData.serviceCode;
              iData.serviceItems[i].serviceName = iData.serviceName;
              this.srvcData.push(iData.serviceItems[i]);
            }
          }
        })
      })

      this.srvcData = this.srvcData.reduce((a: any, b: any) => {
        if (a.filter((i: any) => i.itemName == b.itemName).length == 0)
          a.push(b)

        return a
      }, [])
      this.srvcData.map((s: any) => {
        if (!s.Selected)
          s.Selected = false;
      })
    })
    this.setClass()
  }
  onItemDeSelect(unselected: any) {
    this.setClass();
    let nwArry: any = []
    this.selectCategory.map((sel: any) => {
      //nwArry = this.srvcData.filter((item:any) => {return item.serviceName !== sel.x})
      this.srvcData.map((m: any) => {
        if (m.serviceName === sel.x)
          nwArry.push(m);
      })
    })
    this.srvcData = nwArry;
    if (this.selectCategory.length === 0)
      this.srvcData = [];
  }
  setStatus() {
    (this.selectCategory.length > 0) ? this.requiredField = true : this.requiredField = false;
  }
  setClass() {
    this.setStatus();
    if (this.selectCategory.length > 0) { return 'validField' }
    else { return 'invalidField' }
  }

  oncheckSrvc(e: any) {
    this.merchntObj["merchantType"] = this.selectedSer;
    if (this.selectedSer === "SMB") {
      if (e.Selected === false) {
        e.Selected = true;
        const Obj: any = {}
        Obj['catId'] = e.serviceId;
        Obj['categoryName'] = e.serviceName;
        Obj['categoryItems'] = [];
        this.cats.push(Obj);

        this.onCheckdData = [...this.onCheckdData, e];
        this.cats = [...this.cats.reduce((map: any, obj: any) => map.set(obj.catId, obj), new Map()).values()];
      } else {
        this.onCheckdData = this.onCheckdData.filter((i: any) => i.itemName !== e.itemName);
      }

    } else {
      if (this.cats.length === 0) {
        const Obj: any = {}
        Obj.categoryItems = [];
        this.cats.push(Obj);
      }
      this.onCheckdData = [...this.onCheckdData, e];
    }
  }
}
