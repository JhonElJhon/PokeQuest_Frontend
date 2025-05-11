import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ){}
  loading = false;
  userData = { avatar: 0, username: '', email: '', password: '', confirmPassword: '' };
  errorMessage = '';

  onSubmit(): void {
    if (this.userData.password !== this.userData.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.authService.register({
      avatar: this.userData.avatar,
      username: this.userData.username,
      email: this.userData.email,
      password: this.userData.password,
    }).subscribe({
      next: () => {
            this.loading = false;
            this.router.navigate(['/user']);
        },
      error: (err) => {
            this.loading = false;
            this.errorMessage = err.error?.message || 'Error en el registro';
        }
    });
  }

  public IrAUser(event: Event){
    event.preventDefault()
    this.router.navigate(['/user']);
  }
}
