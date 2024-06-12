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
    this.jwtService.getUsername().subscribe((username) => {
      this.username = username;
    });
    this.jwtService.getRole().subscribe((role) => {
      this.role = role;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}


