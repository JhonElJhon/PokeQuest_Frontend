import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { IPlayer } from '../../interfaces/player.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IUserProfile } from '../../interfaces/userProfile.interface';

interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-multiplayer-home',
  templateUrl: './multiplayer.home.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./multiplayer.home.component.css']
})
export class MultiplayerHomeComponent{
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ){}

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  public userName: string = '';
  ngOnInit(): void {
    this.route.params.subscribe(params => {
          const UserName = params['nombre'];
          this.userName = UserName;
        });
    this.ObtenerJugadores();
  }

  public busqueda = '';
  public showSuggestions = false;
  public allUsers: IUserProfile[] = [];
  public playerNames: string[] = [];
  public filteredPlayerList: IUserProfile[] = [];

  @ViewChild('searchContainer') searchContainer!: ElementRef;

  filterPlayers() {
    if (!this.busqueda) {
      this.filteredPlayerList = [];
      return;
    }
    
    const searchTerm = this.busqueda.toLowerCase();
    this.filteredPlayerList = this.allUsers.filter(name => 
      name.nombre.toLowerCase().startsWith(searchTerm)
    );
  }

  selectPlayer(player: string) {
    this.busqueda = player;
    this.showSuggestions = false;
  }

  // Close suggestions when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.searchContainer.nativeElement.contains(event.target)) {
      this.showSuggestions = false;
    }
  }

  avatars: Avatar[] = [
    { id: '0', name: 'Pikachu', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { id: '1', name: 'Bulbasaur', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { id: '2', name: 'Squirtle', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { id: '3', name: 'Gengar', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png' },
    { id: '4', name: 'Mewtwo', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png' }
  ];
  // Tipos
  public player: IPlayer = {
    id: 0,
    name: "",
    avatar: "",
    points: 0,
    wins: 0,
    losses: 0,
    level: 0
  };

  // Estado inicial
  public selectedPlayer: IUserProfile | null = null;

  // Datos de ejemplo
  public topPlayers: IUserProfile[] = [];

  public user: IUserProfile = {
    nombre: 'AshKetchum',
    email: 'ash@pokequest.com',
    fechaInicio: '10/05/2023',
    puntaje: 1250,
    trivias: 8,
    avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    victorias: 0,
    derrotas: 0
  };

  public ObtenerJugadores(){
    this.userService.getAllUsersExcept("a")
    .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                res => {
                  this.allUsers = res;
                  for(let i = 0; i<this.allUsers.length; i++){
                    this.playerNames.push(this.allUsers[i].nombre);
                    for(let j = 0; j<this.avatars.length; j++){
                      if(this.avatars[j].id == this.allUsers[i].avatar){
                        this.allUsers[i].avatar = this.avatars[j].imageUrl
                      }
                    }
                  }
                  this.ObtenerMejoresJugadores();
                },
                error => {
                    console.log(error);
                }
            );
  }

  public ObtenerMejoresJugadores(){
    for(let i = 0; i<this.allUsers.length; i++){
      this.topPlayers.push(this.allUsers[i])
      if(i==4){
        return
      }
    }
  }

  public DesafiarA(usuario: string){
    if(usuario == this.userName) return;
    console.log("desafiando a " + usuario);
    localStorage.setItem("desafiado", usuario);
    this.router.navigate(['/homeTrivias', this.userName]);
    // se debe crear una tabla "desafio"
    // el usuario desafiado consulta cada 5 segundos la bd para buscar tablas desafio con su nombre en ella
    // el usuario desafiado acepta el desafio que desee
    // capaz y esto es asíncrono
  }
  public IrATrivia(event: Event){
    event.preventDefault()
    this.router.navigate(['/homeTrivias', this.userName]);
  }
}
