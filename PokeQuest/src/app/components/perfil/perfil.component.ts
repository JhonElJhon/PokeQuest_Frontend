import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
}

interface UserProfile {
  username: string;
  email: string;
  joinDate: string;
  score: number;
  triviasCompleted: number;
  avatar: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']  // <-- Corregido: styleUrl ➜ styleUrls
})
export class PerfilComponent implements OnInit {

  // Avatares disponibles
  avatars: Avatar[] = [
    { id: 'pikachu', name: 'Pikachu', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { id: 'bulbasaur', name: 'Bulbasaur', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { id: 'squirtle', name: 'Squirtle', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { id: 'gengar', name: 'Gengar', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png' },
    { id: 'mewtwo', name: 'Mewtwo', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png' }
  ];

  // Perfil del usuario
  userProfile: UserProfile = {
    username: 'AshKetchum',
    email: 'ash@pokequest.com',
    joinDate: '10/05/2023',
    score: 1250,
    triviasCompleted: 8,
    avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  };

  // Estados de edición y modal
  isEditing: boolean = false;
  showAvatarModal: boolean = false;

  // Campos temporales para edición
  editedUsername: string = '';
  editedEmail: string = '';

  ngOnInit(): void {
    this.resetEditFields();
  }

  openAvatarModal(): void {
    this.showAvatarModal = true;
  }

  closeAvatarModal(): void {
    this.showAvatarModal = false;
  }

  selectAvatar(avatarUrl: string): void {
    this.userProfile.avatar = avatarUrl;
    this.closeAvatarModal();
  }

  startEditing(): void {
    this.isEditing = true;
    this.resetEditFields();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.resetEditFields();
  }

  saveProfile(): void {
    if (this.isValidEmail(this.editedEmail) && this.editedUsername.length >= 3) {
      this.userProfile.username = this.editedUsername;
      this.userProfile.email = this.editedEmail;
      this.isEditing = false;
    } else {
      alert('Nombre o correo inválido.');
    }
  }

  private resetEditFields(): void {
    this.editedUsername = this.userProfile.username;
    this.editedEmail = this.userProfile.email;
  }

  private isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
