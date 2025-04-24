import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Subject, takeUntil } from 'rxjs';
import { IPokemon } from '../../interfaces/pokemon.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  imports: [FormsModule, CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {
  constructor(
    private route: ActivatedRoute,
    private PokemonService: PokemonService
  ) {}
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pokemonName = params['nombre'];
      this.CargarDetalles(pokemonName);
    });
  }

  public pokemon: IPokemon = {
    abilities: [],
    base_experience: 0,
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: '',
    moves: [],
    name: '',
    order: 0,
    past_types: [],
    species: {
        name: '',
        url: ''
    },
    sprites: {
      back_default: '',
      back_gray: '',
      front_default: '',
      front_gray: ''
  },
    stats: [],
    types: [],
    weight: 0
  }

  CargarDetalles(pokemon: string){
    console.log(pokemon)
    this.PokemonService.searchByName(pokemon)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
          res => {
            this.pokemon = res;
              },
          error => {
              console.log(error);
          }
      );
  }
}
