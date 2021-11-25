import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(protected http: HttpClient) { }

  
  all(): Observable<Album[]> {
    return this.http.get<Album[]>(`${environment.api}/album`);
  }

  albums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${environment.api}/userAlbums`);
  }

  sharedAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${environment.api}/sharedAlbums`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.api}/album`, data);
  }

  get(id: number): Observable<Album> {
    return this.http.get<Album>(`${environment.api}/album/${id}`);
  }

  update(id: number, data: any): Observable<Album> {
    return this.http.put<Album>(`${environment.api}/album/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/album/${id}`);
  }



  
}
