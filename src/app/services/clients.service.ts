import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { CONFIG } from 'src/assets/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Client from '../models/client';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private GET_CLIENTS_URL = CONFIG.GET_CLIENTS_URL;
  private BAN_CLIENTS_URL = CONFIG.BAN_CLIENTS_URL;

  // private token: string = localStorage.getItem('token')!.slice(1, -1);
  private token: string = this.tokenStorage.getToken()!.slice(1,-1);
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
   ) {}

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.GET_CLIENTS_URL, this.httpOptions).pipe(
      tap((_) => this.log('get clients successfull!')),
      catchError(this.handleError<Client[]>('getClients', []))
    );
  }

  banClient(client: Client): Observable<any> {
    return this.http
      .put(`${this.BAN_CLIENTS_URL}/${client.email}`, this.httpOptions)
      .pipe(
        tap((_) => this.log(`banned client ${client.email}`)),
        catchError(this.handleError<any>('banClient'))
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
    console.log(`Clients Service: ${message}`);
  }
}
