import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChildActivationStart } from '@angular/router';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { ServiceCatalogueService } from 'src/app/services/service-catalogue.service';
import { BarServiceService } from 'src/services/bar-service.service';
declare var jQuery: any;

@Component({
  selector: 'app-service-catalogue',
  templateUrl: './service-catalogue.component.html',
  styleUrls: ['./service-catalogue.component.scss']
})
export class ServiceCatalogueComponent implements OnInit {

  serviceForm!: FormGroup;
  categoryForm: FormGroup;
  itemForm: FormGroup;
  public formData: any = {};
  public type = 'create';
  public dataMasterId: any;
  public csvOptions: any = {};
  report_title: string;
  smbData: any;
  services: any;
  rate: String;
  taxes: any = [];
  taxDetails: any;
  govtServices: any = [];
  serviceList: any = [];
  categories: any;
  enterpriseServ: any = [];

  constructor(
    private app: AppManagerService,
    private catalogueService: CatalogueService,
    private fb: FormBuilder,
    private bar_srv: BarServiceService,
    private srvc_Cat: ServiceCatalogueService,
    private note_service: NotificationService,
    private gatewayServ: GatewayService
  ) {
    this.app.ShowReportDate = 'true';
  }

  selectedCategory: any = 'Select Category'
  selectedCatalogue: any = "Select Catalogue"
  selectedLanguage: any = "English";
  isShow: boolean = false;
  csvData: any = [];

  public jsonData = [];



  public categoryList = ["All Items", "Electricals", "Chocolate & Snacks", "Dairy & Eggs", "Frozen Fries", "Healthy & Organic", "Cans & Jars"];

  ngOnInit(): void {
    console.log(this.selectedCatalogue, 'iqy i')
    this.getGovtServices();
    this.getEnterpriseServ();
    this.getCategory();
    this.getTaxes();
    this.serviceForm = new FormGroup({
      distributorId: new FormControl('', [Validators.required]),
      serviceType: new FormControl('', [Validators.required]),
      serviceId: new FormControl('', [Validators.required]),
      serviceName: new FormControl('', [Validators.required]),
      serviceNameArabic: new FormControl('', [Validators.required]),
      unitPrice: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      taxCode: new FormControl('1234'),
      // description: new FormControl('', [Validators.required]),
      // governamentEntity: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      bankServiceId: new FormControl('', [Validators.required]),
      englishDescription: new FormControl('', [Validators.required]),
      arabicDescription: new FormControl('', [Validators.required]),
      priceType: new FormControl('', [Validators.required]),
      taxApplicable: new FormControl(true, [Validators.required]),
      merchantId: new FormControl('', Validators.required)
    })
    this.categoryForm = new FormGroup({
      serviceCode: new FormControl('', Validators.required),
      serviceName: new FormControl('', Validators.required)
    })
    this.itemForm = new FormGroup({
      serviceCode: new FormControl('', Validators.required),
      serviceItems: this.fb.group({
        itemName: new FormControl('', Validators.required),
        itemDescription: new FormControl('', Validators.required)
      })
    })
    this.loadScripts();
  }

  //get services of enterprise and goverment catalogue
  getGovtServices() {
    this.serviceList = []
    this.gatewayServ.getServofMer().subscribe(res => {
      this.serviceList = res.data;
    })
  }
  getEnterpriseServ() {
    this.enterpriseServ = []
    this.srvc_Cat.getService().subscribe(res => {
      this.enterpriseServ = res.data;
    })
  }
  //add services for enterprise and government catalogue
  onService() {
    const sData = this.serviceForm.value;
    this.srvc_Cat.createServices(sData).subscribe(res => {
      if (res.success === true) {
        this.note_service.showSuccess(`${200}`, 'Service Added Successfully')
        console.log(res, 'serv')
        alert("Service Added Succesfully in MasterSheet");
        this.getGovtServices()
        this.serviceForm.reset();
      }
      else {
        this.note_service.showError(`${res.status} : ${res.error.message}`, '')
      }
      // this.selectCatalogue(this.selectedCatalogue)
    })
  }

