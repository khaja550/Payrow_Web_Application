import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import {EmpService} from 'src/app/services/emp.service';
import {NotificationService} from 'src/app/core/services/notification.service'
import * as _ from 'lodash';
import { closeFilterDialog } from '@syncfusion/ej2-angular-grids';
declare var jQuery: any;
declare var $: any; 
@Component({
  selector: 'app-employee-relations',
  templateUrl: './employee-relations.component.html',
  styleUrls: ['./employee-relations.component.scss']
})
export class EmployeeRelationsComponent implements OnInit {
    empForm: FormGroup;
    wpsForm:FormGroup;
    searchText:any;
    sortValue:any;
    isShow:boolean=false;
    employeeDetails:any=[];
    oneEmpDetails:any={};
    wpsData:any={}
    leaveForm:FormGroup;

    wpsDetails: FormGroup;
    constructor(
        private app: AppManagerService, private fb:FormBuilder,private emp:EmpService,private noteService:NotificationService
    ) { 
        this.app.ShowReportDate = 'true';
    }
    // public employeeDetails: any =[
    //     {   no:1,
    //         empName:"Ahmad",
    //         empId:3456,
    //         jobDescription:"Sales Associate",
    //         jobTitle:"Sales",
    //         empGrade:"25412",
    //         personalInfo:"Data all about personalinfo",
    //         salary: 12000,
    //         leaveBalance:"30 days",
    //         endService:new Date("23-4-2024"),
    //         avatar:"assets/images/avatar.png",
    //         wps:[]
    //     },
    // ]
    // public wpsDetails:any=[
    //     {empId:""}
    // ]
    ngOnInit(): void {
        this.loadScripts();

        this.empForm  = this.fb.group({
            empImage: [null],
            empName: new FormControl("",[Validators.required]),
            jobTitle: new FormControl("",[Validators.required]),
            salary: new FormControl("",[Validators.required]),
            empId: new FormControl(""),
            empGrade: new FormControl("",[Validators.required]),
            leaveBalance: new FormControl("",[Validators.required]),
            jobDesc: new FormControl("",[Validators.required]),
            personalInfo: new FormControl("",[Validators.required]),
            endService: new FormControl("",[Validators.required]),

        });
        this.wpsDetails = this.fb.group({
            basic: new FormControl(''),
            hra: new FormControl(''),
            transport: new FormControl(''),
            dateOfJoining:new FormControl(''),
            bonus:new FormControl(''),
            acNum:new FormControl('')
        });
        // this.leaveForm = this.fb.array([])
        this.leaveForm = this.fb.group({
            fromDate:new FormControl(""),
            toDate:new FormControl(""),
            typeOfLeave:new FormControl(""),
            remarks:new FormControl("")
        })
        this.getAllEmployees();
    }
    // get leaves() : FormArray {
    //     return this.leaveForm.get("leaves") as FormArray
    // }
    // newLeavs(): FormGroup {
    //     return this.fb.group({
    //         fromDate:new FormControl(""),
    //         toDate:new FormControl(""),
    //         typeOfLeave:new FormControl(""),
    //         remarks:new FormControl("")
    //     })
    // }
     
    // addleavs() {
    //     this.leaves.push(this.newLeavs());
    // }
    

    private loadScripts(): void {
        (function($) {
        "use strict";

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_employee_relations').addClass("active");
        })(jQuery);
    }
    submit(){
        var formData :any = new FormData();
        formData.append('empImage', this.empForm.get('empImage')?.value);
        formData.append('empName', this.empForm.get('empName')?.value);
        formData.append('jobTitle', this.empForm.get('jobTitle')?.value);
        formData.append('salary', this.empForm.get('salary')?.value);
        // formData.append('empId', this.empForm.get('empId')?.value);
        formData.append('empGrade', this.empForm.get('empGrade')?.value);
        formData.append('leaveBalance', this.empForm.get('leaveBalance')?.value);
        formData.append('jobDesc', this.empForm.get('jobDesc')?.value);
        formData.append('personalInfo', this.empForm.get('personalInfo')?.value);
        formData.append('endService', this.empForm.get('endService')?.value);
        this.emp.empCreation(formData).subscribe(data=>{
            if(data.success===true){
                this.empForm.reset();
                this.noteService.showSuccess(`200 : ${data.message}`,'');
                this.getAllEmployees();
            }else{
                this.noteService.showError(`${data.status} : ${data.error.message}`,'')
            }
        })
        this.isShow=!this.isShow
    }


