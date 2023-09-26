import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import{environment} from 'src/environments/environment'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

    constructor(private http: HttpClient) { }

    empCreation(formData:any,empId?:any):Observable<any>{
        if(empId){
            return this.http.put(`${environment.Admin_URL}/emp/creation/${empId}`,formData).pipe(catchError(error => of(error)));
        }else{
            return this.http.put(`${environment.Admin_URL}/emp/creation`,formData).pipe(catchError(error => of(error)));
        }
        
    };
    updateEmp(body:any,empId:any):Observable<any>{
        return this.http.put(`${environment.Admin_URL}/emp/employee/${empId}`,body).pipe(catchError(error => of(error)));
    }
    getAllEmp():Observable<any>{
        return this.http.get(`${environment.Admin_URL}/emp/employees`).pipe(catchError(err=> of(err)));
    }
    wpsDetails(body:any,empId:any):Observable<any>{
        return this.http.put(`${environment.Admin_URL}/emp/wps/${empId}`,body).pipe(catchError(err=> of(err)));
    }
    applyLeavs(body:any,empId:any):Observable<any>{
        return this.http.put(`${environment.Admin_URL}/emp/leaves/${empId}`,body).pipe(catchError(err=> of(err)));
    }
}
