// ============================================
// Configuración de APIs - Sistema de Transporte
// ============================================

// Detectar automáticamente si estamos en producción o desarrollo
const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

// URL del BFF en Azure Container Apps
const BFF_PRODUCTION_URL = 'https://bff.victoriouscoast-64217b31.brazilsouth.azurecontainerapps.io';

// URL del API Management (alternativa)
const API_MANAGEMENT_URL = 'https://recurso-duoc.azure-api.net/transporte';

// URL local para desarrollo
const BFF_LOCAL_URL = 'http://localhost:8080';

// ============================================
// SELECCIÓN AUTOMÁTICA DE URL
// ============================================
// En producción usa API Management, en desarrollo usa localhost
// Cambia a BFF_PRODUCTION_URL si quieres ir directo al BFF sin API Manager
const BFF_BASE_URL = isProduction ? API_MANAGEMENT_URL : BFF_LOCAL_URL;

console.log('[API Config] Ambiente:', isProduction ? 'PRODUCCIÓN' : 'DESARROLLO');
console.log('[API Config] BFF URL:', BFF_BASE_URL);

// Microservicio de Vehículos (a través del BFF)
export const API_VEHICULOS = {
  baseUrl: `${BFF_BASE_URL}/api`,
  endpoints: {
    listar: '/vehiculos',           // GET - Listar todos los vehículos
    crear: '/vehiculos',            // POST - Crear un vehículo
    obtener: '/vehiculos',          // GET /{id} - Obtener un vehículo
    actualizar: '/vehiculos',       // PUT /{id} - Actualizar un vehículo
    eliminar: '/vehiculos',         // DELETE /{id} - Eliminar un vehículo
  }
};

// Microservicio de Rutas (a través del BFF)
export const API_RUTAS = {
  baseUrl: `${BFF_BASE_URL}/api`,
  endpoints: {
    listar: '/rutas',              // GET - Listar todas las rutas
    crear: '/rutas',               // POST - Crear una ruta
    obtener: '/rutas',             // GET /{id} - Obtener una ruta
    actualizar: '/rutas',          // PUT /{id} - Actualizar una ruta
    eliminar: '/rutas',            // DELETE /{id} - Eliminar una ruta
  }
};

// Microservicio de Asignación/Horarios (a través del BFF)
export const API_ASIGNACION = {
  baseUrl: `${BFF_BASE_URL}/api`,
  endpoints: {
    listar: '/asignaciones',       // GET - Listar todas las asignaciones
    crear: '/asignaciones',        // POST - Crear una asignación
    obtener: '/asignaciones',      // GET /{id} - Obtener una asignación
    actualizar: '/asignaciones',   // PUT /{id} - Actualizar una asignación
    eliminar: '/asignaciones',     // DELETE /{id} - Eliminar una asignación
  }
};

// URLs completas para facilidad de uso
export const API_CONFIG = {
  // BFF Base
  bffUrl: BFF_BASE_URL,

  // Microservicio de Vehículos
  vehiculos: {
    listar: `${API_VEHICULOS.baseUrl}${API_VEHICULOS.endpoints.listar}`,
    crear: `${API_VEHICULOS.baseUrl}${API_VEHICULOS.endpoints.crear}`,
    obtener: (id: string) => `${API_VEHICULOS.baseUrl}${API_VEHICULOS.endpoints.obtener}/${id}`,
    actualizar: (id: string) => `${API_VEHICULOS.baseUrl}${API_VEHICULOS.endpoints.actualizar}/${id}`,
    eliminar: (id: string) => `${API_VEHICULOS.baseUrl}${API_VEHICULOS.endpoints.eliminar}/${id}`,
    ubicaciones: `${API_VEHICULOS.baseUrl}/vehiculos/ubicaciones`,
  },

  // Microservicio de Rutas
  rutas: {
    listar: `${API_RUTAS.baseUrl}${API_RUTAS.endpoints.listar}`,
    crear: `${API_RUTAS.baseUrl}${API_RUTAS.endpoints.crear}`,
    obtener: (id: string) => `${API_RUTAS.baseUrl}${API_RUTAS.endpoints.obtener}/${id}`,
    actualizar: (id: string) => `${API_RUTAS.baseUrl}${API_RUTAS.endpoints.actualizar}/${id}`,
    eliminar: (id: string) => `${API_RUTAS.baseUrl}${API_RUTAS.endpoints.eliminar}/${id}`,
  },

  // Microservicio de Asignación (CRUD)
  asignaciones: {
    listar: `${API_ASIGNACION.baseUrl}${API_ASIGNACION.endpoints.listar}`,
    crear: `${API_ASIGNACION.baseUrl}${API_ASIGNACION.endpoints.crear}`,
    obtener: (id: string) => `${API_ASIGNACION.baseUrl}${API_ASIGNACION.endpoints.obtener}/${id}`,
    actualizar: (id: string) => `${API_ASIGNACION.baseUrl}${API_ASIGNACION.endpoints.actualizar}/${id}`,
    eliminar: (id: string) => `${API_ASIGNACION.baseUrl}${API_ASIGNACION.endpoints.eliminar}/${id}`,
  },

  // Microservicio de Asignación (endpoints específicos para dashboard)
  asignacion: {
    resumen: `${API_ASIGNACION.baseUrl}/asignaciones/resumen`,
    horarios: `${API_ASIGNACION.baseUrl}/asignaciones/horarios`,
    alertas: `${API_ASIGNACION.baseUrl}/asignaciones/alertas`,
  },

  // Usuario autenticado
  usuario: {
    info: `${BFF_BASE_URL}/api/user`,
  },

  // Health check
  health: `${BFF_BASE_URL}/health`,
};
