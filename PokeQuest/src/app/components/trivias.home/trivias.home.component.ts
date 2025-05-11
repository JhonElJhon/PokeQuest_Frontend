import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trivias',
  imports: [],
  templateUrl: './trivias.home.component.html',
  styleUrl: './trivias.home.component.css'
})
export class TriviasHomeComponent {
  constructor(
    private router: Router
  ){}

  public IrAHome(event: Event){
    event.preventDefault()
    this.router.navigate(['']);
  }
  public IrAPerfil(event: Event){
    event.preventDefault()
    this.router.navigate(['/perfil']);
  }
}
