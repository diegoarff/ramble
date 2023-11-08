import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  private authEndpoints = ['/tweets', '/users']; // Add more endpoints as needed

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let clonedRequest = request;
    // Check if the request's URL contains one of the auth endpoints
    if (this.requiresAuthorization(request.url)) {

      // Obtener
      // Condicional para ver si se obtuvo bien
      
      // Replace with token from storage
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDk1YjYxMGZiY2YyODU5NTRkMWM1ZSIsInVzZXJuYW1lIjoicHdlcGVlZSIsImlhdCI6MTY5OTQwMDc5N30.HbcTQnL-t4s20V3F4wt33FSE6gNXskYiDl2qlwDRz1k'; 
      clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(clonedRequest);
  }

  private requiresAuthorization(url: string): boolean {
    // Check if the URL contains any of the auth endpoints
    return this.authEndpoints.some((endpoint) => url.includes(endpoint));
  }
}
