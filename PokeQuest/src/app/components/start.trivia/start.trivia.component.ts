import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ITrivia } from '../../interfaces/trivia.interface';
import { TriviaService } from '../../services/trivia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-start.trivia',
  imports: [FormsModule, CommonModule],
  templateUrl: './start.trivia.component.html',
  styleUrl: './start.trivia.component.css'
})
export class StartTriviaComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private triviaService: TriviaService
  ){}
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  public userName = '';
  public pokemon: string | null = '';
  public tipo: string | null = '';
  public cantPreguntas: string | null = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
          const UserName = params['nombre'];
          this.userName = UserName;
        });
    this.pokemon = localStorage.getItem("pokemon");
    this.tipo = localStorage.getItem("tipo");
    this.cantPreguntas = localStorage.getItem("cantPreguntas");
    this.ObtenerTrivias();
  }

  public trivia: ITrivia = {
      pokemon: "",
      pregunta: "",
      respuestas: [],
      respuestaCorrecta: "",
      spriteURL: ""  
    }
  public listaTrivias: ITrivia[] = [];
  public indiceActual = 0;
  public preguntaActual = '';
  public respuestasActuales: string[] = [];
  public spriteActual = '';
  public pokemonActual = '';
  public respuestaElegida = '';
  private respuestaCorrectaActual = '';
  public mostrar = false;
  public esCorrecto = false;
  public feedback = '';

  ObtenerTrivias(){
    this.triviaService.getTriviasByFilter(this.pokemon, this.tipo, this.cantPreguntas)
      .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            res => {
                this.listaTrivias = res;
                this.SiguientePregunta();
            },
            error => {
                console.log(error);
            }
    );
  }
  ElegirRespuesta(respuesta: string){
    this.respuestaElegida = respuesta;
  }
  SiguientePregunta(){
    this.preguntaActual = this.listaTrivias[this.indiceActual].pregunta;
    this.respuestasActuales = this.listaTrivias[this.indiceActual].respuestas;
    this.spriteActual = this.listaTrivias[this.indiceActual].spriteURL;
    this.pokemonActual = this.listaTrivias[this.indiceActual].pokemon;
    this.respuestaCorrectaActual = this.listaTrivias[this.indiceActual].respuestaCorrecta;
    this.indiceActual++;
  }
  Evaluar(){
    if(this.respuestaCorrectaActual == this.respuestaElegida){
      this.esCorrecto = true;
      this.feedback = 'Correcto! +100 puntos';
    }else{
      this.esCorrecto = false;
      this.feedback = 'Incorrecto. La respuesta era: ' + this.respuestaCorrectaActual;
    }
    this.mostrar = true;
    // Stop por 3 segundos
    this.SiguientePregunta();
  }
}