    sort(event: any) {
        if (event) {
            this.sortValue = event;
        }
        this.employeeDetails = event ==="A to Z" ? _.orderBy(this.employeeDetails,[(obj)=>obj['empName'].toLowerCase()],['asc'])
                                : event ==="Z to A" ? _.orderBy(this.employeeDetails,[(obj)=>obj['empName'].toLowerCase()],['desc'])
                                : event === "salary_low" ? _.orderBy(this.employeeDetails,['salary'],['asc'])
                                :  _.orderBy(this.employeeDetails,['salary'],['desc'])
        
    }

    addItem(){
        this.isShow=!this.isShow
        this.empForm.reset()
    }
    
    onFileSelected(event?:any,opt?:any){
        console.log("##############################",event.target.files[0])
        const file =<File>event.target.files[0];
        this.empForm.patchValue({empImage:file});
        this.empForm.get('empImage')?.updateValueAndValidity();
    }
    // onUpdateFile(opt:any){
        
    // }

    getAllEmployees(){
        this.emp.getAllEmp().subscribe(data=>{
            if(data.success === true){
                console.log(data.data)
                this.employeeDetails = data.data;
            }
        })
        
    }
    getDetails(emp:any){
        this.oneEmpDetails = emp;
        if(emp.wpsDetails != undefined){
            this.wpsData =emp.wpsDetails;
        }
    }

    updateOne(emp:any){
        var formData :any = new FormData();
        console.log(this.empForm.get('empImage')?.value,'219837189')
        if(this.empForm.get('empImage')?.value === null){
            formData.append('empImage', this.empForm.get('empImage')?.value);
            formData.append('empName', this.empForm.get('empName')?.value);
            formData.append('jobTitle', this.empForm.get('jobTitle')?.value);
            formData.append('salary',this.empForm.get('salary')?.value);
            // formData.append('empId',this.empForm.get('empId')?.value);
            formData.append('empGrade', this.empForm.get('empGrade')?.value);
            formData.append('leaveBalance', this.empForm.get('leaveBalance')?.value);
            formData.append('jobDesc', this.empForm.get('jobDesc')?.value);
            formData.append('personalInfo', this.empForm.get('personalInfo')?.value);
            formData.append('endService', this.empForm.get('endService')?.value);
            this.emp.empCreation(formData,emp.empId).subscribe(data=>{
                if(data.success===true){
                    this.empForm.reset()
                    this.noteService.showSuccess(`200 : ${data.message}`,'');
                    this.getAllEmployees();
                    this.close();
                }else{
                    this.noteService.showError(`${data.status} : ${data.error.message}`,'')
                    this.close();
                }
            })
        }else{
            this.empForm.value.empImage = emp.path;
            this.empForm.value.imgName = emp.imgName;
            this.emp.updateEmp(this.empForm.value,emp.empId).subscribe(data=>{
                if(data.success===true){
                    this.noteService.showSuccess(`200 : ${data.message}`,'');
                    this.getAllEmployees();
                    this.close();
                }else{
                    this.noteService.showError(`${data.status} : ${data.error.message}`,'');
                    this.close();
                }
            })
        }
    }
    wps(emp:any){
        this.emp.wpsDetails(this.wpsDetails.value,emp.empId).subscribe(data=>{
            if(data.success===true){
                this.noteService.showSuccess(`200 : ${data.message}`,'');
                this.getAllEmployees();
                this.close();
            }else{
                this.noteService.showError(`${data.status} : ${data.error.message}`,'');
                this.close();
            }
        })
    }
    applyLeaves(emp:any){
        this.emp.applyLeavs(this.leaveForm.value,emp.empId).subscribe(data=>{
            if(data.success===true){
                this.noteService.showSuccess(`200 : ${data.message}`,'');
                this.leaveForm.reset();
                this.getAllEmployees();
                this.close();
            }else{
                this.noteService.showError(`${data.status} : ${data.error.message}`,'');
                this.close();
            }
        })
    }
    close(){
        $(".modal").modal("hide");
    }

    
}