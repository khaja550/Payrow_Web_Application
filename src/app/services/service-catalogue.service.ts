import { Injectable } from '@angular/core';
import {HttpClient,HttpEvent,HttpRequest} from '@angular/common/http';
import { Observable ,of} from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceCatalogueService {

    constructor(private http: HttpClient) { }

    createMaster(data:any):Observable<any>{
        return this.http.post(`${environment.srvCatalalogue_URL}/merchants`,data).pipe(catchError(error => of(error)));
    }
    createServices(data:any):Observable<any>{
        return this.http.post(`${environment.srvCatalalogue_URL}/governametServices`,data).pipe(catchError(error => of(error)));
    }
    getMasterSheet(mid:any):Observable<any>{
        return this.http.get(`${environment.srvCatalalogue_URL}/merchantServices/${mid}`).pipe(catchError(err=>of(err)));
    }
    getService():Observable<any>{
        return this.http.get(`${environment.srvCatalalogue_URL}/governametServices`).pipe(catchError(err=>of(err)));
    }
    getmasters():Observable<any>{
        return this.http.get(`${environment.srvCatalalogue_URL}/merchants`).pipe(catchError(err=>of(err)));
    }
    crtMrchntServices(data:any):Observable<any>{
        return this.http.post(`${environment.srvCatalalogue_URL}/merchantServices`,data).pipe(catchError(error => of(error)));
    }
    getTaxCodes():Observable<any>{
        return this.http.get(`${environment.srvCatalalogue_URL}/taxes`).pipe(catchError(err=>of(err)));
    }
    getTaxDetailsByTaxCode(taxCode:any):Observable<any>{
        return this.http.get(`${environment.srvCatalalogue_URL}/taxes/${taxCode}`).pipe(catchError(err=>of(err)));
    }
	getCategory():Observable<any>{

        return this.http.get(`${environment.srvCatalalogue_URL}/smbServices/category`).pipe(catchError(err => of(err)));

    }
	addCategory(data: any): Observable<any> {
        return this.http.post(`${environment.srvCatalalogue_URL}/smbServices/category`, data).pipe(catchError(error => of(error)));
    }
    addItem(data:any):Observable<any>{
        return this.http.post(`${environment.srvCatalalogue_URL}/smbServices/product`, data).pipe(catchError(error => of(error)));
    }
    getMerchntServices():Observable<any>{
        return this.http.get(`${environment.srvCatalalogue_URL}/merchantServices`).pipe(catchError(err => of(err)));
    }
}
