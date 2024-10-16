import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User, VerifyTokenResponse } from '../../models/users/user.model'
import { map, catchError } from 'rxjs/operators';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn: boolean;
  private apiUrlGetUserToken = 'http://localhost:8000/api-user-login/';
  private apiUrlVerifyToken = 'http://localhost:8000/api-verify-token/';
  // this is the interface to get from the 

 constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrlGetUserToken, user, {
      headers: {'skip-auth': 'true'}
    });
  }

  setLoggedInUser(userData: any): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  // not needed for now
  getUserInfo(): Observable<VerifyTokenResponse> {
    return this.http.get<VerifyTokenResponse>(this.apiUrlVerifyToken).pipe(
      catchError((error) => {
        console.error('error fetching', error);
        return of({ valid: false, user_id: 0, username: '', is_superuser: false }); // Return a default value on error
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userData');
  }
}



