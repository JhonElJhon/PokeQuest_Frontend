import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IHomePokemon } from '../../interfaces/pokemon.home.interface';
import { AuthService } from '../../services/auth.service';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-desafios',
  imports: [FormsModule, CommonModule],
  templateUrl: './desafios.component.html',
  styleUrl: './desafios.component.css'
})
export class DesafiosComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private authService: AuthService
  ){}
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  public userName = '';
  public desafiado: string | null = '';
  ngOnInit(): void {
    this.route.params.subscribe(params => {
          const UserName = params['nombre'];
          this.userName = UserName;
        });
    localStorage.setItem("cantPreguntas", "");
    localStorage.setItem("tipo", "");
    localStorage.setItem("pokemon", "");
    this.desafiado = localStorage.getItem("desafiado");
    this.ObtenerTodosPokemones();
    this.busqueda = this.desafiado;
  }

  public listaTipos = ['Todos', 'Agua', 'Fuego', 'Planta', 'Eléctrico', 'Psíquico', 'Siniestro', 'Tierra', 
    'Normal', 'Bicho', 'Volador', 'Lucha', 'Veneno', 'Roca', 'Fantasma', 'Acero', 'Hielo', 'Dragón', 'Hada'];

  public listaNums = [3, 5, 10]
  public tipoSeleccionado = 'Todos';
  public numSeleccionado = 3;
  public timebutton = 'time-button';
  public busqueda: string | null = '';
  public showSuggestions = false;
  public pokemonList: string[] = []; // Populate this with all Pokemon names
  public filteredPokemonList: string[] = [];

  public pokemon: IHomePokemon = {
    id: 0,
    nombre: "",
    tipos: [],
    spriteURL: ""
  }
  public pokemonesFiltrados: IHomePokemon[] = [];

 @ViewChild('searchContainer') searchContainer!: ElementRef;

  filterPokemon() {
    if (!this.busqueda) {
      this.filteredPokemonList = [];
      return;
    }
    
    const searchTerm = this.busqueda.toLowerCase();
    this.filteredPokemonList = this.pokemonList.filter(name => 
      name.toLowerCase().startsWith(searchTerm)
    );
  }

  selectPokemon(pokemon: string) {
    this.busqueda = pokemon;
    this.showSuggestions = false;
    // Call your search function if needed
    this.BuscarPokemones(pokemon);
  }

  // Close suggestions when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.searchContainer.nativeElement.contains(event.target)) {
      this.showSuggestions = false;
    }
  }
  public SeleccionTipo(tipo: string){
    this.tipoSeleccionado = tipo
    console.log(this.tipoSeleccionado);
  }

  public SeleccionNum(num: number){
    this.numSeleccionado = num
    console.log(this.numSeleccionado);
  }

  public ObtenerTodosPokemones(){
    this.pokemonService.getPokemonsByFilter("%20", "%20")
    .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(
              res => {
                  this.pokemonesFiltrados = res;
                  for(let i = 0; i<this.pokemonesFiltrados.length; i++){
                    this.pokemonList.push(this.pokemonesFiltrados[i].nombre)
                  }
              },
              error => {
                  console.log(error);
              }
          );
  }

  public BuscarPokemones(busqueda: string){
    console.log(this.busqueda);
  }
  public IrAHome(event: Event){
    event.preventDefault()
    this.router.navigate(['']);
  }
  public IrAPerfil(event: Event){
    event.preventDefault()
    this.router.navigate(['/perfil', this.userName]);
  }
  public ComenzarTrivia(){
    
  }
  public IrATrivia(){
    this.router.navigate(['startTrivia', this.userName]);
  }
  public IrAMultijugador(event: Event){
    event.preventDefault();
    this.router.navigate(['/HomeMultiplayer', this.userName]);
  }

  public LogOut(event: Event){
    event.preventDefault();
    this.authService.logout();
  }
}
