import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    let token = this.authService.getToken();
    if (token && !this.authService.isTokenExpired(token)) {
      return true;
    }
    
    this.router.navigate(['/user']);
    return false;
  }
}