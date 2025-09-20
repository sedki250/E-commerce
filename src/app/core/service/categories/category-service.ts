import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private http=inject(HttpClient)
getAllCategories():Observable<any>{
return this.http.get(`${environment.baseUrl}categories`)
}
}
