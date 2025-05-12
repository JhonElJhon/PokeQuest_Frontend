import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trivias',
  imports: [],
  templateUrl: './trivias.home.component.html',
  styleUrl: './trivias.home.component.css'
})
export class TriviasHomeComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}
public userName = '';
  ngOnInit(): void {
    this.route.params.subscribe(params => {
          const UserName = params['nombre'];
          this.userName = UserName;
        });
  }

  public IrAHome(event: Event){
    event.preventDefault()
    this.router.navigate(['']);
  }
  public IrAPerfil(event: Event){
    event.preventDefault()
    this.router.navigate(['/perfil', this.userName]);
  }
}
