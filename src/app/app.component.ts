// src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Asegúrate de importar RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // RouterOutlet es necesario para que <router-outlet> funcione
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ciudad-de-oro';
}