import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(protected http: HttpClient) {}

  add(data: any): Observable<any> {
    return this.http.post(`${environment}/tag`, data);
  }
}
