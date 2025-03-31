import {Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MockComponent } from './components/mock/mock.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page',
    },
    {
      path: 'mock',
      component: MockComponent,
      title: 'mock',
    },
  ];
  export default routeConfig;