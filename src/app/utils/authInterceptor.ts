import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the value from local storage
    const userData = localStorage.getItem('userData');

    // Parse the string into an object
    const parsedData = JSON.parse(userData);

    // Access the token
    const token = parsedData.token;


    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Token ${token}`),
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
