import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PokeQuest';
}
