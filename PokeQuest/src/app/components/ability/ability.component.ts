import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbilityService } from '../../services/ability.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { IAbilitiy } from '../../interfaces/ability.interface';

@Component({
  selector: 'app-ability',
  imports: [FormsModule, CommonModule],
  templateUrl: './ability.component.html',
  styleUrl: './ability.component.css'
})
export class AbilityComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private AbilityService: AbilityService
  ) {}
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const abilityName = params['nombre'];
      this.CargarDetalles(abilityName);
    });
  }

  public ability: IAbilitiy = {
    id: 0,
    name: "",
    is_main_series: false,
    generation: {
      name: '',
      url: ''
    },
    names: [],
    effect_entries: [],
    effect_changes: [],
    flavor_text_entries: [],
    pokemon: []
  }
  
  public nombre: string = "";
  public descripcion: string = "";
  public listaPokemones: string[] = [];
  
  CargarDetalles(habilidad: string){
    console.log(habilidad)
    this.AbilityService.searchAbilityByName(habilidad)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
          res => {
            this.ability = res;
            for(let i = 0; i<this.ability.names.length; i++){
              if(this.ability.names[i].language.name == "es"){
                this.nombre = this.ability.names[i].name
              }
            }
            for(let i = 0; i<this.ability.effect_entries.length; i++){
              if(this.ability.effect_entries[i].language.name == "en"){
                this.descripcion = this.ability.effect_entries[i].effect
              }
            }
            for(let i = 0; i<this.ability.pokemon.length; i++){
              this.listaPokemones.push(this.ability.pokemon[i].pokemon.name)
            }
          },
          error => {
              console.log(error);
          }
      );
      
  }

  public IrAHabilidades(event: Event){
    event.preventDefault()
    this.router.navigate(['/homeAbilities']);
  }
}
