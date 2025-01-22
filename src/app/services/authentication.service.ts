import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthInput, AuthOutput } from './authentication.service.d';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl = 'https://challenge-ionic-api.onrender.com';
  constructor(private http: HttpClient) {}

  auth({ email, password }: AuthInput): Observable<AuthOutput> {
    return this.http.post<AuthOutput>(`${this.baseUrl}/session`, {
      email,
      password,
    });
  }
}
