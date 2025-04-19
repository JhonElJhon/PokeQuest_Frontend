import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {RouterModule} from '@angular/router';
import { BerryHomeComponent } from './components/berry.home/berry.home.component';
import { AbilitiesHomeComponent } from './components/abilities.home/abilities.home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, RouterModule, BerryHomeComponent, AbilitiesHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PokeQuest';
}
