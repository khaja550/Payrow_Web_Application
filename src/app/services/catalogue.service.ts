import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseApi = 'http://localhost:3030/admin';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private http: HttpClient) {}

  list():Observable<any> {
    return this.http.get(`${baseApi}/catalogue/list`)
  }

  create(body:any):Observable<any> {
    return this.http.post(`${baseApi}/catalogue/create`, body)
  }

  update(_id:any,body:any):Observable<any> {
    return this.http.put(`${baseApi}/catalogue/${_id}/update`, body)
  }
}
