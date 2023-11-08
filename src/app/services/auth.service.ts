import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ISignupResponse, ISigninResponse } from '../interfaces/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:3000/auth';

  signup(user: FormData): Observable<ISignupResponse> {
    return this.http.post<ISignupResponse>(`${this.baseUrl}/signup`, user);
  }

  signin(user: FormData): Observable<ISigninResponse> {
    return this.http.post<ISigninResponse>(`${this.baseUrl}/signin`, user);
  }
}
