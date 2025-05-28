import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { Subject, takeUntil } from 'rxjs';
import { IHomePokemon } from '../../interfaces/pokemon.home.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
constructor(
    private PokemonService: PokemonService,
    private router: Router
  ){}
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    console.log("Bienvenido al home")
    this.BuscarPokemones("%20","%20"); //%20 es dejar en espacio vacío
  }

  public pokemon: IHomePokemon = {
    id: 0,
    nombre: "",
    tipos: [],
    spriteURL: ""
  }
  public busqueda = "";
  public tipo = "";
  public pokemonesFiltrados: IHomePokemon[] = [];

  public BuscarPokemones(termino: string, tipo: string){
    termino = termino == "" ? "%20" : termino;
    tipo = tipo == "" ? "%20" : tipo;
    this.PokemonService.getPokemonsByFilter(termino, tipo)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
          res => {
              this.pokemonesFiltrados = res;
              //console.log(this.pokemonesFiltrados)
              console.log(this.busqueda + ":" + this.tipo)
          },
          error => {
              console.log(error);
          }
      );
  }

  public PokemonDetalles(pokemon: string){
    this.router.navigate(['/pokemon', pokemon.toLowerCase()]);
  }

  public IrATrivia(event: Event){
    event.preventDefault()
    if(localStorage.getItem('username') == null) this.router.navigate(['/user'])
    this.router.navigate(['/homeTrivias', localStorage.getItem('username')]);
  }

  public IrABayas(event: Event){
    event.preventDefault()
    this.router.navigate(['/homeBerry']);
  }

  public IrAHabilidades(event: Event){
    event.preventDefault()
    this.router.navigate(['/homeAbilities']);
  }
  public IrAUser(event: Event){
    event.preventDefault()
    this.router.navigate(['/user']);
  }
}
