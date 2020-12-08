import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }
  register(user: Auth): Observable<Auth> {
    return this.http.post<Auth>('api/auth/register', user);
  }
  login(user: Auth): Observable<{token: string}> {
    return this.http.post<{token: string}>('./api/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
          }
        )
      );
  }
  getToken(): string {
    return localStorage.getItem('auth-token');
  }
  logout(): void {
    localStorage.clear();
  }
}
