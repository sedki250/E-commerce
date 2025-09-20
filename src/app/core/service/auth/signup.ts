import { Iregestar } from './../../interface/auth/iregestar';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class signUpService {
  private http=inject(HttpClient)

  registsarData(payload: Iregestar |any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}auth/signup`, payload);
  }
}
