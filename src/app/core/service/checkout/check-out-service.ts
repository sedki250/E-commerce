import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  constructor(private http:HttpClient,private cookies:CookieService){}

  checkOutSession(shoppingAdress:any,cardId:string|null):Observable<any>{
    return this.http.post(`${environment.baseUrl}orders/checkout-session/${cardId}?url=http://localhost:4200`,
      {
        shippingAddress:shoppingAdress
      }
    
    
    ,{
      headers:{token:this.cookies.get('token')}
    })  
  }
  payNow(shoppingAdress:any,cartId:string):Observable<any>{
    return this.http.post(`${environment.baseUrl}orders/${cartId}`,
      {
        shippingAddress:shoppingAdress
      }
    
    
    ,{
      headers:{token:this.cookies.get('token')}
    })  
  }
}
