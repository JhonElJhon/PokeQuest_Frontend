import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, interval, timer, Subscription } from 'rxjs';
import { ITrivia } from '../../interfaces/trivia.interface';
import { TriviaService } from '../../services/trivia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

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
    private UserService: UserService
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
    this.ObtenerTrivias();
    this.startCountdown();
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
  public hayRespuesta = false;
  private respuestaCorrectaActual = '';
  public mostrar = false;
  public esCorrecto = false;
  public feedback = '';
  public hayJuego = true;
  public puntaje = 0;
  public cantCorrectas = 0;

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
    this.triviaService.getTriviasByFilter(this.pokemon, this.tipo, this.cantPreguntas)
      .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            res => {
                this.listaTrivias = res;
                this.SiguientePregunta();
            },
            error => {
                console.log(error);
                /*this.listaTrivias = [
                                      {
                                        "pokemon": "Dratini",
                                        "pregunta": "¿Qué apariencia tiene al nacer?",
                                        "respuestas": [
                                          "Serpiente marina",
                                          "Dragón bebé",
                                          "Gusano",
                                          "Pez pequeño"
                                        ],
                                        "respuestaCorrecta": "Serpiente marina",
                                        "spriteURL": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png"
                                      },
                                      {
                                        "pokemon": "Dragonair",
                                        "pregunta": "¿Qué simbolizan las esferas de su cuerpo?",
                                        "respuestas": [
                                          "Edad",
                                          "Poder místico",
                                          "Evolución",
                                          "Control climático"
                                        ],
                                        "respuestaCorrecta": "Poder místico",
                                        "spriteURL": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png"
                                      },
                                      {
                                        "pokemon": "Dragonite",
                                        "pregunta": "¿Cuánto mide su envergadura?",
                                        "respuestas": [
                                          "4.1 m",
                                          "2.7 m",
                                          "3.5 m",
                                          "2.0 m"
                                        ],
                                        "respuestaCorrecta": "2.7 m",
                                        "spriteURL": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png"
                                      }
                                    ];
                this.SiguientePregunta();
                */
            }
    );
  }
  ElegirRespuesta(respuesta: string){
    this.respuestaElegida = respuesta;
    this.hayRespuesta = true;
  }
  SiguientePregunta(){
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
    this.indiceActual++;
    this.texto = this.indiceActual == this.listaTrivias.length ? "Finalizar" : this.texto; 
  }
  Evaluar(){
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
    this.hayRespuesta = false;
    this.mostrar = true;
    // Stop por 3 segundos
  }

  FinalizarTrivias(){
    this.hayJuego = false;
    this.preguntaActual = "Fin de la Trivia. Tus resultados:"
    this.startProgressTimer(true, 8000);
    // Logica de puntos
    let userData = {
        usuario: this.userName,
        puntos: this.puntaje
      }
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
}
