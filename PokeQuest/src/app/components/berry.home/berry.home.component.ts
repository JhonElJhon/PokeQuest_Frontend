import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BerryService } from '../../services/berry.service';
import { IHomeBerry } from '../../interfaces/berry.home.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-berry.home',
  imports: [FormsModule, CommonModule],
  templateUrl: './berry.home.component.html',
  styleUrl: './berry.home.component.css'
})
export class BerryHomeComponent {
  constructor(
    private BerryService: BerryService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    console.log("Bienvenido al home de las bayas")
    this.BuscarFrutas("%20","%20"); //%20 es dejar en espacio vacío
  }

  public berry: IHomeBerry = {
    id: 0,
    nombre: "",
    tipo: "",
    spriteURL: ""
  }
  public busqueda = "";
  public tipo = "";
  public frutasFiltradas: IHomeBerry[] = [];

  public BuscarFrutas(termino: string, tipo: string){
    termino = termino == "" ? "%20" : termino;
    tipo = tipo == "" ? "%20" : tipo;
    this.BerryService.getBerriesByFilter(termino, tipo)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
          res => {
              this.frutasFiltradas = res;
              console.log(this.busqueda + ":" + this.tipo)
          },
          error => {
              console.log(error);
          }
      );
  }

  public FrutaDetalles(fruta: string){
    this.router.navigate(['/berry', fruta.toLowerCase()]);
  }

  public IrATrivia(event: Event){
    event.preventDefault()
    this.router.navigate(['/homeTrivias']);
  }

  public IrAHome(event: Event){
    event.preventDefault()
    this.router.navigate(['']);
  }

  public IrAHabilidades(event: Event){
    event.preventDefault()
    this.router.navigate(['/homeAbilities']);
  }

  public IrAUser(event: Event){
    event.preventDefault()
    this.router.navigate(['/user']);
  }
}
