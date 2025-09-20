import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  addToCart(productId: string) {
    throw new Error('Method not implemented.');
  }
  private http=inject(HttpClient)
  private cookies=inject(CookieService)
  cartNumber:BehaviorSubject<number>=new BehaviorSubject<number>(0)
  constructor(){
    this.getProductToCart().subscribe({
      next:(res)=>{
        this.cartNumber.next(res.numOfCartItems)
      }
    })
  }

  addProductToCart(productId:string):Observable<any>{
    return this.http.post(`${environment.baseUrl}cart`,
          {
            productId:productId
          },
          {
            headers:{token:this.cookies.get('token')}
          }
    )
  }
  updateProductToCart(count:number,productId:string):Observable<any>{
    return this.http.put(`${environment.baseUrl}cart/${productId}`,
          {
            count:count
          },
          {
            headers:{token:this.cookies.get('token')}
          }
    )
  }
  getProductToCart():Observable<any>{
    return this.http.get(`${environment.baseUrl}cart`,
          {
            headers:{token:this.cookies.get('token')}
          }
    )
  }
  deleteProductFromCart(productId:string):Observable<any>{
    return this.http.delete(`${environment.baseUrl}cart/${productId}`,
          {
            headers:{token:this.cookies.get('token')}
          }
    )
  }
  clearCart():Observable<any>{
    return this.http.delete(`${environment.baseUrl}cart`,
          {
            headers:{token:this.cookies.get('token')}
          }
    )
  }
}
