import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const API_KEY = '123456';
    return next.handle(httpRequest.clone({ setHeaders: { API_KEY } }));
    //return next.handle(httpRequest);
  }
}
