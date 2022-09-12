import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CONFIG } from 'src/assets/config';
import User from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private LOGIN_URL: string = CONFIG.LOGIN_URL;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    console.log(user);

    return this.http.post<any>(this.LOGIN_URL, user).pipe(
      tap(() => {
        this.log(`user ${user.username} authenticated!`);
      }),
      catchError(this.handleError<any>('loginUser'))
    );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  
  private log(message: string) {
    console.log(`Login Service: ${message}`);
  }
}
