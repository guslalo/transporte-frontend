// ============================================
// Modelos alineados 1:1 con el nuevo backend
// ============================================

// Vehículos (backend: veh_vehiculo - puerto 8080)
export interface Vehiculo {
  id: string;
  codigo: string;
  placa: string;
  modelo: string;
  capacidad: number;
  conductor: string;
  estado: string;
  ocupacion: number;
  creadoEn: string;
  actualizadoEn: string;
}

export interface CrearVehiculo {
  id: string;
  codigo: string;
  placa: string;
  modelo: string;
  capacidad: number;
  conductor: string;
  estado: string;
  ocupacion?: number;
}

// Rutas (backend: rut_ruta - puerto 8090)
export interface Ruta {
  id: string;
  codigo: string;
  nombre: string;
  origen: string;
  destino: string;
  paradas: number;
  distanciaKm: number;
  colorHex: string;
  creadoEn: string;
  actualizadoEn: string;
}

export interface CrearRuta {
  id: string;
  codigo: string;
  nombre: string;
  origen: string;
  destino: string;
  paradas: number;
  distanciaKm: number;
  colorHex: string;
}

// Asignación/Horarios (backend: asig_horario - puerto 8070)
export interface Horario {
  id: string;
  rutaCodigo: string;
  tipoDia: string;
  horaInicio: string;
  horaFin: string;
  frecuenciaMin: number;
  zonaHoraria: string;
  notas?: string;
  creadoEn: string;
  actualizadoEn: string;
}

export interface CrearHorario {
  id: string;
  rutaCodigo: string;
  tipoDia: string;
  horaInicio: string;
  horaFin: string;
  frecuenciaMin: number;
  zonaHoraria: string;
  notas?: string;
}