import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ILogin } from './../../interface/auth/ilogin';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userData:BehaviorSubject<null | JwtPayload>=new BehaviorSubject<null | JwtPayload>(null)
  constructor(@Inject(PLATFORM_ID)private id:object){
    if(this.cookies.get('token')){
        this.setToken()
      }
  }
  cookies=inject(CookieService)
  private router=inject(Router)
  private http=inject(HttpClient)
  loginData(payload: ILogin |any):Observable<any>{
  return this.http.post(`${environment.baseUrl}auth/signin`, payload);
  }

  setToken(){
    
    const token=this.cookies.get('token')
    const decoded = jwtDecode(token);
    this.userData.next(decoded)
    
  }
  
  logOut(){
    this.cookies.delete('token');
    this.userData.next(null);
    this.router.navigate(['/login'])
  }
}
