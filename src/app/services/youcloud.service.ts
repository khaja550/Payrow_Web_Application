import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseApi = 'http://5.32.59.227:8083/admin';
@Injectable({
  providedIn: 'root'
})
export class YoucloudService {

  constructor(private http: HttpClient) { }
  registerMerchant(body: any): Observable<any> {
    return this.http.put(`${baseApi}/merchant/register`, body)
  }
}
