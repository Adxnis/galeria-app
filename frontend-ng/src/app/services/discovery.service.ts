import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {

  constructor(protected http: HttpClient) { }

  public all(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${environment.api}/getPublicPhotos`);
  }
}
