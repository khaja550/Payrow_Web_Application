import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash'
import {ComplaintsService} from 'src/app/services/complaints.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import { ILoadedEventArgs, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
        // complaintsData:any=[]
    distributorForm: FormGroup;
    searchText: any;
    public palette: String[];
    sortValue: any;
    sortType: string;
    sortReverse: boolean = false;
    complaintObj:any=[]
    remarksoutData:any=[];
    public remarksMsg: any
    public finalTabularData: any = [];
    public finalData: any = [];
    selectedStatus: any = ""
    rmkCPlaint: any;
    constructor(
        private app: AppManagerService, private fb: FormBuilder, private cmp_Srvce:ComplaintsService,private note_service:NotificationService
    ) {
        this.app.ShowReportDate = 'true';
    }
    status: any = [{ key: "Open", color: "green" }, { key: "Close", color: "Yellow" }, { key: "Dispute", color: "Red" }]
    public complaintsData: any = [
        { userId: 201, customerName: "Arvind", contact: "9897856863", email: "a@gmail.com", remarks: [{ date: new Date(), data: "Hi there" }], complaintDate: new Date("12-20-2021"), complaintNum: 732984, delay: 7, status: "Open" },
        { userId: 202, customerName: "Sudhakar", contact: "7725328298", email: "b@gmail.com", remarks: [], complaintDate: new Date("12-17-2021"), complaintNum: 987124, delay: 12, status: "Open" },
        { userId: 203, customerName: "Chandra", contact: "8745096543", email: "c@gmail.com", remarks: [], complaintDate: new Date("12-18-2021"), complaintNum: 912739, delay: 5, status: "Dispute" },
        { userId: 204, customerName: "Sadhana", contact: "6532987654", email: "d@gmail.com", remarks: [], complaintDate: new Date("12-5-2021"), complaintNum: 561433, delay: 10, status: "Open" },
        { userId: 205, customerName: "Vikram", contact: "9875983785", email: "e@gmail.com", remarks: [], complaintDate: new Date("12-14-2021"), complaintNum: 614276, delay: 3, status: "Close" },
        { userId: 206, customerName: "Arun Kumar", contact: "8157320946", email: "f@gmail.com", remarks: [], complaintDate: new Date("12-14-2021"), complaintNum: 187251, delay: 9, status: "Dispute" },
        { userId: 207, customerName: "Ram", contact: "6723954679", email: "g@gmail.com", remarks: [], complaintDate: new Date("12-08-2021"), complaintNum: 986753, delay: 5, status: "Open" },
        { userId: 208, customerName: "Krishna", contact: "9536896637", email: "h@gmail.com", remarks: [], complaintDate: new Date("12-7-2021"), complaintNum: 564365, delay: 10, status: "Close" },
        { userId: 209, customerName: "Prasd", contact: "7572338758", email: "i@gmail.com", remarks: [], complaintDate: new Date("12-01-2021"), complaintNum: 635272, delay: 4, status: "Dispute" },
        { userId: 210, customerName: "RadheSyam", contact: "9587682623", email: "j@gmail.com", remarks: [], complaintDate: new Date("12-07-2021"), complaintNum: 847982, delay: 11, status: "Open" },
        { userId: 211, customerName: "Kiran", contact: "9765635263", email: "k@gmail.com", remarks: [], complaintDate: new Date("12-14-2021"), complaintNum: 416798, delay: 7, status: "Close" }
    ]
    public remarksData: any = [];
    public remarksDataOut:any=[];

    public radius: Object = { bottomLeft: 0, bottomRight: 0, topLeft: 5, topRight: 5 }
    months: String[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', ' Nov', 'Dec'];
    public tooltip: Object = {
        enable: true
    };
    public title: string = '';
    public legend: Object = {
        visible: false
    }
    public chartArea: Object = {
        border: {
        width: 0
        }
    };

    ngOnInit(): void {

        this.getcomplaintsData();
        this.complaintsData;
    
    }

    ngAfterViewInit(): void {

        this.loadScripts()
    }
    public randomIntFromInterval(min: any, max: any): any { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    private loadScripts(): void {
        (function ($) {
        "use strict";
        $('.knob').knob();

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_complaints').addClass("active");
        })(jQuery);
    }
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(
        (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
            /-dark/i,
            'Dark'
        )
        );

    }

    sortOrders(prop: any) {
        this.sortType = prop;
        this.complaintsData = this.sortReverse === false ?
        _.orderBy(this.complaintsData, [prop], ['desc']) :
        _.orderBy(this.complaintsData, [prop], ['asc']);
        this.sortReverse = !this.sortReverse;
    }


    sort(event: any) {
        if (event) {
        this.sortValue = event;
        }
        this.complaintsData = event === "A to Z" ? _.orderBy(this.complaintsData, [(obj) => obj['cust_name'].toLowerCase()], ['asc'])
        : event === "Z to A" ? _.orderBy(this.complaintsData, [(obj) => obj['cust_name'].toLowerCase()], ['desc'])
            : event === "date_low" ? _.orderBy(this.complaintsData, ['date'], ['asc'])
            : _.orderBy(this.complaintsData, ['date'], ['desc'])
    }

    getcomplaintsData(){
        this.cmp_Srvce.getAllComplaints().subscribe(data=>{
            if(data.success === true){
                this.complaintsData = data.data;
            }
            this.complaintsData.map((data: any) => {
                // switch(data.status){
                // 	case "Open" :
                // 		data.color = new Date(data.date).getDate() === new Date().getDate()  
                //         ? "yellow" : new Date().getDate() - new Date(data.date).getDate() <= 5 
                //         ? "blue" :"red"
                // 		break;
                // 	case "Dispute" :
                // 		data.color =  "red"
                // 		break;
                // 	case "Close" :
                // 		data.color =  "green"
                // 		break;
                // 	default:
                // 		break;
                // }
                
                data.color = data.status === 'Dispute' ? 'red' : data.status === 'Close' ? 'green' : 'yellow';
                const date1:any = new Date(data.complaintDate);
                const date2 :any= new Date();
                const diffTime = Math.abs(date2 - date1);
                data.delay = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            });
        })
    }
    updateRemarks(msg:any){
        const obj:any={
            key:'admin',
            msg:msg
        }
        this.cmp_Srvce.addRemarks(this.rmkCPlaint.complaintNum,obj).subscribe(data=>{
            if(data.success=== true){
                this.cmp_Srvce.cmpById(this.rmkCPlaint._id).subscribe(data=>{
                    if(data.success ===true){
                        this.remarksData = data.data['remarks'];
                    }
                })
                this.note_service.showSuccess(`200 - ${data.message}`,'');
                
            }else{
                this.note_service.showError(`${data.error.message}`,'')
            }
        })
        this.remarksMsg =""
    }
    edit(complaint:any){
        this.remarksData =[];
        this.remarksData = complaint.remarks;
        this.rmkCPlaint = complaint;
    }
    onChangeStatus(e:any,complaint:any){
        const Obj ={
            "status":e.target.value,
        }
        this.cmp_Srvce.updateStatus(complaint._id,Obj).subscribe(data=>{
            if(data.success === true){
                this.note_service.showSuccess(`${200} : ${data.message}`,'')
                this.getcomplaintsData();
            }else{
                this.note_service.showError(`${data.status} : ${data.error.message}`,'')
            }
        })
    }

}
