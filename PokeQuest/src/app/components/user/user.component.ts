import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}
  public IrARegister(event: Event){
    event.preventDefault()
    this.router.navigate(['/register']);
  }
}
