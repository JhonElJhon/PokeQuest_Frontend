import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, interval, timer, Subscription } from 'rxjs';
import { ITrivia } from '../../interfaces/trivia.interface';
import { TriviaService } from '../../services/trivia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { QuestService } from '../../services/quest.service';

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
    private triviaService: TriviaService,
    private UserService: UserService,
    private QuestService: QuestService
  ){}
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.progressDestroy$.next();
    this.progressDestroy$.complete();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  public userName = '';
  public pokemon: string | null = '';
  public tipo: string | null = '';
  public cantPreguntas: string | null = '';
  public desafiado: string | null = '';
  public puntajeASuperar: string | null = '';
  public codigo: string | null = '';
  public trivias: string | null = '';
  public retador: string | null = '';
  public texto = "Siguiente Pregunta";
  public optionButton = 'optionButton';
  // 3-minute timer variables
  minutes: number = 3;
  seconds: number = 0;
  isCountdownActive: boolean = true;
  isCountdownStopped: boolean = false;
  private destroy$ = new Subject<void>();

  // 3-second timer variables
  progressValue: number = 0;
  isProgressActive: boolean = false;
  buttonClicked: boolean = false;
  private progressDestroy$ = new Subject<void>();


  ngOnInit(): void {
    this.route.params.subscribe(params => {
          const UserName = params['nombre'];
          this.userName = UserName;
        });
    this.pokemon = localStorage.getItem("pokemon");
    this.tipo = localStorage.getItem("tipo");
    this.cantPreguntas = localStorage.getItem("cantPreguntas");
    this.desafiado = localStorage.getItem("desafiado");
    this.codigo = localStorage.getItem("codigo");
    this.trivias = localStorage.getItem("trivias");
    this.puntajeASuperar = localStorage.getItem("puntajeASuperar");
    this.retador = localStorage.getItem("retador")

    this.ObtenerTrivias();
    this.startCountdown();
  }

  public trivia: ITrivia = {
      codigo: 0,
      pokemon: "",
      pregunta: "",
      respuestas: [],
      respuestaCorrecta: "",
      spriteURL: ""  
    }
  public listaCodigos = "";
  public listaTrivias: ITrivia[] = [];
  public indiceActual = 0;
  public preguntaActual = '';
  public respuestasActuales: string[] = [];
  public spriteActual = '';
  public pokemonActual = '';
  public respuestaElegida = '';
  public hayRespuesta = false;
  private respuestaCorrectaActual = '';
  public mostrar = false;
  public esCorrecto = false;
  public feedback = '';
  public hayJuego = true;
  public puntaje = 0;
  public puntosASuperar = 0;
  public cantCorrectas = 0;
  public puedeResponder = false;

  // 3-minute countdown timer
  startCountdown() {
    this.isCountdownActive = true;
    this.isCountdownStopped = false;
    
    interval(1000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else if (this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        this.handleCountdownEnd();
      }
    });
  }

  stopCountdown() {
    this.destroy$.next();
    this.isCountdownActive = false;
    this.isCountdownStopped = true;
  }

  resetCountdown() {
    this.minutes = 3;
    this.seconds = 0;
    this.startCountdown();
  }

  handleCountdownEnd() {
    this.destroy$.next();
    this.isCountdownActive = false;
    // Lógica para detener las trivias
    console.log("se le acabó el tiempo manito")
    this.FinalizarTrivias();
  }

  // 3-second progress timer
  startProgressTimer(finDelJuego: boolean, tiempo: number) {
    // Cancel any existing progress timer
    this.progressDestroy$.next();
    
    this.buttonClicked = true;
    this.isProgressActive = true;
    this.progressValue = 0;

    // Update progress bar every 30ms
    interval(30).pipe(
      takeUntil(this.progressDestroy$)
    ).subscribe(() => {
      this.progressValue += 100 / (tiempo / 30);
      if (this.progressValue >= 100) this.progressValue = 100;
    });

    // Complete after 3 seconds
    timer(tiempo).pipe(
      takeUntil(this.progressDestroy$)
    ).subscribe(() => {
      this.handleProgressEnd(finDelJuego);
    });
  }
