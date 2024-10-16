import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.has('skip-auth')) {
      // Remove the header before sending the request
      const modifiedReq = req.clone({
        headers: req.headers.delete('skip-auth'),
      });
      return next.handle(modifiedReq); // Skip interceptor processing
    }

    // Get the value from local storage
    const userData = localStorage.getItem('userData');

    if (userData) {
      // Parse the string into an object
      const parsedData = JSON.parse(userData);

      // Access the token
      const token = parsedData.token;
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Token ${token}`),
      });
      return next.handle(clonedReq);
    } else {
      console.log('there is no userData from localstorage');
    }

    return (
      next
        .handle(req)
        // this pipe here is handling the authentication
        .pipe(
          catchError((err) => {
            if (err.status === 403) {
              this.router.navigate(['/']);
            }
            return throwError(() => err);
          })
        )
    );
  }
}
