import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { DataService } from '../../services/data.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    ReactiveFormsModule 
  ], 
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export default class RegistroComponent implements OnInit {
  
  registroForm!: FormGroup;
  isSending: boolean = false; 

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18)]], 
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], 
      estadoCivil: ['', Validators.required]
    });
  }

  // Acceso fácil a los controles para el HTML
  get f() { return this.registroForm.controls; }

  onSubmit() {
    if (this.registroForm.valid) {
      this.isSending = true; // Empieza la carga
      const dataToSend = this.registroForm.value;
      
      this.dataService.sendData(dataToSend).subscribe({
        next: (response) => {
          this.isSending = false; // Envío terminado
          
          // Mostrar Modal de Éxito
          const successModalElement = document.getElementById('successModal');
          if (successModalElement) {
              // @ts-ignore
              const modal = new bootstrap.Modal(successModalElement, { backdrop: false });
              modal.show();
          }
          
          this.registroForm.reset(); 
          this.registroForm.get('estadoCivil')?.setValue('', { emitEvent: false }); 

        },
        error: (error) => {
          this.isSending = false; // Envío terminado
          console.error('Error al enviar el registro:', error);
          alert('❌ Hubo un error al enviar el registro. Revisa la consola para más detalles.');
        }
      });
    } else {
        this.registroForm.markAllAsTouched();
        alert('⚠️ Por favor, corrige los errores del formulario para continuar.');
    }
  }
  goHome() {
    // Cerrar modal si es necesario (Bootstrap modal se cierra solo con data-bs-dismiss pero la navegación es extra)
    // Navegar al inicio
    this.router.navigate(['/']);
  }
}