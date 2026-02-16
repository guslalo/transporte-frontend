import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CrearRuta } from '../../models/transport.models';
import { TransportApiService } from '../../services/transport-api.service';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent {
  private api = inject(TransportApiService);
  private fb = inject(FormBuilder);

  guardando = false;
  rutas$ = this.api.obtenerRutas();

  formulario = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(2)]],
    codigo: ['', [Validators.required, Validators.minLength(2)]],
    nombre: ['', [Validators.required]],
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    paradas: [10, [Validators.required, Validators.min(2), Validators.max(60)]],
    distanciaKm: [12, [Validators.required, Validators.min(1), Validators.max(200)]],
    colorHex: ['#1d4ed8', [Validators.required]]
  });

  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const raw = this.formulario.getRawValue();
    const datos: CrearRuta = {
      id: raw.id!,
      codigo: raw.codigo!,
      nombre: raw.nombre!,
      origen: raw.origen!,
      destino: raw.destino!,
      paradas: raw.paradas!,
      distanciaKm: raw.distanciaKm!,
      colorHex: raw.colorHex!
    };

    this.api
      .crearRuta(datos)
      .pipe(finalize(() => (this.guardando = false)))
      .subscribe(() => {
        this.rutas$ = this.api.obtenerRutas();
        this.formulario.reset({
          id: '',
          codigo: '',
          nombre: '',
          origen: '',
          destino: '',
          paradas: 10,
          distanciaKm: 12,
          colorHex: '#1d4ed8'
        });
      });
  }

  errorPara(nombreControl: string) {
    const control = this.formulario.get(nombreControl);
    if (!control || !control.touched || !control.errors) {
      return null;
    }
    if (control.errors['required']) {
      return 'Este campo es obligatorio.';
    }
    if (control.errors['min'] || control.errors['max']) {
      return 'Valor fuera de rango.';
    }
    return 'Valor inválido.';
  }
}
