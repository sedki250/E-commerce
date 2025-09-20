import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

constructor(private http: HttpClient, private cookies: CookieService) {}

  addToWishlist(productId: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}wishlist`,
      { productId: productId },
      { headers: { token: this.cookies.get('token') } }
    );
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}wishlist/${productId}`, {
      headers: { token: this.cookies.get('token') }
    });
  }

  getLogedUserWishlist(): Observable<any> {
    return this.http.get(`${environment.baseUrl}wishlist`, {
      headers: { token: this.cookies.get('token') }
    });
  }

 getProductById(productId: string): Observable<any> {
  return this.http.get(`${environment.baseUrl}products/${productId}`);
}
   clearWishlist():Observable<any>{
    return this.http.post(`${environment.baseUrl}wishlist`,
      {
        headers:{token:this.cookies.get('token')}
      }
    )
  }
}
