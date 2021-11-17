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

  addPhoto(data: any): Observable<any> {
    return this.http.post(`${environment.api}/photo`, data)
  }
}
