import { environment } from './../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private http = inject(HttpClient)

  getAllBrands():Observable<any>{
    return this.http.get(`${environment.baseUrl}brands`)
  } 
  getBrandDetails(data:string|null):Observable<any>{
    return this.http.get(`${environment.baseUrl}brands/${data}`)
  }

}
