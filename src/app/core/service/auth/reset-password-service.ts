import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { IForgetPassword, IPassword, IResetPassword } from '../../interface/auth/ipassword';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class resetPasswordService {
  private http =inject(HttpClient)

  forgetPassword(payload:IForgetPassword):Observable<any>{
    return this.http.post(`${environment.baseUrl}auth/forgotPasswords`, payload)
  }

  resetCode(payload:IResetPassword):Observable<any>{
    return this.http.post(`${environment.baseUrl}auth/verifyResetCode`,payload)
  }

  resetPassword(payload:IPassword):Observable<any>{
    return this.http.put(`${environment.baseUrl}auth/resetPassword`,payload)
  }
}
