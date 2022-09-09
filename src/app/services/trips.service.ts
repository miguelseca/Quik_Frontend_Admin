import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { CONFIG } from 'src/assets/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import Trip from '../models/trip';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private TRIPS_URL = CONFIG.TRIPS_URL;

  // private token: string = localStorage.getItem('token')!.slice(1, -1);
  private token: string = this.tokenStorage.getToken()!.slice(1,-1);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService) {}

  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.TRIPS_URL, this.httpOptions).pipe(
      tap((_) => this.log('get trips successfull!')),
      catchError(this.handleError<Trip[]>('getAllTrips', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`Trip Service: ${message}`);
  }
}
