import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { CONFIG } from 'src/assets/config';
import { HttpClient } from '@angular/common/http';
import Driver from '../models/driver';

@Injectable({
  providedIn: 'root',
})
export class DriversService {
  private DRIVERS_URL = CONFIG.DRIVERS_URL;

  constructor(private http: HttpClient) {}

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.DRIVERS_URL).pipe(
      tap((_) => this.log('get drivers successfull!')),
      catchError(this.handleError<Driver[]>('getDrivers', []))
    );
  }

  updateDriver(driver: Driver): Observable<any> {
    return this.http.put(this.DRIVERS_URL, driver).pipe(
      tap((_) => this.log(`updated drivers}`)),
      catchError(this.handleError<any>('updateDriver'))
    );
  }

  createDriver(driver: Driver): Observable<any> {
    return this.http.post<Driver>(this.DRIVERS_URL, driver).pipe(
        tap(() => this.log(`new driver added`)),
        catchError(this.handleError<any>('createDriver'))
      );
  }

  deleteDriver(driver: Driver): Observable<any> {
    return this.http.delete<Driver>(`${this.DRIVERS_URL}/${driver.nif}`).pipe(
        tap(() => this.log(`driver deleted`)),
        catchError(this.handleError<any>('deleteDriver'))
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
    console.log(`Driver Service: ${message}`);
  }
}
