import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class SharedAlbumService {

  
  constructor(protected http: HttpClient) { }

  all(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/shared`)
  }

  // albums(): Observable<any[]> {
  //   return this.http.get<any[]>(`${environment.api}/userAlbums`)
  // }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.api}/shared`, data);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.api}/shared/${id}`);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.api}/shared/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/shared/${id}`);
  }

}
