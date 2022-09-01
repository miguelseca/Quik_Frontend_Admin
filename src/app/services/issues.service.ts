// import { Injectable } from '@angular/core';
// import { catchError, Observable, of, tap } from 'rxjs';
// import { CONFIG } from 'src/assets/config';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import Carga from '../models/Carga';

// @Injectable({
//   providedIn: 'root',
// })
// export class CargasService {
//   private cargasURL = CONFIG.cargasURL;

//   private token: string = localStorage.getItem("token")!.slice(1,-1);

//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${this.token}`,
//     }),
//   };

//   constructor(private http: HttpClient) {}

//   getCargas(): Observable<Carga[]> {
//     return this.http.get<Carga[]>(this.cargasURL, this.httpOptions).pipe(
//       tap((_) => this.log('get cargas successfull!')),
//       catchError(this.handleError<Carga[]>('getCargas', []))
//       );
//     }

//     updateCarga(carga: Carga): Observable<any> {
//       return this.http.put(this.cargasURL, carga, this.httpOptions).pipe(
//         tap((_) => this.log(`updated carga AWB=${carga.AWB}`)),
//       catchError(this.handleError<any>('updateCarga'))
//     );
//   }

//   addCarga(carga: Carga): Observable<any> {
//     return this.http.post<Carga>(this.cargasURL, carga, this.httpOptions).pipe(
//       tap(() => this.log(`new carga added AWB=${carga.AWB}`)),
//       catchError(this.handleError<any>('addCarga'))
//     );
//   }

//   private handleError<T>(operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {
//       // TODO: send the error to remote logging infrastructure
//       console.error(error); // log to console instead

//       // TODO: better job of transforming error for user consumption
//       this.log(`${operation} failed: ${error.message}`);

//       // Let the app keep running by returning an empty result.
//       return of(result as T);
//     };
//   }

//   private log(message: string) {
//     console.log(`Cargas Service: ${message}`);
//   }
// }