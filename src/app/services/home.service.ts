import { Injectable } from '@angular/core';
import {HttpClient,HttpEvent,HttpRequest} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    private adminUrl = 'http://localhost:3031/api/'
    constructor(private http:HttpClient) { }
    upload(file:File){
        const formData :FormData = new FormData();
        formData.append('mtImage',file);
        // const req = new HttpRequest('PUT',`${this.adminUrl}/home/mtupload`,formData,{
        //     reportProgress:true,
        //     responseType:'json'
        // });
        // return this.http.request(req);
        return this.http.put<any>(`${this.adminUrl}/home/mtupload`,formData,{
            reportProgress:true,
            observe:'events'
        })
    }
    getFiles() {
        return this.http.get(`${this.adminUrl}/home/mtimages`);
    };
    getServiceTypes():Observable<any>{
        return this.http.put(`${environment.Admin_URL}/home/service/serviceType`,'');
    }
    getStatusData():Observable<any>{
        return this.http.get(`${environment.Admin_URL}/home/serviceStatus/serviceType`).pipe(catchError(err=>of(err)));
    }
    updateServceStatus(pos:any,body:any):Observable<any>{
        return this.http.put(`${environment.Admin_URL}/home/service/serviceType/${pos}`,body).pipe(catchError(err=>of(err)));
    }
    updateCurrentStatus(body:any):Observable<any>{
        return this.http.put(`${environment.Admin_URL}/home/current/status/currentStatus`,body).pipe(catchError(err=>of(err)));
    }
    barchart(itemName:any):Observable<any>{
        return this.http.get(`${environment.Admin_URL}/home/getByItem/${itemName}`).pipe(catchError(err=>of(err)));
    }
    DashboardBarchart():Observable<any>{
        return this.http.get(`${environment.Admin_URL}/home/distributorReport`).pipe(catchError(err=>of(err)));
    }

}
