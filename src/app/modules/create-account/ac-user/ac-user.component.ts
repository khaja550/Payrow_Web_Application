import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { ServiceCatalogueService } from 'src/app/services/service-catalogue.service';
import { CustomValidators } from '../custom-validators';
import { AddressFormComponent } from '../reuseble-forms/address-form/address-form.component';
import { BankFormComponent } from '../reuseble-forms/bank-form/bank-form.component';
import { CardFormComponent } from '../reuseble-forms/card-form/card-form.component';
import { LicenceFormComponent } from '../reuseble-forms/licence-form/licence-form.component';
import { PersonalComponent } from '../reuseble-forms/personal/personal.component';
import { StaffFormComponent } from '../reuseble-forms/staff-form/staff-form.component';
import { BarServiceService } from 'src/services/bar-service.service';

export interface merchantdata {
}
@Component({
	selector: 'app-ac-user',
	templateUrl: './ac-user.component.html',
	styleUrls: ['./ac-user.component.scss']
})
export class AcUserComponent implements OnInit {
	@ViewChild(PersonalComponent) PersonalComponent: PersonalComponent;
	@ViewChild(CardFormComponent) CardFormComponent: CardFormComponent;
	@ViewChild(BankFormComponent) BankFormComponent: BankFormComponent;
	@ViewChild(AddressFormComponent) AddressFormComponent: AddressFormComponent;
	@ViewChild(LicenceFormComponent) LicenceFormComponent: LicenceFormComponent;
	@ViewChild(StaffFormComponent) StaffFormComponent: StaffFormComponent;

	storeOwnerForm!: FormGroup;
	basicsForm!: FormGroup;
	branchManagerForm!: FormGroup;
	deliveryPOSForm!: FormGroup;
	staffPOSForm!: FormGroup;
	emId: any;
	idForm: any;
	totalData: any
	basic_step = false;
	selectedUser: any;
	userExist: boolean = false;
	selectedCatName: any = '';
	selectedCats: any = [];
	cats: any = [];
	catItems: any = [];
	title: string;
	merchntObj: any = {};
	personal_step = false;
	address_step = false;
	busiType_step = false;
	card_step = false;
	license_step = false;
	business_step = false;
	staff_step = false;
	terms_step = false;
	education_step = false;
	step = 1;
	hr_Tag: boolean = false;
	isNbq: boolean = false;
	isNI: boolean = false;
	isAbudhabi: boolean = false;
	isMashreq: boolean = false;
	isOwner: boolean = false;
	isForm: boolean = false;
	isUser: boolean = false;
	isDevice: boolean = false;
	isChecked: boolean = false;
	selected: any = "Select Bank";
	selectedCat: any = []
	selectedSer: any = "Select Service"
	dropdownList: any = [];
	selectedItems: any = []
	commercial: boolean = false
	staffList: any = []
	merchantData: any = [];
	sData: any = []
	storeList: any = []
	isStaff: boolean = false;
	personalChild: any = [];
	staffListA: any = []
	merchantId: any = []
	merchantType: any;
	requiredField: boolean = false;
	onCheckdData: any = [];

	bankList: any = ['Mid Request Form', 'OnBoarding Form', 'Wps Form'];
	businesstypes: any = []
	// [{ id: '61af6a88f568ecbd18117d4f', name: 'Home Supply WareHouse Stores' },
	// { id: '622904d5d18faf96e8fc0d70', name: 'Office & Commercial Furniture' },
	// { id: '', name: 'Travel Agencies, & Tour Operators' },
	// { id: '', name: 'Motor Vehicle Supplies & New Parts' },
	// { id: '', name: 'Jewelry Store' },
	// { id: '', name: 'Hardware Store' },
	// { id: '', name: 'Commercial Footwear' },
	// { id: '', name: 'Stationary Office Supplies & Printing' }]
	merchantList: any = []
	@ViewChild("myNameElem") myNameElem: ElementRef;
	isPersonal: boolean = false;
	isBusiness: boolean = false;
	selectedacnt: string = "Select Account";
	errorMessage: String;
	captureData: any;
	exGrpId: any;
	prsnlAD: any;
	srvcData: any = [];
	dropdownSettings: {
		singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; clearSearchFilter: boolean, enableCheckAll: boolean, searchPlaceholderText: string,
		limitSelection: Number
	};
	selectCategory: any = [];

	constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private srvc_cats: ServiceCatalogueService,
		private createAcnt: CreateAcntService, private smbservc: BarServiceService) { }



	ngOnInit(): void {
		this.getMerchantsList()
		this.loadScripts()
		this.basicsForm = this.fb.group({
			firstName: new FormControl('', [Validators.required]),
			lastName: new FormControl('', [Validators.required]),
			gender: new FormControl('', Validators.required),
			title: new FormControl('', Validators.required),
			//   merchantType: new FormControl('', Validators.required),
			emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
			mobileNumber: new FormControl('', Validators.required),
			globalUserRole: ('store owner'),
			mSalesPersonId: new FormControl('', Validators.required),
			groupId: new FormControl(''),
			distributorId: new FormControl('did268167', Validators.required),
			merchantPIN: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]{4}")])],
			confirmPIN: ['', Validators.required],
			dateOfBirth: new FormControl('', [Validators.required]),
			status: {
				status: new FormControl(""),
				stage: new FormControl("")
			},
		})

		this.storeOwnerForm = this.fb.group({
			personalDetails: new FormControl(""),
			cardDetails: new FormControl(""),
			bankDetails: new FormControl(""),
			addressDetails: new FormControl(""),
			licenseDetails: new FormControl(""),
			businessDetails: new FormControl(""),
			staffDetails: new FormControl(""),
			selectedBank: new FormControl('')
		})
		this.branchManagerForm = this.fb.group({
			firstName: new FormControl('', [Validators.required]),
			lastName: new FormControl('', Validators.required),
			emiratesId: new FormControl('', [Validators.required]),
			mobileNumber: new FormControl('', [Validators.required]),
			staffRole: new FormControl('', Validators.required),
			emailId: new FormControl('', Validators.required),
			storeId: new FormControl('', [Validators.required]),
			gender: new FormControl('', Validators.required),
			title: new FormControl('', Validators.required),
			ReportingUserId: new FormControl('', Validators.required),
			salesPersonId: new FormControl(''),
			eIDoc: this.fb.group({
				documentType: new FormControl("emiratesDocument"),
				documentTitle: new FormControl("Emirates Document"),
				documentExpiry: new FormControl("", Validators.required),
				// documentNumber: new FormControl("",Validators.required)
			}),
			passportDoc: this.fb.group({
				documentType: new FormControl("passportDocument"),
				documentTitle: new FormControl("Passport Document"),
				documentExpiry: new FormControl("", Validators.required),
				documentNumber: new FormControl("", Validators.required)
			}),
			visaDoc: this.fb.group({
				documentType: new FormControl("visaDocument"),
				documentTitle: new FormControl("Visa Document"),
				documentExpiry: new FormControl("", Validators.required),
				documentNumber: new FormControl("", Validators.required)
			}),
			emiratesDocument: new FormControl('', [Validators.required]),
			passportDocument: new FormControl('', [Validators.required]),
			visaDocument: new FormControl('', [Validators.required]),
			staffPIN: new FormControl('', [Validators.required]),
			confirmPIN: new FormControl('', [Validators.required]),
		})
		// this.dropdownSettings = {
		// singleSelection: false,
		// idField: 'id',
		// selectAllText: 'Select All',
		// unSelectAllText: 'UnSelect All',
		// itemsShowLimit: 3,
		// allowSearchFilter: true,
		// textField: 'item_text',
		// clearSearchFilter: true,
		// enableCheckAll: false,
		// searchPlaceholderText: "Search Here",
		// limitSelection: 25,

		// };
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
		// this.dropdownSettings = {
		//   singleSelection: false,
		//   idField: 'id',
		//   defaultOpen: true,
		//   textField: 'item_text',
		//   selectAllText: 'Select All',
		//   unSelectAllText: 'UnSelect All',
		//   itemsShowLimit: 3,
		//   allowSearchFilter: true
		// };
		this.dropdownList = [{ id: 1, item_text: 'Mumbai' },
		{ id: 2, item_text: 'Bangaluru' },
		{ id: 3, item_text: 'Pune' },
		{ id: 4, item_text: 'Navsari' },
		{ id: 5, item_text: 'New Delhi' }];
		this.selectedItems = [{ id: 3, item_text: 'Pune' },
		{ id: 4, item_text: 'Navsari' }]
	}

	private loadScripts(): void {
		(function ($) {
			"use strict";
			$('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
			$('#side_menu_bar > ul > li.nav-item > a#li_create_account').addClass("active");
		})(jQuery);
	}
	onSelMerchant(e: any) {
		this.merchantType = e.target.value;
	}
	onSelectBank(event: any) {
		// this.selected = this.storeOwnerForm.value.selectedBank;
		this.selected = event.target.value;
		this.isAbudhabi = false;
		this.isNI = false;
		this.isNbq = false;
		this.isMashreq = false;
		if (this.selected === 'Wps Form') {
			this.isNbq = !this.isNbq
		} else if (this.selected === 'Mid Request Form') {
			this.isMashreq = !this.isMashreq
		} else if (this.selected === 'OnBoarding Form') {
			this.isNI = !this.isNI
		} else {
			this.isAbudhabi = !this.isAbudhabi
		}
	}
	onSelectAcnt(event: any) {
		this.selectedacnt = event.target.value;
		this.isBusiness = false;
		if (this.selectedacnt === 'Business') {
			this.isBusiness = !this.isBusiness
			// this.isPersonal = !this.isPersonal
		} else {
		}
	}
	onSelectCat(event: any) {
		this.selectCategory = [];
		this.onCheckdData = [];
		this.selectedSer = event.target.value;
		this.getBusiTypes(this.selectedSer)
		// this.commercial = true
	}
	getMerchantByID(id: any) {
		this.createAcnt.getMerchantById(id).subscribe(data => {
			this.merchantData.push(data.data);
			this.router.navigate(['/risk'])
		})
	}



	getId() {
	}
	addOwner() {
		this.isOwner = !this.isOwner
	}
	getMerchantsList() {
		this.createAcnt.getMerchants().subscribe(data => {
			this.merchantList = data.data;
		})
	}
	public number: number = 1;
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

	posDetailsFunc(id: any) {
		this.router.navigate(['/risk'], { queryParams: { id } })
	}
	addStore() {
		this.storeOwnerForm.value.addressDetails.storeAddress.addressTitle = "Default";
		this.storeOwnerForm.value.addressDetails.storeAddress.longitude = "123.23";
		const value = { storeDetails: this.storeOwnerForm.value.addressDetails, status: { status: 'Ongoing', stage: 'address details' } };
		let id = this.sData._id;
		this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
			if (data) {
				this.storeList = data.data.storeDetails
				this.AddressFormComponent.addressForm.reset()
			}
		})
	}
	addStaff() {
		this.storeOwnerForm.value.staffDetails.bankDetails = [this.storeOwnerForm.value.staffDetails.bankDetails]
		const value = { staffInfo: this.storeOwnerForm.value.staffDetails, status: { status: 'Ongoing', stage: 'staff details' } };

		let id = this.sData._id;
		this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
			if (data) {
				this.staffList = data.data.staffInfo
				this.StaffFormComponent.staffForm.reset();
			}
		})
	}


	createOwner() {

	}
	owner() {
		this.isOwner = !this.isOwner
		this.userExist = false;
		// this.isUser=!this.isUser
	}
	staff() {
		this.isStaff = !this.isStaff
	}
	// back() {
	//   this.isUser = !this.isUser
	// }
	device() {
		this.isDevice = !this.isDevice
	}
	form() {
		this.isForm = !this.isForm
	}
	details(id: any) {
		this.staffList = []
		this.createAcnt.getMerchantById(id).subscribe(data => {
			data.data.map((mData: any) => {
				mData.staffInfo.map((staffData: any) => {
					this.staffList.push(staffData)
				})
				this.isStaff = !this.isStaff
			})
		})
	}
	goUser(user: any, Id: any) {
		this.personalChild = [];
		this.userExist = true;
		this.isOwner = true;
		this.personalChild.push(user, Id);
		localStorage.setItem('key', JSON.stringify(this.personalChild));
		if (user === 'existingUser' && Id !== undefined) {
			this.createAcnt.checkUserByEmId(Id).subscribe((data: any) => {
				this.basicsForm.patchValue(data.data);
				this.basicsForm.patchValue({merchantPIN:'',confirmPIN:''});
				console.log(this.basicsForm.value)
				// this.storeOwnerForm.value.personalDetails.patchValue(data.data)
				if (data.success === true) {
					this.captureData = data.data;
					this.title = this.captureData.title
					this.captureData.dateOfBirth = this.captureData.dateOfBirth.split("T")[0];
					this.personalChild = this.captureData.documentsData;
					this.prsnlAD = {
						'address': this.captureData.addressDetails,
						'city': this.captureData.city,
						'country': this.captureData.country,
						'docs': this.captureData.documentsData
					};
				};
			});
		};
	}
	getTidList(id: any) {
		this.staffListA = []
		this.merchantId = []
		this.createAcnt.getMerchantById(id).subscribe(data => {
			data.data.map((mData: any) => {
				this.merchantId.push({ mid: mData.bankMID })
				mData.terminalsInfo.map((tidData: any) => {
					let tids = {
						tidInfo: tidData, mid: data.data.bankMID, activationDate: "pending", address: data.data.addressDetails,
						emailId: data.data.emailId, firstName: data.data.firstName, tid: "pending"
					}
					this.staffListA.push(tids)
				})
				this.isDevice = !this.isDevice
			})
		})
	}
	sendAuthentication(merchantId: any) {
		this.createAcnt.sendAuthCode(merchantId).subscribe(data => {
			if (data) {
				// this.isTrack = !this.isTrack;
			}
		})
	}
	subTabs(id: any) {
		this.step = 1;
	}
	next() {
		if (this.selectedUser === 'existingUser') {
			this.basicsForm.value.groupId = this.exGrpId;
		}
		if (this.step == 1) {
			// this.basicsForm.patchValue({ status: { status: 'Ongoing', stage: 'create account' } })
			// const value = this.basicsForm.value;
			// this.createAcnt.createMerchantBasic(value).subscribe((data) => {
			// 	if (data) {
			// 		this.sData = data.data
					this.basic_step = true;
					this.step++
			// 	}
			// })
		} else if (this.step == 2) {
			// let id = this.sData._id;
			// let data = this.storeOwnerForm.value.personalDetails;
			// let documentsData: any = [
			// 	{
			// 		documentType: "emiratesDocument",
			// 		documentTitle: "Emirates Document",
			// 		documentExpiry: data.eIExpiry,
			// 		documentNumber: data.eINumber
			// 	},
			// 	{
			// 		documentType: "passportDocument",
			// 		documentTitle: "Passport Document",
			// 		documentExpiry: data.passportExpiry,
			// 		documentNumber: data.passportNum
			// 	}
			// ]
			// const fdata = new FormData();
			// fdata.append("city", data.city)
			// fdata.append("addressDetails", data.addressDetails)
			// fdata.append("country", data.country)
			// fdata.append("emiratesId", data.eINumber)
			// fdata.append("documentsData", JSON.stringify(documentsData))
			// fdata.append("status[status]", "Ongoing")
			// fdata.append("status[stage]", "personal details")
			// fdata.append("emiratesDocument", data.emiratesFileName)
			// fdata.append("passportDocument", data.passportFileName)
			// const value = fdata;
			// this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
			// 	if (data) {
					this.personal_step = true;
					this.step++
			// 	}
			// })
		} else if (this.step == 3) {
			// let id = this.sData._id;
			// let BankDetailsList = { bankDetails: [this.storeOwnerForm.value.bankDetails], status: { status: 'Ongoing', stage: 'bank details' } }
			// const value = BankDetailsList;
			// this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
			// 	if (data) {
					this.card_step = true;
					this.step++
			// 	}
			// })
		} else if (this.step == 4) {
			this.address_step = true;
			this.step++;
		} else if (this.step == 5) {
			// let id = this.sData._id;
			// let data = this.storeOwnerForm.value.licenseDetails
			// const fdata = new FormData();
			// let documentsData: any = [
			// 	{
			// 		documentType: "licenseDocument",
			// 		documentTitle: "License Document",
			// 		documentExpiry: data.licenceExpiry,
			// 		documentNumber: data.licenceNum
			// 	},
			// 	{
			// 		documentType: "ecCopy",
			// 		documentTitle: "EC Document",
			// 		documentNumber: data.eCNumber
			// 	}
			// ]
			// fdata.append("companyName", data.companyName)
			// fdata.append("documentsData", JSON.stringify(documentsData))
			// fdata.append("licenseDocument", data.licenseDocument)
			// fdata.append("ecCopy", data.ecCopy)
			// fdata.append("status[status]", " Active")
			// fdata.append("status[stage]", " license details")
			// const value = fdata;
			// this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
			// 	if (data) {
					this.license_step = true;
					this.step++;
			// 	}
			// })
		}
		else if (this.step == 6) {
			// let id = this.sData._id;
			// const value = { businessDetails: this.storeOwnerForm.value.businessDetails, status: { status: 'Ongoing', stage: 'business details' } }
			// this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
			// 	if (data) {
					this.business_step = true;
					this.step++;
			// 	}
			// })

		} else if (this.step == 7) {
			this.staff_step = true;
			this.step++;
			// }
		} else if (this.step == 8) {
			// let value: any;

			// let id = this.sData._id
			// if (this.selectedSer === "SMB") {
			// 	this.onCheckdData.map((o: any) => {
			// 		this.cats.map((c: any) => {
			// 			if (o.serviceName === c.categoryName) {
			// 				let Obj: any = {}
			// 				Obj.serviceId = o.serviceId;
			// 				Obj.serviceName = o.itemName
			// 				c.categoryItems = [...c.categoryItems, Obj];
			// 			}
			// 		})
			// 	})

			// 	value = { merchantType: this.selectedSer, merchantItems: this.cats, status: { status: 'Ongoing', stage: 'item details' } }
			// } else if (this.selectedSer === "Enterprise" || this.selectedSer === "Govt") {
			// 	this.onCheckdData.map((o: any) => {
			// 		this.cats.map((c: any) => {
			// 			let Obj: any = {}
			// 			Obj.serviceId = o.serviceId;
			// 			Obj.serviceName = o.serviceName
			// 			c.categoryItems.push(Obj);

			// 		})

			// 	})
			// 	value = { merchantType: this.selectedSer, merchantItems: this.cats, status: { status: 'Ongoing', stage: 'item details' } }

			// }

			// this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
			// 	if (data) {
					this.busiType_step = true;
					this.step++;
			// 		this.totalData = data.data;
			// 	}
			// })
		} else if (this.step == 9) {
			// let id = this.sData._id
			// this.idForm = this.sData._id
			this.terms_step = true;
			this.step++;
			// this.sData = [];
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
			this.address_step = false;

		} else if (this.step == 5) {
			this.license_step = false;

		} else if (this.step == 6) {
			this.business_step = false;
		} else if (this.step == 7) {
			this.staff_step = false;
		} else if (this.step == 8) {
			this.busiType_step = false;
		}
		else if (this.step == 9) {
			this.terms_step = false;
		}
	}

	uploadEmiratesfile(event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.branchManagerForm.get('emiratesDocument')?.setValue(file);
		}
	}
	uploadPassportfile(event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.branchManagerForm.get('passportDocument')?.setValue(file);
		}
	}
	uploadVisafile(event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.branchManagerForm.get('visaDocument')?.setValue(file);
		}
	}
	deviceUpdate(id: any) {
		this.createAcnt.updateDevice(id).subscribe((data) => {

		})
	}
	addTID() {
		let data = this.branchManagerForm.value;
		let documentsData: any = [data.eIDoc, data.passportDoc, data.visaDoc];
		// const fdata = new FormData();
		// fdata.append("firstName", data.firstName)
		// fdata.append("lastName", data.lastName)
		// fdata.append("emiratesId", data.emiratesId)
		// fdata.append("staffRole", data.staffRole)
		// fdata.append("mobileNumber", data.mobileNumber)
		// fdata.append("emailId", data.emailId)
		// fdata.append("storeId", data.storeId)
		// fdata.append("gender", data.gender)
		// fdata.append("title", data.title)
		// fdata.append("staffReportingUserId", data.ReportingUserId)
		// fdata.append("salesPersonId", data.salesPersonId)
		// fdata.append("staffPIN", data.staffPIN)
		// fdata.append('confirmPIN', data.confirmPIN)
		// fdata.append("documentsData[]", documentsData)
		// fdata.append("documentsData[0].documentType", "emiratesDocument")
		// fdata.append("documentsData[0].documentTitle", "Emirates Document")
		// fdata.append("documentsData[0].documentExpiry", data.eIDoc.documentExpiry)
		// fdata.append("documentsData[1].documentType", "passportDocument")
		// fdata.append("documentsData[1].documentTitle", "Passport Document")
		// fdata.append("documentsData[1].documentExpiry", data.passportDoc.documentExpiry)
		// fdata.append("documentsData[1].documentNumber", data.passportDoc.documentNumber)
		// fdata.append("documentsData[2].documentType", "visaDocument")
		// fdata.append("documentsData[2].documentTitle", "Visa Document")
		// fdata.append("documentsData[2].documentExpiry", data.visaDoc.documentExpiry)
		// fdata.append("documentsData[2].documentNumber", data.visaDoc.documentNumber)
		// fdata.append("emiratesDocument", data.emiratesDocument)
		// fdata.append("passportDocument", data.passportDocument)
		// fdata.append("visaDocument", data.visaDocument)
		// const value = fdata;
		// this.createAcnt.createTID(value).subscribe((data) => {
		//   if (data) {
		//     console.log(data)
		//   }
		// })
	}
	
	checkExisting(e: any) {
		this.selectedUser = e.target.value;

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
		return (this.storeOwnerForm.controls, this.branchManagerForm.controls,
			this.deliveryPOSForm.controls,
			this.staffPOSForm.controls);
	}
	onOwnerSubmit() {
		this.storeOwnerForm.reset();
		this.sData = [];
		this.step = 1
	}
	onManagerSubmit() {
		this.branchManagerForm.reset();
	}
	onDeliveryPosSubmit() {
		this.deliveryPOSForm.reset();
	}
	onStaffPosSubmit() {
		this.staffPOSForm.reset();
	}
	BacktoList() {
		this.isOwner = !this.isOwner;
	}

	//multiselect Functionalities

	onItemSelect(item: any) {
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
