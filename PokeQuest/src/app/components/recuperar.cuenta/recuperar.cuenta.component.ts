import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperar.cuenta',
  imports: [FormsModule, CommonModule],
  templateUrl: './recuperar.cuenta.component.html',
  styleUrl: './recuperar.cuenta.component.css'
})
export class RecuperarCuentaComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  loading = false;
  userData = {verify: '', email: '', password: '', confirmPassword: '' };
  errorMessage = '';

  sendEmail(): void{
    this.http.post('https://pokequestapi.onrender.com/email/sendEmail', {
      to: this.userData.email,
    }).subscribe({
      next: () => {
        console.log("email enviado")
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  onSubmit(): void {
    if (this.userData.password !== this.userData.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.http.post('https://pokequestapi.onrender.com/email/verify', {
      correo: this.userData.email,
      verificacion: this.userData.verify,
      password: this.userData.password
    }).subscribe({
      next: () => {
        console.log("verificado")
        this.loading = false;
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.log(err);
      }
    });
    
  }

  public IrAUser(event: Event){
    event.preventDefault()
    this.router.navigate(['/user']);
  }
}
