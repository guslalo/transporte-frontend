import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TransportApiService } from '../../services/transport-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private api = inject(TransportApiService);

  vehiculos$ = this.api.obtenerVehiculos();
  rutas$ = this.api.obtenerRutas();
  horarios$ = this.api.obtenerHorarios();

  estadoBadge(estado: string) {
    if (estado === 'Inactivo') {
      return 'badge badge-warning';
    }
    if (estado === 'Mantenimiento') {
      return 'badge badge-danger';
    }
    return 'badge badge-success';
  }
}
