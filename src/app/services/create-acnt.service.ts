import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
const baseApi = 'http://20.233.5.209:3000/api';

@Injectable({
  providedIn: 'root'
})
export class CreateAcntService {

  constructor(private http: HttpClient) { }

  createMerchantBasic(body: any): Observable<any> {
    return this.http.post(`${environment.Onboarding_URL}/users`, body);
  }

  updateMerchantPersonal(formData: any, mid: any): Observable<any> {
    return this.http.put(`${environment.Onboarding_URL}/users/owner/${mid}`, formData);
  }
  getMerchants(): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/merchant/getMerchants`)
  }
  getItems(): Observable<any> {
    return this.http.get(`https://payrowqa.payrow.ae/api/items/category`);
  }
  getMerchantById(mid: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/merchant/getMerchants/${mid}`);
  }
  createTID(body: any): Observable<any> {
    return this.http.put(`${environment.Onboarding_URL}/pos`, body)
  }
  deActivateMerchant(mid: any, body: any): Observable<any> {
    return this.http.put(`${environment.Mobile_URL}/youCloud/delete/${mid}`, body)
  }
  updateDevice(mid: any): Observable<any> {
    return this.http.put(`${environment.Mobile_URL}/youCloud/sendTid/${mid}`, mid)
  }
  sendAuthCode(mid: any): Observable<any> {
    return this.http.get(`${environment.Mobile_URL}/youCloud/sendTid/${mid}`)
  }
  transationRate(body: any): Observable<any> {
    return this.http.post(`${environment.Mobile_URL}/transRate/Trans`, body)
  }
  bankObdCreation(body: any): Observable<any> {
    return this.http.post(`${environment.Admin_URL}/ca/bank`, body);
  }
  getBankDetails(): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/ca/banks`);
  }
  updateBankStatus(id: any, body: any): Observable<any> {
    return this.http.put(`${environment.Admin_URL}/ca/bank/${id}`, body)
  }
  checkUserByEmId(id:any):Observable<any>{
	return this.http.get(`${environment.Admin_URL}/ca/checkUser/${id}`).pipe(catchError(err=>of(err)));
  }
}
