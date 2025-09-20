
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AllOrdersService {
  private cookies=inject(CookieService)
  private http=inject(HttpClient)
  getAllOrders():Observable<any>{
    return this.http.get(`${environment.baseUrl}orders/`)
  }
  getOredersUser(id:string|null):Observable<any>{
    return this.http.get(`${environment.baseUrl}/user/${id}`)
  }
}
