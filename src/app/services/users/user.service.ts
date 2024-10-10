import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../../models/users/user.model'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlGetUserToken = 'http://localhost:8000/api-user-login/';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrlGetUserToken, user);
  }

  setLoggedInUser(userData: any): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getLoggedInUser(): any {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  }

  logout(): void {
    localStorage.removeItem('userData');
  }
}
