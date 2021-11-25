import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(protected http: HttpClient) { }

  getUserPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${environment.api}/userPhotos`)
  }
  
  create(data: any): Observable<any> {
    return this.http.post(`${environment.api}/photo`, data)
  }

  get(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${environment.api}/photo/${id}`);
  }

  update(id: number, data: any): Observable<Photo> {
    return this.http.put<Photo>(`${environment.api}/photo/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/photo/${id}`);
  }

  searchByTags(tag: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${environment.api}/searchByTags/${tag}`);
  }
}
