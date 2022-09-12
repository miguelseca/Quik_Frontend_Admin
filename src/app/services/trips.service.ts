import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { CONFIG } from 'src/assets/config';
import { HttpClient } from '@angular/common/http';
import Trip from '../models/trip';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private TRIPS_URL = CONFIG.TRIPS_URL;

  constructor(private http: HttpClient) {}

  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.TRIPS_URL).pipe(
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