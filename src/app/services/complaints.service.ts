import { Injectable } from '@angular/core';
import {HttpClient,HttpEvent,HttpRequest} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  constructor(private http: HttpClient) { }

  getAllComplaints():Observable<any>{
    return this.http.get(`${environment.Mobile_URL}/complaints`).pipe(catchError(err=>of(err)));
  }
  updateStatus(id:any,body:any):Observable<any>{
    return this.http.put(`${environment.Mobile_URL}/complaints/${id}`,body).pipe(catchError(err=>of(err)));
  }
  cmpHistory(body?:any):Observable<any>{
    return this.http.put(`${environment.Admin_URL}/complaints/cmphistory`,body).pipe(catchError(err=>of(err)));
  }
  currentStatus():Observable<any>{
    return this.http.get(`${environment.Admin_URL}/complaints/cmpstatus/complaintsHistory`).pipe(catchError(err=>of(err)));
  }
  updateCurrStatus(body:any):Observable<any>{
    return this.http.put(`${environment.Admin_URL}/complaints/cmpstatus/cmp-currentStatus`,body).pipe(catchError(err=>of(err)))
  }
  addRemarks(cmpId:any,body:any):Observable<any>{
    return this.http.put(`${environment.Mobile_URL}/complaints/remarks/${cmpId}`,body).pipe(catchError(err=>of(err)));
  }
  cmpById(cmpId:any):Observable<any>{
    return this.http.get(`${environment.Mobile_URL}/complaints/${cmpId}`).pipe(catchError(err=>of(err)));
  }
}
