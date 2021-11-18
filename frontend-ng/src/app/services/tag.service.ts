import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag } from '../interfaces/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(protected http: HttpClient) {}

  
  all(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.api}/tag`)
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.api}/tag`, data);
  }

  get(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${environment.api}/tag/${id}`);
  }

  update(id: number, data: any): Observable<Tag> {
    return this.http.put<Tag>(`${environment.api}/tag/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/tag/${id}`);
  }
}
