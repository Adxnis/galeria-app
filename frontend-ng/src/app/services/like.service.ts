import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(protected http: HttpClient) { }

  all(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/like`);
  }
  create(data: any): Observable<any> {
    return this.http.post(`${environment.api}/like`, data);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.api}/like/${id}`);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.api}/like/${id}`, data);
  }
  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/like/${id}`);
  }

}
