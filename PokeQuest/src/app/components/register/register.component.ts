import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}

  public IrAUser(event: Event){
    event.preventDefault()
    this.router.navigate(['/user']);
  }
}
