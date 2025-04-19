import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BerryHomeComponent } from './berry.home/berry.home.component';
import { AbilitiesHomeComponent } from './abilities.home/abilities.home.component';

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
  ];
  export default routeConfig;