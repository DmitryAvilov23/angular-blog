import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

import { ILoginData, IUser } from './../models/interfaces';

@Injectable()
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  private get token(): string | null {
    const currentDate = new Date();
    const expDate = new Date(localStorage.getItem('fb-token-exp')!);

    if (currentDate > expDate) {
      this.signOut();

      return null;
    }

    return localStorage.getItem('fb-token')!;
  }

  constructor(private _httpClient: HttpClient) {}

  signInWithEmailAndPassword(data: ILoginData): Observable<any> {
    return this._httpClient
      .post<IUser>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        data
      )
      .pipe(
        tap(this.toggleToken),
        catchError(this.handleAuthErrors.bind(this))
      );
  }

  signOut() {
    this.toggleToken(null);
  }

  isUserAuthenticated(): boolean {
    return !!this.token;
  }

  private handleAuthErrors(error: HttpErrorResponse): Observable<never> {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Such email does not exist');
        break;
    }

    return throwError(error);
  }

  private toggleToken(user: IUser | null) {
    if (user) {
      const expDate: Date = new Date(
        new Date().getTime() + +user?.expiresIn * 1000
      );

      localStorage.setItem('fb-token', user?.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());

      return;
    }

    localStorage.removeItem('fb-token');
    localStorage.removeItem('fb-token-exp');
  }
}
