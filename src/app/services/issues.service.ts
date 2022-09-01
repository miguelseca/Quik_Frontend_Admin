import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { CONFIG } from 'src/assets/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Issue from '../models/issue';

@Injectable({
  providedIn: 'root',
})
export class CargasService {
  private ISSUES_URL = CONFIG.ISSUES_URL;

  private token: string = localStorage.getItem('token')!.slice(1, -1);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.ISSUES_URL, this.httpOptions).pipe(
      tap((_) => this.log('get isssues successfull!')),
      catchError(this.handleError<Issue[]>('getAllIssues', []))
    );
  }

  updateIssue(issue: Issue): Observable<any> {
    return this.http.put(this.ISSUES_URL, issue, this.httpOptions).pipe(
      tap((_) => this.log(`updated issue`)),
      catchError(this.handleError<any>('updateIssue'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`Cargas Service: ${message}`);
  }
}
