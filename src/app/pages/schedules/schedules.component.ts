import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CrearHorario } from '../../models/transport.models';
import { TransportApiService } from '../../services/transport-api.service';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {
  private api = inject(TransportApiService);
  private fb = inject(FormBuilder);

  guardando = false;
  horarios$ = this.api.obtenerHorarios();

  formulario = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(2)]],
    rutaCodigo: ['', [Validators.required]],
    tipoDia: ['Laboral', [Validators.required]],
    horaInicio: ['05:00', [Validators.required]],
    horaFin: ['22:30', [Validators.required]],
    frecuenciaMin: [10, [Validators.required, Validators.min(5), Validators.max(60)]],
    zonaHoraria: ['America/Bogota', [Validators.required]],
    notas: ['']
  });

  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const raw = this.formulario.getRawValue();
    const datos: CrearHorario = {
      id: raw.id!,
      rutaCodigo: raw.rutaCodigo!,
      tipoDia: raw.tipoDia!,
      horaInicio: raw.horaInicio!,
      horaFin: raw.horaFin!,
      frecuenciaMin: raw.frecuenciaMin!,
      zonaHoraria: raw.zonaHoraria!,
      notas: raw.notas || undefined
    };

    this.api
      .crearHorario(datos)
      .pipe(finalize(() => (this.guardando = false)))
      .subscribe(() => {
        this.horarios$ = this.api.obtenerHorarios();
        this.formulario.reset({
          id: '',
          rutaCodigo: '',
          tipoDia: 'Laboral',
          horaInicio: '05:00',
          horaFin: '22:30',
          frecuenciaMin: 10,
          zonaHoraria: 'America/Bogota',
          notas: ''
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
