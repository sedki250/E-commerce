import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getALLProducts():Observable<any>{
    return this.http.get(`${environment.baseUrl}products`);
  }
  getProductDetails(id:string|null):Observable<any>{
    return this['http'].get(`${environment.baseUrl}products/${id}`);
  }
}
