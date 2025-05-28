import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ){}

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  public loginForm: any;
  credentials = { username: '', password: '' };
  errorMessage = '';
  loading = false;
  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';
    this.authService.logout(); //Nos aseguramos que no existan más de un token o username en localstore
    this.authService.login(this.credentials)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: () => {
            this.loading = false;
            this.router.navigate(['/perfil', localStorage.getItem('username')]);
        },
      error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Credenciales inválidas';
      }
    });
  }
  public IrARegister(event: Event){
    event.preventDefault()
    this.router.navigate(['/register']);
  }

}
