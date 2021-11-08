import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) { }

  authenticated = false;

  login(data): Observable<any> {
    return this.http.post(`${environment.api}/login`,data);
  }

  register(data): Observable<any> {
    return this.http.post(`${environment.api}/register`, data);
  }

  user(): Observable<any> {
    return this.http.get(`${environment.api}/user`);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.api}/logout`,{});
  }

  // public isAuthenticated():void {
  //   let test = this.http.get(`${environment.api}/user`, {withCredentials: true})
  //   console.log(test);
  // }
}
