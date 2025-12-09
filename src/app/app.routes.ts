// src/app/app.routes.ts

import { Routes } from '@angular/router';
import HomeComponent from '../pages/home/home.component';
import RegistroComponent from '../pages/registro/registro.component';
 // ¡NUEVA IMPORTACIÓN!

export const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent,
        title: 'Inicio | Ciudad de Oro' 
    },
    { 
        path: 'registro', // La URL será http://localhost:4200/registro
        component: RegistroComponent, // El componente a cargar
        title: 'Registro | Ciudad de Oro' 
    },
    // Puedes añadir una ruta comodín para páginas no encontradas:
    // { path: '**', component: NotFoundComponent } 
];