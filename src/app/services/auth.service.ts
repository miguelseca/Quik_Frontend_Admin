import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { CONFIG  } from 'src/assets/config';
import User from '../models/user';


const AUTH_API = CONFIG.LOGIN_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user : User): Observable<any> {
    return this.http.post(AUTH_API , user, httpOptions);
  }

  }
