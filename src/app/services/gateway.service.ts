import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(private http: HttpClient) { }

  //merchant config
  createMerchantConfig(body: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/merchantGatewayConfig/create`, body).pipe(catchError(err => of(err)));
  }
  getConfigDetails(): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/merchantGatewayConfig/list`);
  }
  gatewayConfigById(id: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/merchantGatewayConfig/${id}`)
  }
  updateDetailsbyId(body: any, id: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/merchantGatewayConfig/${id}/update`, body).pipe(catchError(err => of(err)));
  }

  //master Merchants users
  getpgUsersDetails(): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/merchant/list`)
  }
  createpgUser(body: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/merchant/create`, body).pipe(catchError(err => of(err)));
  }
  updatepgUser(body: any, id: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/merchant/${id}/update`, body).pipe(catchError(err => of(err)));
  }

  //merchant services
  addServToMer(body: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/mService/create`, body).pipe(catchError(err => of(err)));
  }
  getServofMer(): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/mService/list`);
  }
  getServofMerbyId(id: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/mService/${id}`);
  }
  updateServFrmMer(body: any, id: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/mService/${id}/update`, body).pipe(catchError(err => of(err)));
  }
  removeServFrmMer(id: any): Observable<any> {
    return this.http.delete(`${environment.gateway_URL}/mService/${id}/delete`).pipe(catchError(err => of(err)));
  }

  //gateway users
  creategatewayUser(body: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/gatewayUsers/create`, body).pipe(catchError(err => of(err)))
  }
  getGatewayUser(): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/gatewayUsers/list`).pipe(catchError(err => of(err)))
  }
  getGatewayUserbyID(id: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/gatewayUsers/${id}`).pipe(catchError(err => of(err)))
  }
  delGatewayUserbyID(id: any): Observable<any> {
    return this.http.delete(`${environment.gateway_URL}/gatewayUsers/${id}/delete`).pipe(catchError(err => of(err)))
  }
  updateGatewayUserByID(body: any, id: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/gatewayUsers/${id}/update`, body).pipe(catchError(err => of(err)))
  }

  //submerchants
  createSubMerchant(body: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/mSubMerchant/create`, body).pipe(catchError(err => of(err)))
  }
  getSubMerchant(): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/mSubMerchant/list`).pipe(catchError(err => of(err)))
  }
  getSubMerchantbyID(id: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/mSubMerchant/${id}`).pipe(catchError(err => of(err)))
  }
  delSubMerchant(id: any): Observable<any> {
    return this.http.delete(`${environment.gateway_URL}/mSubMerchant/${id}/delete`).pipe(catchError(err => of(err)))
  }
  updateSubMerchantByID(body: any, id: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/mSubMerchant/${id}/update`, body).pipe(catchError(err => of(err)))
  }

  //fee master
  createFee(body: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/feeMaster/create`, body).pipe(catchError(err => of(err)))
  }
  getFee(): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/feeMaster/list`).pipe(catchError(err => of(err)))
  }
  getFeebyId(id: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/feeMaster/${id}`).pipe(catchError(err => of(err)))
  }
  updateFee(body: any, id: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/feeMaster/${id}/update`, body).pipe(catchError(err => of(err)))
  }
  removeFee(id: any): Observable<any> {
    return this.http.delete(`${environment.gateway_URL}/feeMaster/${id}/delete`).pipe(catchError(err => of(err)))
  }

  //transactions
  getTransactions(): Observable<any> {
    return this.http.get(`https://gatewaydev.payrow.ae/gateway/payrow/paymentdetails`).pipe(catchError(err => of(err)))
  }
}
