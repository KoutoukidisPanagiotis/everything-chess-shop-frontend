import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { LoginDto } from '../models/login-dto';
import {tap } from 'rxjs/operators';
import { UserDto } from '../models/user-dto';
import { JwtService } from './jwt.service';
import { CartService } from './cart.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login';

  private registerUrl = 'http://localhost:8080/auth/signup';

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.authStatus.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtService, private cartService: CartService) {}

  login(user: LoginDto): Observable<any> {
    return this.http.post<any>(this.loginUrl, user).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
         this.jwtService.getUsername();
         this.jwtService.getRole();
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getJwtToken(): string {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.cartService.clearCart();
    this.jwtService.clearUsername();
    this.jwtService.clearRole();
  }

  register(user: UserDto) {
    return this.http.post(this.registerUrl, user);
  }
}
