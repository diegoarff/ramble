import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { from, lastValueFrom } from 'rxjs';
import { Preferences } from '@capacitor/preferences';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  private authEndpoints = ['/tweets', '/users']; // Add more endpoints as needed

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    if (this.requiresAuthorization(req.url)) {
      const { value } = await Preferences.get({ key: 'token' });

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${value}`,
        },
      });
    }

    return await lastValueFrom(next.handle(req));
  }

  private requiresAuthorization(url: string): boolean {
    // Check if the URL contains any of the auth endpoints
    return this.authEndpoints.some((endpoint) => url.includes(endpoint));
  }
}
