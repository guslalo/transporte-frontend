import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, shareReplay } from 'rxjs';
import { API_CONFIG } from './api.config';
import {
  Ruta,
  CrearRuta,
  Horario,
  CrearHorario,
  Vehiculo,
  CrearVehiculo,
} from '../models/transport.models';

@Injectable({ providedIn: 'root' })
export class TransportApiService {
  constructor(private http: HttpClient) {}

  // ========================================
  // VEHÍCULOS (localhost:8080/vehiculos)
  // ========================================

  obtenerVehiculos() {
    return this.http
      .get<Vehiculo[]>(API_CONFIG.vehiculos.listar)
      .pipe(catchError(() => of([])), shareReplay(1));
  }

  crearVehiculo(datos: CrearVehiculo) {
    return this.http
      .post<Vehiculo>(API_CONFIG.vehiculos.crear, datos)
      .pipe(catchError((err) => {
        console.error('[API] Error creando vehículo:', err);
        return of(null);
      }));
  }

  eliminarVehiculo(id: string) {
    return this.http
      .delete<void>(API_CONFIG.vehiculos.eliminar(id))
      .pipe(catchError((err) => {
        console.error('[API] Error eliminando vehículo:', err);
        return of(null);
      }));
  }

  // ========================================
  // RUTAS (localhost:8090/rutas)
  // ========================================

  obtenerRutas() {
    return this.http
      .get<Ruta[]>(API_CONFIG.rutas.listar)
      .pipe(catchError(() => of([])), shareReplay(1));
  }

  crearRuta(datos: CrearRuta) {
    return this.http
      .post<Ruta>(API_CONFIG.rutas.crear, datos)
      .pipe(catchError((err) => {
        console.error('[API] Error creando ruta:', err);
        return of(null);
      }));
  }

  eliminarRuta(id: string) {
    return this.http
      .delete<void>(API_CONFIG.rutas.eliminar(id))
      .pipe(catchError((err) => {
        console.error('[API] Error eliminando ruta:', err);
        return of(null);
      }));
  }

  // ========================================
  // ASIGNACIONES (localhost:8070/asignaciones)
  // ========================================

  obtenerHorarios() {
    return this.http
      .get<Horario[]>(API_CONFIG.asignaciones.listar)
      .pipe(catchError(() => of([])), shareReplay(1));
  }

  crearHorario(datos: CrearHorario) {
    return this.http
      .post<Horario>(API_CONFIG.asignaciones.crear, datos)
      .pipe(catchError((err) => {
        console.error('[API] Error creando horario:', err);
        return of(null);
      }));
  }

  eliminarHorario(id: string) {
    return this.http
      .delete<void>(API_CONFIG.asignaciones.eliminar(id))
      .pipe(catchError((err) => {
        console.error('[API] Error eliminando horario:', err);
        return of(null);
      }));
  }
}
