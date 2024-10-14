import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User } from '../../models/users/user.model'
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

  displayTest(item: string){
    console.log(item)
  }

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrlGetUserToken, user, {
      headers: {'skip-auth': 'true'}
    });
  }

  setLoggedInUser(userData: any): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  isAuthenticated(): Observable<boolean> {
    const response = this.http.get<any>(this.apiUrlVerifyToken)
    response.subscribe({
      next: (response) => {
        this.isLoggedIn = response.valid;
      },
      error: (error) => {
        console.error('error fetching', error);
        this.isLoggedIn = false
      },
    })
    console.log('ito ilay isLoggedIn', this.isLoggedIn)
    return of(this.isLoggedIn)
  }

  logout(): void {
    localStorage.removeItem('userData');
  }
}



