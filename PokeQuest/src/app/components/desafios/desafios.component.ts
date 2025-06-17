import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IHomePokemon } from '../../interfaces/pokemon.home.interface';
import { AuthService } from '../../services/auth.service';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IPlayer } from '../../interfaces/player.interface';
import { IUserProfile } from '../../interfaces/userProfile.interface';
import { IQuest } from '../../interfaces/quest.interface';
import { QuestService } from '../../services/quest.service';
interface desafiosFiltrados{
  retador: string,
  desafiado: string,
  codigo: number,
  trivias: string,
  descripcion: string,
  puntajeASuperar: number,
  estado: string,
  debeAceptar: boolean
}
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
    private questService: QuestService,
    private authService: AuthService
  ){}
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  public userName = '';
  ngOnInit(): void {
    this.route.params.subscribe(params => {
          const UserName = params['nombre'];
          this.userName = UserName;
        });
    this.ObtenerTodosLosDesafios(this.userName);
  }

  public quest: IQuest = {
    codigo: 0,
    retador: '',
    desafiado: '',
    completado: false,
    puntajeASuperar: 0,
    trivias: '',
    ganador: '',
    fechaCreacion: '',
  }

  public filtrado: desafiosFiltrados = {
    codigo: 0,
    trivias: "",
    descripcion: "",
    puntajeASuperar: 0,
    estado: "",
    debeAceptar: false,
    desafiado: '',
    retador: ''
  }

  public listaDesafios: IQuest[] = [];
  public listaDesafiosFiltrados: desafiosFiltrados[] = [];
  public filtro = "Todos";

  public ObtenerTodosLosDesafios(usuario: string){
    this.questService.getQuestsByUser(usuario)
    .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(
              res => {
                this.listaDesafios = res;
                this.FiltrarDesafiosDefault("todos");
              },
              error => {
                  console.log(error);
              }
          );
  }

  public FiltrarDesafios(filtro: string, event: Event){
    event.preventDefault();
    let listaVacia: desafiosFiltrados[] = []
    this.listaDesafiosFiltrados = listaVacia;
    for(let i = 0; i<this.listaDesafios.length; i++){
      let filtrado2: desafiosFiltrados = {
        codigo: 0,
        descripcion: "",
        trivias: '',
        puntajeASuperar: 0,
        estado: '',
        debeAceptar: false,
        desafiado: '',
        retador: ''
      }
      filtrado2.descripcion = this.listaDesafios[i].retador == this.userName ? "Has desafiado a " + this.listaDesafios[i].desafiado : "Has sido desafiado por " + this.listaDesafios[i].retador;
      if(this.listaDesafios[i].completado){
        filtrado2.estado = this.listaDesafios[i].ganador == this.userName ? "Ganado" : "Perdido";
      }
      else{
        filtrado2.estado = "Pendiente";
      }
      filtrado2.debeAceptar = this.listaDesafios[i].desafiado == this.userName && !this.listaDesafios[i].completado;
      filtrado2.puntajeASuperar = this.listaDesafios[i].puntajeASuperar;
      filtrado2.trivias = this.listaDesafios[i].trivias;
      filtrado2.desafiado = this.listaDesafios[i].desafiado;
      filtrado2.retador = this.listaDesafios[i].retador;
      filtrado2.codigo = this.listaDesafios[i].codigo;
      if(filtro == "todos") this.listaDesafiosFiltrados.push(filtrado2);
      if(filtro == "pendientes" && filtrado2.estado == "Pendiente") this.listaDesafiosFiltrados.push(filtrado2);
      if(filtro == "ganados" && filtrado2.estado == "Ganado") this.listaDesafiosFiltrados.push(filtrado2);
      if(filtro == "perdidos" && filtrado2.estado == "Perdido") this.listaDesafiosFiltrados.push(filtrado2);
    }
  }

  public FiltrarDesafiosDefault(filtro: string){
    let listaVacia: desafiosFiltrados[] = []
    this.listaDesafiosFiltrados = listaVacia;
    for(let i = 0; i<this.listaDesafios.length; i++){
      let filtrado2: desafiosFiltrados = {
        codigo: 0,
        descripcion: "",
        trivias: '',
        puntajeASuperar: 0,
        estado: '',
        debeAceptar: false,
        desafiado: '',
        retador: ''
      }
      filtrado2.descripcion = this.listaDesafios[i].retador == this.userName ? "Has desafiado a " + this.listaDesafios[i].desafiado : "Has sido desafiado por " + this.listaDesafios[i].retador;
      if(this.listaDesafios[i].completado){
        filtrado2.estado = this.listaDesafios[i].ganador == this.userName ? "Ganado" : "Perdido";
      }
      else{
        filtrado2.estado = "Pendiente";
      }
      filtrado2.debeAceptar = this.listaDesafios[i].desafiado == this.userName && !this.listaDesafios[i].completado;
      filtrado2.puntajeASuperar = this.listaDesafios[i].puntajeASuperar;
      filtrado2.trivias = this.listaDesafios[i].trivias;
      filtrado2.desafiado = this.listaDesafios[i].desafiado;
      filtrado2.retador = this.listaDesafios[i].retador;
      filtrado2.codigo = this.listaDesafios[i].codigo;
      if(filtro == "todos") this.listaDesafiosFiltrados.push(filtrado2);
      if(filtro == "pendientes" && filtrado2.estado == "Pendiente") this.listaDesafiosFiltrados.push(filtrado2);
      if(filtro == "ganados" && filtrado2.estado == "Ganado") this.listaDesafiosFiltrados.push(filtrado2);
      if(filtro == "perdidos" && filtrado2.estado == "Perdido") this.listaDesafiosFiltrados.push(filtrado2);
    }
  }

  public AceptarDesafio(desafio: desafiosFiltrados){
    localStorage.setItem("trivias", desafio.trivias);
    localStorage.setItem("desafiado", desafio.desafiado);
    localStorage.setItem("codigo", desafio.codigo.toString());
    localStorage.setItem("puntajeASuperar", desafio.puntajeASuperar.toString())
    localStorage.setItem("retador", desafio.retador)
    this.IrATrivia();
  }
  public IrATrivia(){
    this.router.navigate(['/startTrivia', this.userName]);
  }

  public IrAHomeTrivias(event: Event){
    event.preventDefault()
    this.router.navigate(['/homeTrivias', this.userName]);
  }
}