// cuando se acaban los 3 segundos
  handleProgressEnd(finDelJuego: boolean) {
    this.progressDestroy$.next();
    this.isProgressActive = false;
    if(!finDelJuego) this.SiguientePregunta();
    else this.router.navigate(['/homeTrivias', this.userName]);
  }


  ObtenerTrivias(){
    if(this.trivias){
      this.triviaService.getTriviasByIdList(this.trivias)
            .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(
                  res => {
                      this.listaTrivias = res;
                      this.SiguientePregunta();
                  },
                  error => {
                      console.log(error);
                      localStorage.setItem("error", "true");
                      this.router.navigate(['/homeTrivias', this.userName]);
                  }
          );
    }
    else{
      this.triviaService.getTriviasByFilter(this.pokemon, this.tipo, this.cantPreguntas)
            .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(
                  res => {
                      this.listaTrivias = res;
                      this.SiguientePregunta();
                  },
                  error => {
                      console.log(error);
                      localStorage.setItem("error", "true");
                      this.router.navigate(['/homeTrivias', this.userName]);
                  }
          );
    }
  }
  ElegirRespuesta(respuesta: string){
    if(this.puedeResponder){
      this.respuestaElegida = respuesta;
      this.hayRespuesta = true;
    }
    
  }
  SiguientePregunta(){
    this.puedeResponder = true;
    this.mostrar = false;
    if(this.indiceActual == this.listaTrivias.length){
      this.handleCountdownEnd();
      return;
    }
    this.cantPreguntas = this.listaTrivias.length.toString();
    this.preguntaActual = this.listaTrivias[this.indiceActual].pregunta;
    this.respuestasActuales = this.listaTrivias[this.indiceActual].respuestas;
    this.spriteActual = this.listaTrivias[this.indiceActual].spriteURL;
    this.pokemonActual = this.listaTrivias[this.indiceActual].pokemon;
    this.respuestaCorrectaActual = this.listaTrivias[this.indiceActual].respuestaCorrecta;
    this.listaCodigos += this.listaTrivias[this.indiceActual].codigo + "-";
    this.indiceActual++;
    this.texto = this.indiceActual == this.listaTrivias.length ? "Finalizar" : this.texto; 
  }
  Evaluar(){
    if(this.indiceActual == this.listaTrivias.length){
      this.stopCountdown();
    }
    this.startProgressTimer(false, 3000);
    if(this.respuestaCorrectaActual == this.respuestaElegida){
      this.esCorrecto = true;
      this.feedback = 'Correcto! +100 puntos';
      this.puntaje += 100;
      this.cantCorrectas += 1;
    }else{
      this.esCorrecto = false;
      this.feedback = 'Incorrecto. La respuesta era: ' + this.respuestaCorrectaActual;
    }
    this.puedeResponder = false;
    this.hayRespuesta = false;
    this.mostrar = true;
    // Stop por 3 segundos
  }

  FinalizarTrivias(){
    this.hayJuego = false;
    this.puntosASuperar = this.puntaje + this.minutes * 60 + this.seconds;
    this.preguntaActual = "Fin de la Trivia. Tus resultados:"
    this.startProgressTimer(true, 8000);
    // Logica de puntos
    let userData = {
        usuario: this.userName,
        puntos: this.puntaje,
        victorias: 0,
        derrotas: 0
      }
    if(!this.desafiado){
      this.UserService.updateUserPoints(userData)
      .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            res => {
              console.log(res)
            },
            error => {
                console.log(error);
            }
        );
    }
    else{
      if(this.trivias){
        let alterModelData = {
          codigo: this.codigo,
          retador: this.retador,
          desafiado: this.desafiado,
          puntajeASuperar: this.puntajeASuperar,
          puntosDesafiado: this.puntosASuperar
        }
        localStorage.setItem("desafiado", "");
        localStorage.setItem("codigo", "");
        localStorage.setItem("trivias", "");
        localStorage.setItem("puntajeASuperar", "");
        localStorage.setItem("retador", "")                    
        this.QuestService.updateQuest(alterModelData)
          .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                res => {
                  console.log(res)
                },
                error => {
                    console.log(error);
                }
            );
      }
      else{
        this.listaCodigos = this.listaCodigos.slice(0,this.listaCodigos.length - 1);
        localStorage.setItem("desafiado", "");
        console.log("codigos: " + this.listaCodigos);
        let questData = {
          retador: this.userName,
          desafiado: this.desafiado,
          puntajeASuperar: this.puntosASuperar,
          trivias: this.listaCodigos,
        }
        this.QuestService.createQuest(questData)
        .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(
              res => {
                console.log(res)
              },
              error => {
                  console.log(error);
              }
          );
      }
    }
  }
}
