import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-start.trivia',
  imports: [],
  templateUrl: './start.trivia.component.html',
  styleUrl: './start.trivia.component.css'
})
export class StartTriviaComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ){}
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  public userName = '';
  ngOnInit(): void {
    this.route.params.subscribe(params => {
          const UserName = params['nombre'];
          this.userName = UserName;
        });
  }
}
