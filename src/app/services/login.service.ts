// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';
// import { CONFIG } from 'src/assets/config';


// @Injectable({
//   providedIn: 'root',
// })
// export class LoginService {
//   loginURL: string = CONFIG.loginURL;

//   constructor(private http: HttpClient) {}

//   login(user: User): Observable<any> {
//     console.log(user);

//     return this.http.post<any>(this.loginURL, user).pipe(
//       tap(() => {
//         this.log(`user ${user.username} authenticated!`);
//       }),

//       catchError(this.handleError<any>('loginUser'))
//     );
//   }

//   private handleError<T>(operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {
//       this.log(error);
//       this.log(`${operation} failed: ${error.message}`);
//       return of(result as T);
//     };
//   }
//   private log(message: string) {
//     console.log(`Login Service: ${message}`);
//   }
// }