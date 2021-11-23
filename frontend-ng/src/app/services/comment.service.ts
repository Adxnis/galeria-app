import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(protected http: HttpClient) { }

  all(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.api}/comment`);
  }
  create(data: any): Observable<any> {
    return this.http.post(`${environment.api}/comment`, data);
  }

  get(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${environment.api}/comment/${id}`);
  }

  update(id: number, data: any): Observable<Comment> {
    return this.http.put<Comment>(`${environment.api}/comment/${id}`, data);
  }
  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/comment/${id}`);
  }

  getCommentsFromPhoto(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.api}/getCommentsFromPhoto/${id}`);
  }
}
