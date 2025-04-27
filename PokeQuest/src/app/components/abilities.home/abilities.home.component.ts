import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbilityService } from '../../services/ability.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { IHomeAbility } from '../../interfaces/ability.home.interface';

@Component({
  selector: 'app-abilities.home',
  imports: [FormsModule, CommonModule],
  templateUrl: './abilities.home.component.html',
  styleUrl: './abilities.home.component.css'
})
export class AbilitiesHomeComponent {
  constructor(
    private AbilityService: AbilityService,
    private router: Router
  ){}

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    console.log("Bienvenido al home de las habilidades")
    this.BuscarHabilidades("%20"); //%20 es dejar en espacio vacío
  }

  public ability: IHomeAbility = {
    id: 0,
    nombreEN: "",
    nombreES: ""
  }
  public busqueda = "";
  public habilidadesFiltradas: IHomeAbility[] = [];

  public BuscarHabilidades(termino: string){
    termino = termino == "" ? "%20" : termino;
    this.AbilityService.getAbilitiesByFilter(termino)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
          res => {
              this.habilidadesFiltradas = res;
              console.log(this.busqueda)
          },
          error => {
              console.log(error);
          }
      );
  }

  public HabilidadDetalles(habilidad: string){
    this.router.navigate(['/ability', habilidad.toLowerCase()]);
  }
  public IrATrivia(event: Event){
    event.preventDefault()
    console.log("pendiente")
  }

  public IrABayas(event: Event){
    event.preventDefault()
    this.router.navigate(['/homeBerry']);
  }

  public IrAHome(event: Event){
    event.preventDefault()
    this.router.navigate(['']);
  }
}
