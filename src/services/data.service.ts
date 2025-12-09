import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // 🛑 ¡NUEVA URL DE IMPLEMENTACIÓN PEGADA AQUÍ!
  private scriptURL = 'https://script.google.com/macros/s/AKfycbxjaB0rXHb1H1kGOHwQHgdI118jRGdbW8Cqktj0LrMW7m0wM5EX9EuAiL3kEsvRJy-WvA/exec';

   constructor() { }
  
  /**
   * Envía los datos del formulario al script de Google App usando fetch API
   * para evitar problemas de CORS y Preflight.
   */
  sendData(data: any): Observable<any> {
    return new Observable(observer => {
      fetch(this.scriptURL, {
        method: 'POST',
        // 'Content-Type': 'text/plain;charset=utf-8' es clave para evitar OPTION preflight.
        // Google Apps Script recibirá esto y debe parsear el payload.
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      })
      .then(response => {
        // En modo no-cors o text/plain a veces la respuesta es opaca, 
        // pero si GAS devuelve texto plano, podemos intentar leerlo.
        // Si el status es 200 o 302, asumimos éxito.
        observer.next({ success: true });
        observer.complete();
      })
      .catch(error => {
        console.error("Error en fetch:", error);
        observer.error(error);
      });
    });
  }
}