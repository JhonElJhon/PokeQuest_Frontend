import { Component, AfterViewInit } from '@angular/core';
import { IPlayer } from '../../interfaces/player.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IUserProfile } from '../../interfaces/userProfile.interface';

@Component({
  selector: 'app-multiplayer-home',
  templateUrl: './multiplayer.home.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./multiplayer.home.component.css']
})
export class MultiplayerHomeComponent implements AfterViewInit {
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
          const UserName = params['nombre'];
          this.userName = UserName;
        });
    this.ObtenerJugadores();
  }

  public userName: string = '';
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
    avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  };

  public allUsers: IUserProfile[] = [];

  ngAfterViewInit(): void {
    const playerRows = document.querySelectorAll('.player-row');
    const playerDetails = document.getElementById('player-details') as HTMLElement;
    const closeDetails = document.querySelector('.close-details') as HTMLElement;
    const playerName = document.querySelector('.player-name') as HTMLElement;
    const detailAvatar = document.querySelector('.detail-avatar') as HTMLImageElement;
   // const profileButton = document.querySelector('.profile-button') as HTMLButtonElement;
    const challengeButton = document.querySelector('.challenge-button') as HTMLButtonElement;
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;

    playerRows.forEach(row => {
      row.addEventListener('click', () => {
        const name = row.querySelector('td:nth-child(2)')?.textContent?.trim();
        const player = this.topPlayers.find(p => p.nombre === name);
        if (player) {
          this.selectedPlayer = player;
          playerName.textContent = player.nombre;
          detailAvatar.src = player.avatar;
          playerDetails.style.display = 'block';
          playerDetails.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    closeDetails.addEventListener('click', () => {
      playerDetails.style.display = 'none';
    });

   /* profileButton.addEventListener('click', () => {
      if (this.selectedPlayer) {
        window.location.href = `perfil.html?player=${this.selectedPlayer.id}`;
      }
    });*/

    challengeButton.addEventListener('click', () => {
      if (this.selectedPlayer) {
        alert(`¡Desafiando a ${this.selectedPlayer.nombre}!`);
      }
    });

    searchInput.addEventListener('input', (e) => {
      const term = (e.target as HTMLInputElement).value.toLowerCase();
      document.querySelectorAll('.player-row').forEach(row => {
        const name = row.querySelector('td:nth-child(2)')?.textContent?.toLowerCase();
        (row as HTMLElement).style.display = name?.includes(term) ? '' : 'none';
      });
    });
  }

  public ObtenerJugadores(){
    this.userService.getAllUsers()
    .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                res => {
                  this.allUsers = res;
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
      if(i==9){
        return
      }
    }
  }

  public IrATrivia(event: Event){
    event.preventDefault()
    this.router.navigate(['/homeTrivias', this.userName]);
  }
}
