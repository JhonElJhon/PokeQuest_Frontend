import {Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MockComponent } from './components/mock/mock.component';
import { BerryHomeComponent } from './components/berry.home/berry.home.component';
import { AbilitiesHomeComponent } from './components/abilities.home/abilities.home.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page',
    },
    {
      path: 'homeBerry',
      component: BerryHomeComponent,
      title: 'homeBerry',

    },
    {
      path: 'homeAbilities',
      component: AbilitiesHomeComponent,
      title: 'homeAbilities',

    },
    {
      path: 'mock',
      component: MockComponent,
      title: 'mock',
    },
    {
      path: 'pokemon/:nombre',
      component: PokemonComponent,
      title: 'pokemon',
    },
  ];
  export default routeConfig;