import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Subject, takeUntil } from 'rxjs';
import { IPokemon } from '../../interfaces/pokemon.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAbilitiy } from '../../interfaces/ability.interface';
import { IMove } from '../../interfaces/move.interface';
import { IEvolutionChain } from '../../interfaces/evolution_chain.interface';
import { ISpecie } from '../../interfaces/specie.interface';
import { IChain } from '../../interfaces/chain.interface';

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
  public ability: IAbilitiy = {
      id: 0,
      name: '',
      is_main_series: false,
      generation: {
        name: '',
        url: ''
      },
      names: [],
      effect_entries: [],
      effect_changes: [],
      flavor_text_entries: [],
      pokemon: [],
  }

  public move: IMove = {
    accuracy: 0,
    //contest_combos: { normal: { use_after: INameAndUrl[], use_before: INameAndUrl[]}, super: { use_after: INameAndUrl[], use_before: INameAndUrl[]}}
    id: 0,
    name: "",
    names: []
  }

  public specie: ISpecie = {
    id: 0,
    name: "",
    evolution_chain: { url: "" }
  }
  public evolutionChain: IEvolutionChain = {
    id:0,
    chain: {
      evolves_to: [],
      species: {
        name: '',
        url: ''
      }
    }
  }
  public cadenaTipos: string[] = [];
  public cadenaHabilidades: string[] = [];
  public cadenaMovimientos: string[] = [];
  public cadenaEvoluciones: string[] = [];
  CargarDetalles(pokemon: string){
    console.log(pokemon)
    this.PokemonService.searchByName(pokemon)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
          res => {
            this.pokemon = res;
            let tipos = "";
            for(let j = 0; j<this.pokemon.types.length; j++){
              tipos += this.pokemon.types[j].type.name + " "
            }
            for(let j = 0; j<this.pokemon.abilities.length; j++){
              this.cadenaHabilidades.push(this.pokemon.abilities[j].ability.name);
            }
            for(let j = 0; j<this.pokemon.moves.length; j++){
              this.cadenaMovimientos.push(this.pokemon.moves[j].move.name);
            }
            tipos = tipos.trimEnd();
            tipos = tipos.replace("normal", "Normal");
            tipos = tipos.replace("fighting", "Lucha");
            tipos = tipos.replace("flying", "Volador");
            tipos = tipos.replace("poison", "Veneno");
            tipos = tipos.replace("ground", "Tierra");
            tipos = tipos.replace("rock", "Roca");
            tipos = tipos.replace("bug", "Bicho");
            tipos = tipos.replace("ghost", "Fantasma");
            tipos = tipos.replace("steel", "Acero");
            tipos = tipos.replace("fire", "Fuego");
            tipos = tipos.replace("water", "Agua");
            tipos = tipos.replace("grass", "Planta");
            tipos = tipos.replace("electric", "Eléctrico");
            tipos = tipos.replace("psychic", "Psíquico");
            tipos = tipos.replace("ice", "Hielo");
            tipos = tipos.replace("dragon", "Dragón");
            tipos = tipos.replace("dark", "Siniestro");
            tipos = tipos.replace("fairy", "Hada");
            this.cadenaTipos = tipos.split(" ");
            for(let i = 0; i < this.cadenaHabilidades.length; i++){
              this.PokemonService.searchAbilityByName(this.cadenaHabilidades[i])
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(
                  res => {
                    this.ability = res;
                    let habilidad = "";
                    for(let j = 0; j<this.ability.names.length; j++){
                      if(this.ability.names[j].language.name == "es"){
                        habilidad = this.ability.names[j].name
                      }
                    }
                    this.cadenaHabilidades[i] = habilidad;
                    console.log(habilidad)
                  },
                  error => {
                      console.log(error);
                  }
              );
            }
            for(let i = 0; i < this.cadenaMovimientos.length; i++){
              this.PokemonService.searchMoveByName(this.cadenaMovimientos[i])
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(
                  res => {
                    this.move = res;
                    let movimiento = "";
                    for(let j = 0; j<this.move.names.length; j++){
                      if(this.move.names[j].language.name == "es"){
                        movimiento = this.move.names[j].name
                      }
                    }
                    this.cadenaMovimientos[i] = movimiento;
                    console.log(movimiento)
                  },
                  error => {
                      console.log(error);
                  }
              );
            }
            this.PokemonService.searchSpecieByName(this.pokemon.species.name)
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(
                  res => {
                    this.specie = res;
                    this.PokemonService.searchEvolutionChainByURL(this.specie.evolution_chain.url)
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe(
                        res => {
                          this.evolutionChain = res;
                          this.cadenaEvoluciones.push(this.evolutionChain.chain.species.name);
                          this.ObtenerEvoluciones(this.evolutionChain.chain.evolves_to);
                        },
                        error => {
                            console.log(error);
                        }
                    );
                  },
                  error => {
                      console.log(error);
                  }
              );
          },
          error => {
              console.log(error);
          }
      );
      
  }
  ObtenerEvoluciones(cadenaEvolutiva: IChain[]){
    if(cadenaEvolutiva.length == 0){
      return
    }
    this.cadenaEvoluciones.push(cadenaEvolutiva[0].species.name)
    this.ObtenerEvoluciones(cadenaEvolutiva[0].evolves_to)
  }
}
