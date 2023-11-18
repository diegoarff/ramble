import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  private excludedEndpointsPattern = /\/(users|tweets)\/\w+\/(follow|like)/;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Check if the request has 'page' or 'date' in query params
    // or if the request is to follow a user or like a tweet
    if (
      request.params.has('page') ||
      request.params.has('date') ||
      this.excludedEndpointsPattern.test(request.url)
    ) {
      // If any condition is met, pass the request without showing loading
      return next.handle(request);
    }

    // Show loading component
    const loading = this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 10000, // Set a maximum duration for the loading component
    });
    loading.then((loader) => loader.present());

    // Intercept the request and handle response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Dismiss loading on error
        loading.then((loader) => loader.dismiss());

        // Display toast for error
        const toast = this.toastCtrl.create({
          message: error.error.message || 'An error occurred',
          duration: 2500,
          color: 'danger',
          position: 'bottom',
          icon: 'close-circle-outline',
        });
        toast.then((t) => t.present());

        throw error;
      }),
      finalize(() => {
        // Dismiss loading after the response is received
        loading.then((loader) => loader.dismiss());
      })
    );
  }
}