  category(e: any) {
    this.itemForm.value.serviceCode = e.target.value
    console.log(this.itemForm.value.serviceCode)
  }
  //Add category to smb catalogue
  addCategory() {
    const value = this.categoryForm.value;
    this.srvc_Cat.addCategory(value).subscribe(data => {
      if (data.success === true) {
        this.note_service.showSuccess(`${200}`, 'Category Added Successfully')
        this.categoryForm.reset();
        this.getCategory()
      } else {
        this.note_service.showError(`${data.status} : ${data.error.message}`, '')
      }
    })
  }

  //get categories and services of smb catalogue
  getCategory() {
    this.categories = []
    this.srvc_Cat.getCategory().subscribe(res => {
      this.categories = res.data
      console.log(this.categories)
    })
  }

  //add items to particular catagory in smb catalogue
  addItem() {
    const value = this.itemForm.value
    this.srvc_Cat.addItem(value).subscribe(data => {
      if (data.success === true) {
        this.note_service.showSuccess(`${200}`, 'Item Added Successfully')
        this.itemForm.reset();
        this.getCategory()
      } else {
        this.note_service.showError(`${data.status} : ${data.error.message}`, '')
      }
    })
  }

  //get tax details
  getTaxes() {
    this.srvc_Cat.getTaxCodes().subscribe(res => {
      this.taxes = res.data;
      console.log(res.data)
    })
  }
  taxCodes(e: any) {
    const tCode = e.target.value;
    this.srvc_Cat.getTaxDetailsByTaxCode(tCode).subscribe(res => {
      console.log(res, 'tax')
      this.taxDetails = res.data;
      this.rate = this.taxDetails[0].rate;
    })
  }

  private loadScripts(): void {
    (function ($) {
      "use strict";

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_total_items').addClass("active");
    })(jQuery);
  }

  items: Array<any>
  // selecting catalogue type
  selectCatalogue(e: any) {
    this.services = []
    this.smbData = []
    this.selectedCatalogue = e.target.value;
    if (this.selectedCatalogue === 'Government Catalogue') {
      this.services = this.serviceList
    }
    if (this.selectedCatalogue === 'Enterprise Catalogue') {
      this.services = this.enterpriseServ
    }
    // this.serviceList.map((data: any) => {
    //   console.log(this.selectedCatalogue, data.serviceType, '271')
    //   if (data.serviceType === this.selectedCatalogue) {
    //     this.services.push(data);
    //   }
    // })
  }

  // get services by category
  setCategory(e: any) {
    this.services = []
    this.categories.map((data: any) => {
      if (data._id === e.target.value) {
        console.log(data.serviceItems)
        data.serviceItems.map((item: any) => {
          item.serviceCode = data.serviceCode
          item.category = data.serviceName
          this.services.push(item)
        })
      }
    })
  }


  downloadCSV() {
    this.csvData = [];
    let options
    console.log(this.selectedCatalogue, this.selectedCategory, 'cat')
    if (this.services.length > 0) {
      this.services.map((csv: any) => {
        console.log(csv, '87688')
        let Obj: any = {};
        if (this.selectedCatalogue === "SMB Catalogue") {
          Obj['categoryName'] = csv.category
          Obj['serviceCode'] = csv.serviceCode
          Obj['serviceName'] = csv.itemName
          Obj['description'] = csv.itemDescription
          this.csvData = [...this.csvData, Obj];
          options = {
            title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
            headers: ['CATEGORY NAME', 'SERVICE CODE', 'SERVICE NAME', 'DESCRIPTION']
          };
        }
        else {
          console.log(csv, '86879')
          Obj['distributorId'] = csv.distributorId
          Obj['merchantId'] = csv.merchantId
          Obj['serviceCode'] = csv.serviceId
          Obj['serviceName'] = csv.serviceName
          Obj['description'] = csv.englishDescription
          Obj['unitPrice'] = csv.unitPrice
          this.csvData = [...this.csvData, Obj];

          options = {
            title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
            headers: ['DISTRIBUTOR ID', 'MERCHANT ID', 'SERVICE CODE', 'SERVICE NAME', 'DESCRIPTION', 'UNIT PRICE']
          };
        }
      })
    }

    // const options = {
    //   title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
    //   headers: ['no', 'item', 'itemcode', 'description', 'price', 'category']
    // };
    this.csvOptions = options;
    this.report_title = 'Service Catalogue';

    new AngularCsv(this.csvData, this.report_title, this.csvOptions);
    // new AngularCsv(this.csvData, 'service-catalogue', options);
  }
}
