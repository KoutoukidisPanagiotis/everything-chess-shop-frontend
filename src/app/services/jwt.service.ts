import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private roleSubject = new BehaviorSubject<string | null>(null);

  username$ = this.usernameSubject.asObservable();
  role$ = this.roleSubject.asObservable();

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  getUsername(): Observable<string | null> {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.decodeToken(token);
      this.usernameSubject.next(decoded ? decoded.sub : null);
    } else {
      this.usernameSubject.next(null);
    }
    return this.username$;
  }

  getRole(): Observable<string | null> {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.decodeToken(token);
      this.roleSubject.next(decoded ? decoded.role : null);
    } else {
      this.roleSubject.next(null);
    }
    return this.role$;
  }

  clearUsername() {
    this.usernameSubject.next(null);
  }

  clearRole() {
    this.roleSubject.next(null);
  }
}
