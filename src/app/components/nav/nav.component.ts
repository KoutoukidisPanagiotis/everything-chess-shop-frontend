import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  username: string;
  role: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.jwtService.getUsername().subscribe((username) => {
        this.username = username;
        console.log(this.username);
      });

      this.jwtService.getRole().subscribe((role) => {
        this.role = role;
        console.log(this.role);
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
