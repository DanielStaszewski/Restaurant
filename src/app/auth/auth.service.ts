import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { User } from 'src/models/user.model';


interface ResponseData {
  id: string,
  username: string,
  email: string,
  token: string,
  expiresIn: string
}

const API_REGISTER_URL = 'http://localhost:3000/auth/register';
const API_LOGIN_URL = 'http://localhost:3000/auth/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  register(username: string, email: string, password: string){
    return this.http.post<ResponseData>(
      API_REGISTER_URL,
      { username, email, password }
    ).pipe(
      delay(1000),
      catchError(this.handleError),
      tap((res)=> console.log(res))
    )
  }

  login(email: string, password: string) {
    return this.http.post<ResponseData>(
      API_LOGIN_URL,
      { email, password }
    ).pipe(
      delay(1000),
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.id, resData.username, resData.email, resData.token, +resData.expiresIn);
      })
    )
  }

  autoLogin(): void{
    const userData: {
      id: string;
      username: string;
      email: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(userData.id, userData.username, userData.email, userData._token, userData._tokenExpirationDate);
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(): void{
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout( () => {
      this.logout();
    } , expirationDuration);
  }

  private handleAuthentication(id: string, username: string, email: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(id, username, email, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    let errorMessage = 'An unknown error occurred!';
    if (!error.error) {
      return throwError(error);
    }
    switch (error.error) {
      case 'Username or password is incorrect':
        errorMessage = 'Check that you have the right email address or password';
        break;
      case 'Email already exist':
        errorMessage = 'Email is already exist!';
        break;
      case 'Username already exist':
        errorMessage = 'Username is already exist!';
        break;
    }
    return throwError(errorMessage);
  }

}
