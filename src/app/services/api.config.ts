// ============================================
// Configuración de APIs - Sistema de Transporte
// Conexión directa a cada microservicio
// ============================================

// Ubicación en tiempo real (AWS - siempre apunta a la IP fija)
const TRACKING_URL = 'http://34.234.136.98:8080';

// CRUD - Backend local
const VEHICULO_BASE = 'http://localhost:8080';
const RUTAS_BASE = 'http://localhost:8090';
const ASIGNACION_BASE = 'http://localhost:8070';

export const API_CONFIG = {
  // Tracking en tiempo real (AWS)
  tracking: {
    vehiculos: `${TRACKING_URL}/api/v1/vehicles`,
  },
  // CRUD (backend local)
  vehiculos: {
    listar: `${VEHICULO_BASE}/vehiculos`,
    crear: `${VEHICULO_BASE}/vehiculos`,
    obtener: (id: string) => `${VEHICULO_BASE}/vehiculos/${id}`,
    actualizar: (id: string) => `${VEHICULO_BASE}/vehiculos/${id}`,
    eliminar: (id: string) => `${VEHICULO_BASE}/vehiculos/${id}`,
  },
  rutas: {
    listar: `${RUTAS_BASE}/rutas`,
    crear: `${RUTAS_BASE}/rutas`,
    obtener: (id: string) => `${RUTAS_BASE}/rutas/${id}`,
    actualizar: (id: string) => `${RUTAS_BASE}/rutas/${id}`,
    eliminar: (id: string) => `${RUTAS_BASE}/rutas/${id}`,
  },
  asignaciones: {
    listar: `${ASIGNACION_BASE}/asignaciones`,
    crear: `${ASIGNACION_BASE}/asignaciones`,
    obtener: (id: string) => `${ASIGNACION_BASE}/asignaciones/${id}`,
    actualizar: (id: string) => `${ASIGNACION_BASE}/asignaciones/${id}`,
    eliminar: (id: string) => `${ASIGNACION_BASE}/asignaciones/${id}`,
  },
};
