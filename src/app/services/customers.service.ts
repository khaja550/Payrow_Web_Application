import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseApi = 'http://localhost:3031/api';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  getTopCustDetailsbyDid(did: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/topCustomer/topCustomer/${id}/${did}`)
  }
  getLowCustDetailsbyDid(did: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/lowCustomer/lowCustomers/${id}/${did}`)
  }
  getHighCustDetailsbyDid(did: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/highConsumption/highCustomers/${did}`)
  }
  getTopCustDetails(id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/topCustomer/topCustomer/${id}`)
  }
  getLowCustDetails(id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/lowCustomer/lowCustomers/${id}`)
  }
  getHighCustDetails(): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/highConsumption/highCustomers`)
  }
  sendMail():Observable<any>{
    return this.http.get(`${environment.Admin_URL}/topCustomer/sendMail`)
  }
}
