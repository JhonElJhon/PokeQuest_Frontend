import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { IUserProfile } from '../../interfaces/userProfile.interface';
import { UserService } from '../../services/user.service';

interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./perfil.component.css'] 
})
export class PerfilComponent implements OnInit {
  constructor(
    private router: Router,
    private UserService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ){}
  // Avatares disponibles
  avatars: Avatar[] = [
    { id: '0', name: 'Pikachu', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { id: '1', name: 'Bulbasaur', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { id: '2', name: 'Squirtle', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { id: '3', name: 'Gengar', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png' },
    { id: '4', name: 'Mewtwo', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png' }
  ];

  // Perfil del usuario
  public userProfile: IUserProfile = {
    nombre: 'AshKetchum',
    email: 'ash@pokequest.com',
    fechaInicio: '10/05/2023',
    puntaje: 1250,
    trivias: 8,
    avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  };

  // Estados de edición y modal
  public isEditing: boolean = false;
  public showAvatarModal: boolean = false;

  // Campos temporales para edición
  public editedUsername: string = '';
  public editedEmail: string = '';

  private ngUnsubscribe: Subject<void> = new Subject<void>();
    
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.resetEditFields();
    this.route.params.subscribe(params => {
          const UserName = params['nombre'];
          this.CargarDetalles(UserName);
        });
  }
  CargarDetalles(usuario: string){
      this.UserService.searchUserByName(usuario)
      .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            res => {
              this.userProfile = res;
              for(let i = 0; i<this.avatars.length; i++){
                if(this.avatars[i].id == this.userProfile.avatar){
                  this.userProfile.avatar = this.avatars[i].imageUrl
                }
              }
              this.userProfile.fechaInicio = this.userProfile.fechaInicio.split("T")[0];
            },
            error => {
                console.log(error);
            }
        );
        
    }

  openAvatarModal(): void {
    if(this.isEditing) this.showAvatarModal = true;
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
      let avatar = 0;
      for(let i = 0; i<this.avatars.length; i++){
        if(this.avatars[i].imageUrl == this.userProfile.avatar){
          avatar = i
        }
      }
      let userData = {
        avatar: avatar,
        nombreViejo: this.userProfile.nombre,
        emailViejo: this.userProfile.email,
        nombreNuevo: this.editedUsername,
        emailNuevo: this.editedEmail
      }
      this.userProfile.nombre = this.editedUsername;
      this.userProfile.email = this.editedEmail;
      this.isEditing = false;
      this.UserService.updateUserData(userData)
      .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            res => {
              console.log(res)
            },
            error => {
                console.log(error);
            }
        );
    } else {
      alert('Nombre o correo inválido.');
    }
  }

  private resetEditFields(): void {
    this.editedUsername = this.userProfile.nombre;
    this.editedEmail = this.userProfile.email;
  }

  private isValidEmail(email: string): boolean {
    //const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //return regex.test(email);
    return email.includes("@");
  }

  public IrATrivia(event: Event){
    event.preventDefault()
    this.router.navigate(['/homeTrivias', this.userProfile.nombre]);
  }
}
