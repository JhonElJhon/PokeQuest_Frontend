import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BerryService } from '../../services/berry.service';
import { Subject, takeUntil } from 'rxjs';
import { IBerry } from '../../interfaces/berry.interface';
import { Iitem } from '../../interfaces/item.interface';

@Component({
  selector: 'app-berry',
  imports: [FormsModule, CommonModule],
  templateUrl: './berry.component.html',
  styleUrl: './berry.component.css'
})
export class BerryComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private BerryService: BerryService
  ) {}
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pokemonName = params['nombre'];
      this.CargarDetalles(pokemonName);
    });
  }

  public berry: IBerry = {
    firmness: {
      name: '',
      url: ''
    },
    flavors: [],
    growth_time: 0,
    id: 0,
    item: {
      name: '',
      url: ''
    },
    max_harvest: 0,
    name: '',
    natural_gift_power: 0,
    natural_gift_type: {
      name: '',
      url: ''
    },
    size: 0,
    smoothness: 0,
    soil_dryness: 0,
  }
  public item: Iitem = {
    attributes: [],
    baby_trigger_for: "",
    category: {
      name: '',
      url: ''
    },
    cost: 0,
    effect_entries: [],
    flavor_text_entries: [],
    fling_effect: [],
    fling_power: 0,
    game_indices: [],
    held_by_pokemon: [],
    id: 0,
    machines: [],
    name: "",
    names: [],
    sprites: { default: "" }
  }
  public tipo: string = "";
  public descripcion: string = "";
  public sprite: string = "";
  
  CargarDetalles(fruta: string){
    console.log(fruta)
    this.BerryService.searchBerryByName(fruta)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
          res => {
            this.berry = res;
            let type = this.berry.natural_gift_type.name;
            type = type.trimEnd();
            type = type.replace("normal", "Normal");
            type = type.replace("fighting", "Lucha");
            type = type.replace("flying", "Volador");
            type = type.replace("poison", "Veneno");
            type = type.replace("ground", "Tierra");
            type = type.replace("rock", "Roca");
            type = type.replace("bug", "Bicho");
            type = type.replace("ghost", "Fantasma");
            type = type.replace("steel", "Acero");
            type = type.replace("fire", "Fuego");
            type = type.replace("water", "Agua");
            type = type.replace("grass", "Planta");
            type = type.replace("electric", "Eléctrico");
            type = type.replace("psychic", "Psíquico");
            type = type.replace("ice", "Hielo");
            type = type.replace("dragon", "Dragón");
            type = type.replace("dark", "Siniestro");
            type = type.replace("fairy", "Hada");
            this.tipo = type
            this.BerryService.getResourceByUrl(this.berry.item.url)
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(
                  res => {
                    this.item = res;
                    this.descripcion = this.item.effect_entries[0].effect;
                    this.sprite = this.item.sprites.default
                  },
                  error => {
                      console.log(error);
                  }
              );
          },
          error => {
              console.log(error);
          }
      );
      
  }

  public IrABayas(event: Event){
    event.preventDefault()
    this.router.navigate(['/homeBerry']);
  }
}
