import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) { }

  all(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api}/getUsers`)
  }

  // create(data: any): Observable<any> {
  //   return this.http.post(`${environment.api}/tag`, data);
  // }

  get(id: number): Observable<User> {
    return this.http.get<User>(`${environment.api}/getUser/${id}`);
  }

  // update(id: number, data: any): Observable<Tag> {
  //   return this.http.put<Tag>(`${environment.api}/tag/${id}`, data);
  // }

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${environment.api}/tag/${id}`);
  // }
}
