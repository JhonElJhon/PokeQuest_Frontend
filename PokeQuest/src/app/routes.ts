import {Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MockComponent } from './components/mock/mock.component';
import { BerryHomeComponent } from './components/berry.home/berry.home.component';
import { AbilitiesHomeComponent } from './components/abilities.home/abilities.home.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { BerryComponent } from './components/berry/berry.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AbilityComponent } from './components/ability/ability.component';


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
    {
      path: 'berry/:nombre',
      component: BerryComponent,
      title: 'Berry',
    },
    {
      path: 'user',
      component: UserComponent,
      title: 'user',
    },
    {
      path: 'register',
      component: RegisterComponent,
      title: 'register',
    },
    {
      path: 'perfil',
      component: PerfilComponent,
      title: 'perfil',
    },

    {
      path: 'Ability',
      component: AbilityComponent,
      title: 'Ability',
    },

    {
      path: 'ability/:nombre',
      component: AbilityComponent,
      title: 'Berry',
    },
  ];
  export default routeConfig;