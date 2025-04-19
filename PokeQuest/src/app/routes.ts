import {Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MockComponent } from './components/mock/mock.component';
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
    {
      path: 'mock',
      component: MockComponent,
      title: 'mock',
    },
  ];
  export default routeConfig;