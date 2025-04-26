import { Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Subject, takeUntil } from 'rxjs';
import { IPokemon } from '../../interfaces/pokemon.interface';
import {FormsModule} from '@angular/forms';
import { IBerry } from '../../interfaces/berry.interface';
import { IAbilitiy } from '../../interfaces/ability.interface';


@Component({
  selector: 'app-mock',
  imports: [FormsModule, CommonModule], //FormsModule es para hacer two-way binding con un <input> y CommonModule para HttpClient
  templateUrl: './mock.component.html',
  styleUrl: './mock.component.css'
})
export class MockComponent {
  //Siempre que se trabaje con un servicio, se necesita el constructor del servicio, el Unsubscribe y los métodos OnDestroy y OnInit

  constructor(
    private PokemonService: PokemonService
  ){}
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void { }
  
  // Se tiene que invocar la plantilla o interfaz e inicializarla
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
  // Se supone esto va en el berry.component
  public berry: IBerry = {
    firmness: {
      name: '',
      url: ''
    },
    flavors: [],
    growth_time: 0,
    id: 0,
    item: {
      name: '',
      url: ''
    },
    max_harvest: 0,
    name: '',
    natural_gift_power: 0,
    natural_gift_type: {
      name: '',
      url: ''
    },
    size: 0,
    smoothness: 0,
    soil_dryness: 0,
  }
  // Se supone esto va en el Ability.component
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
  // Se llama el servicio
  public mock = "";
  public temp = "";
  Prueba(){
    console.log("inicia")
    //console.log("Funciona " + this.temp)
    for(let i = 1; i<1026; i++){
      this.PokemonService.searchByName(i.toString())
      .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                res => {
                    this.pokemon = res;
                    //this.listaPokemones.push(this.pokemon)
                    //console.log(this.pokemon.name);
                    let tipos = "";
                    for(let j = 0; j<this.pokemon.types.length; j++){
                      tipos += this.pokemon.types[j].type.name + " "
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
                    let nombre = this.pokemon.name[0].toUpperCase();
                    nombre = this.pokemon.name.replace(this.pokemon.name[0], nombre)
                    this.mock += "(" + this.pokemon.id + ", '" + nombre + "', '" + tipos + "', '" + this.pokemon.sprites.front_default +"'), \n"
                },
                error => {
                    console.log(error);
                }
            );
    }
    console.log(this.mock)
    console.log("terminado")
  }
  Bayas(){
    console.log("inicia")
    //console.log("Funciona " + this.temp)
    for(let i = 1; i<65; i++){
      this.PokemonService.searchBerryByName(i.toString())
      .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                res => {
                    this.berry = res;
                    //this.listaPokemones.push(this.pokemon)
                    //console.log(this.pokemon.name);
                    let nombre = this.berry.name[0].toUpperCase();
                    nombre = this.berry.name.replace(this.berry.name[0], nombre)
                    let tipo = this.berry.natural_gift_type.url;
                    tipo = tipo.substring(31,33);
                    tipo = tipo.replace("/","");
                    this.mock += "(" + this.berry.id + ", '" + nombre + "', " + tipo +", 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" + this.berry.name + "-berry.png'), \n"
                },
                error => {
                    console.log(error);
                }
            );
    }
    console.log(this.mock)
    console.log("terminado")
  }
  Habilidades(){
    console.log("inicia")
    //console.log("Funciona " + this.temp)
    for(let i = 1; i<308; i++){
      this.PokemonService.searchAbilityByName(i.toString())
      .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                res => {
                    this.ability = res;
                    //this.listaPokemones.push(this.pokemon)
                    //console.log(this.pokemon.name);
                    let nombre = this.ability.name[0].toUpperCase();
                    nombre = this.ability.name.replace(this.ability.name[0], nombre);
                    let nombre_es = '';
                    for (let j = 0; j<this.ability.names.length; j++){
                      if(this.ability.names[j].language.name == "es"){
                        nombre_es = this.ability.names[j].name;
                      }
                    }
                    this.mock += "(" + this.ability.id + ", '" + nombre + "', '" + nombre_es + "'), \n"
                },
                error => {
                    console.log(error);
                }
            );
    }
    console.log(this.mock)
    console.log("terminado")
  }
}
