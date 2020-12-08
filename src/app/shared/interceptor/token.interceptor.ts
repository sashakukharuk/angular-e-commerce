import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../service/auth.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }
   static handleAuthError(error: HttpErrorResponse): Observable<any> {
    return throwError(error);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (token) {
      req = req.clone({
       setHeaders: {
         Authorization: token
       }
     });
   }
    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => TokenInterceptor.handleAuthError(error)
      )
    );
  }
}
