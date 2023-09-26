import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BarServiceService {

    constructor(private http:HttpClient) { }

    getItemsData(){
        return this.http.get<any>('../assets/jsons/currentStatusMarket.json')
    };
    getMarketData(){
        return this.http.get<any>('../assets/jsons/marketItems.json')
    };
    getServicetypeHomeData(){
        return this.http.get<any>('../assets/jsons/serviceTypeHome.json')
    }
    getConsolidateData(){
        return this.http.get<any>('../assets/jsons/consolidate.json').toPromise()
    }
    getPosPerformanceData(){
        return this.http.get<any>('../assets/jsons/posPerformance.json').toPromise()
    }
    getPosIdData(){
        return this.http.get<any>('../assets/jsons/posIdPage.json').toPromise()
    }
    getServiceGatewayData(){
        return this.http.get<any>('../assets/jsons/gatewayServiceType.json').toPromise()
    }
    getcompalintsData(){
        return this.http.get<any>('../assets/jsons/complaints.json').toPromise()
    }
    getTopCustomers(){
        return this.http.get<any>('../assets/jsons/topCustomers.json').toPromise()
    }
    getTotItems(){
        return this.http.get<any>('../assets/jsons/totItems.json').toPromise()
    }
    getFinProfitLoss(){
        return this.http.get<any>('../assets/jsons/finProfitLoss.json').toPromise()
    }
    getServiceCatDetails(){
        return this.http.get<any>('../assets/jsons/cats.json').toPromise()
    }
    getSmbDetails(){
        return this.http.get<any>('../assets/jsons/serviceCatalogue.json').toPromise()
    }
}
    

