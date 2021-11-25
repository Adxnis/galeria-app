import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) { }

  authenticated = false;

  login(data: any): Observable<any> {
    return this.http.post(`${environment.api}/login`,data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${environment.api}/register`, data);
  }

  user(): Observable<User> {
    return this.http.get<User>(`${environment.api}/user`);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.api}/logout`,{});
  }

  updateInfo(data): Observable<User> {
    return this.http.put<User>(`${environment.api}/updateInfo`, data);
  }
  // public isAuthenticated():void {
  //   let test = this.http.get(`${environment.api}/user`, {withCredentials: true})
  //   console.log(test);
  // }
}
