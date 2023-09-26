import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { values } from 'lodash';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(private http: HttpClient) { }
  createDistributorBasic(body: any): Observable<any> {
    return this.http.post(`${environment.Admin_URL}/createDistributor/newDistributor`, body);
  }
  getAllDistributors(): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/createDistributor/getAllDistributors`)
  }
  updateDistributor(body: any, id: any): Observable<any> {
    return this.http.put(`${environment.Admin_URL}/createDistributor/updateDistributor/${id}`, body)
  }
  addSalesPerson(body: any, id: any): Observable<any> {
    return this.http.put(`${environment.Admin_URL}/createDistributor/addSalePerson/${id}`, body)
  }
  addGroupId(body: any): Observable<any> {
    return this.http.post(`${environment.Admin_URL}/ca/group/creation`, body)
  }
  getGroupIds():Observable<any>{
    return this.http.get(`${environment.Admin_URL}/ca/group`)
  }
}
