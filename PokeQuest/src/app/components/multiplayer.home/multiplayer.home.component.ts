import { Component, AfterViewInit } from '@angular/core';
import { IPlayer } from '../../interfaces/player.interface';

@Component({
  selector: 'app-multiplayer-home',
  templateUrl: './multiplayer.home.component.html',
  styleUrls: ['./multiplayer.home.component.css']
})
export class MultiplayerHomeComponent implements AfterViewInit {

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
  public selectedPlayer: IPlayer | null = null;

  // Datos de ejemplo
  public topPlayers: IPlayer[] = [
    {
      id: 1,
      name: 'AshKetchum',
      avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      points: 2450,
      wins: 48,
      losses: 12,
      level: 25
    },
    {
      id: 2,
      name: 'MistyWater',
      avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
      points: 2100,
      wins: 42,
      losses: 15,
      level: 23
    }
  ];

  ngAfterViewInit(): void {
    const playerRows = document.querySelectorAll('.player-row');
    const playerDetails = document.getElementById('player-details') as HTMLElement;
    const closeDetails = document.querySelector('.close-details') as HTMLElement;
    const playerName = document.querySelector('.player-name') as HTMLElement;
    const detailAvatar = document.querySelector('.detail-avatar') as HTMLImageElement;
    const profileButton = document.querySelector('.profile-button') as HTMLButtonElement;
    const challengeButton = document.querySelector('.challenge-button') as HTMLButtonElement;
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;

    playerRows.forEach(row => {
      row.addEventListener('click', () => {
        const name = row.querySelector('td:nth-child(2)')?.textContent?.trim();
        const player = this.topPlayers.find(p => p.name === name);
        if (player) {
          this.selectedPlayer = player;
          playerName.textContent = player.name;
          detailAvatar.src = player.avatar;
          playerDetails.style.display = 'block';
          playerDetails.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    closeDetails.addEventListener('click', () => {
      playerDetails.style.display = 'none';
    });

    profileButton.addEventListener('click', () => {
      if (this.selectedPlayer) {
        window.location.href = `perfil.html?player=${this.selectedPlayer.id}`;
      }
    });

    challengeButton.addEventListener('click', () => {
      if (this.selectedPlayer) {
        alert(`¡Desafiando a ${this.selectedPlayer.name}!`);
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
}
