import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { NotificationService } from 'src/app/core/services/notification.service';
declare var jQuery: any;

@Component({
  selector: 'app-tid-allocate',
  templateUrl: './tid-allocate.component.html',
  styleUrls: ['./tid-allocate.component.scss']
})
export class TidAllocateComponent implements OnInit {
  tidData: any = [
    {
      sNo: 281391231, mid: 863832, tid: '984180', name: "Aravind", email: "aravind@gmail.com", address: "UAE", joiningDate: "10-21-2021",
      salesPerName: "Supriya", salesPerAdd: "supriya@gmail.com", cust_score: 10, isAllocated: true
    },
    {
      sNo: 12837819, mid: 587598, tid: 'Pending', name: "Sadhana", email: "Sadhana@gmail.com", address: "India", joiningDate: "10-21-2021",
      salesPerName: "Rishabh", salesPerAdd: "rishabh@gmail.com", cust_score: 8, isAllocated: false
    },
    {
      sNo: 98327492, mid: 587598, tid: 'Pending', name: "Sudhakar", email: "Sudhakar@gmail.com", address: "USA", joiningDate: "10-21-2021",
      salesPerName: "Sathya", salesPerAdd: "sathya@gmail.com", cust_score: 9, isAllocated: false
    }
  ];
  tidPerData: any = [];
  tidList: any = []
  isTrack: any;
  isForm: boolean = false;
  searchId: any;
  searchText: any;
  constructor(private app: AppManagerService, private createAcnt: CreateAcntService, private note_service: NotificationService) {
    this.app.ShowReportDate = 'true';
  }

  ngOnInit(): void {
    this.tIdList()
    this.loadScripts()
  }

  private loadScripts(): void {
    (function ($) {
      'use strict';

      $('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
      $('#side_menu_bar > ul > li.nav-item > a#li_onboarding').addClass('active');
    })(jQuery);
  }

  userDetailsFunc(imei: any) {
    this.isTrack = !this.isTrack;
    this.tidPerData = [];
    this.tidData.map((sData: any) => {
      if (parseInt(imei) === sData.sNo) {
        this.isTrack = imei;
        this.tidPerData.push(sData);
        // this.selectStoreCat = sData.data[0].cat;
      }
    });

    // this.tidList.map((sData: any) => {
    //   console.log(sData.tidInfo.deviceIMEINumber)
    //   if (imei === sData.tidInfo.deviceIMEINumber) {
    //     this.isTrack = imei;
    //     this.tidPerData.push(sData);
    //     // this.selectStoreCat = sData.data[0].cat;
    //   }
    // });

    if (this.tidPerData.length === 0) {
      alert(`${imei} Does Not Exist`)
    };
    this.searchId = "";
    //console.log("###########################",this.storeCatData[0].data[0].cat);
  };

  sendAuthentication(id: any) {
    console.log(id, 'id')
    this.createAcnt.sendAuthCode(id).subscribe(data => {
      if (data.success === true) {
        this.note_service.showSuccess(`${200} : ${data.message}`, '')
      } else {
        this.note_service.showError(`${data.status} : ${data.error.message}`, '')
      }
      if (data) {
        console.log('Authentication is sent')
        this.isTrack = !this.isTrack;
      }
      // this.merchantList = data.data;
    })
  }

  tIdList() {
    this.createAcnt.getMerchants().subscribe(data => {
      data.data.map((tData: any) => {
        if (tData.terminalsInfo.length !== 0) {
          tData.terminalsInfo.map((data: any) => {
            let tids = {
              tidInfo: data, mid: tData.bankMID, activationDate: "pending", address: tData.addressDetails,
              emailId: tData.emailId, firstName: tData.firstName, tid: "pending", status: tData.status.status
            }
            this.tidList.push(tids)
          })
          console.log(this.tidList)
        }
      })
    })
  }



  backToList() {
    this.isTrack = !this.isTrack;
    this.tIdList()
  }
  showForm() {
    this.isForm = !this.isForm;
  }
}
