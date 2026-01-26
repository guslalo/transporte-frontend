// Configuración de MSAL para Microsoft Entra ID (Azure AD)
// Sistema de Transporte Público - DuocUC

import {
  BrowserCacheLocation,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication
} from '@azure/msal-browser';

// ============================================
// CONFIGURACIÓN DE MICROSOFT ENTRA ID
// ============================================

// Datos de tu aplicación registrada en Azure
const tenantId = '6e4d8661-adce-488c-9d02-e8f152ee6609';
const clientId = 'b32e213f-1949-47de-ba99-3a83a5477f28';

// ============================================
// CONFIGURAR URLS SEGÚN EL AMBIENTE
// ============================================
// Detectar automáticamente si estamos en producción o desarrollo
const isProduction = window.location.hostname !== 'localhost';

// URL del frontend en Azure Static Web Apps
const PRODUCTION_URL = 'https://victorious-wave-00896350f.6.azurestaticapps.net';
const LOCAL_URL = 'http://localhost:4200';

// Selección automática de URL
const REDIRECT_URI = isProduction ? PRODUCTION_URL : LOCAL_URL;

// Configuración de MSAL para Microsoft Entra ID
export const msalConfig = {
  auth: {
    clientId: clientId,
    // Authority para Microsoft Entra ID (no B2C)
    authority: `https://login.microsoftonline.com/${tenantId}`,
    // URI de redirección después del login (detecta automáticamente)
    redirectUri: REDIRECT_URI,
    // URI después del logout
    postLogoutRedirectUri: REDIRECT_URI,
    // Navegar a la URL original después del login
    navigateToLoginRequestUrl: true,
  },
  cache: {
    // Guardar tokens en localStorage para persistir entre pestañas
    cacheLocation: BrowserCacheLocation.LocalStorage,
    // No usar cookies
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error('[MSAL Error]', message);
            break;
          case LogLevel.Info:
            console.info('[MSAL Info]', message);
            break;
          case LogLevel.Verbose:
            console.debug('[MSAL Debug]', message);
            break;
          case LogLevel.Warning:
            console.warn('[MSAL Warning]', message);
            break;
        }
      },
      logLevel: LogLevel.Info, // Cambiar a LogLevel.Verbose para debugging
    }
  }
};

// Scopes para el login
// openid: obtener ID token con info del usuario
// profile: información básica del perfil
// email: dirección de email
// offline_access: refresh tokens
export const loginRequest = {
  scopes: ['openid', 'profile', 'email', 'User.Read']
};

// Configuración para llamadas al Backend
export const apiConfig = {
  // URL del API Management (producción)
  uri: 'https://recurso-duoc.azure-api.net/transporte/api',
  // URL local para desarrollo
  uriLocal: 'http://localhost:8080/api',
  // Scopes para acceder al backend
  scopes: ['openid', 'profile', 'email']
};

// Configuración del Guard de MSAL
export const msalGuardConfig = {
  interactionType: 'redirect' as const, // o 'popup'
  authRequest: loginRequest
};

// Configuración del Interceptor de MSAL
export const msalInterceptorConfig = {
  interactionType: 'redirect' as const,
  protectedResourceMap: new Map<string, Array<string>>([
    // Proteger llamadas al API Management (producción)
    ['https://recurso-duoc.azure-api.net/*', ['openid', 'profile', 'email']],
    // Proteger llamadas al BFF en Azure Container Apps
    ['https://bff.victoriouscoast-64217b31.brazilsouth.azurecontainerapps.io/*', ['openid', 'profile', 'email']],
    // Proteger llamadas al BFF local (desarrollo)
    ['http://localhost:8080/api/*', ['openid', 'profile', 'email']],
    // Microsoft Graph API (opcional)
    ['https://graph.microsoft.com/v1.0/me', ['User.Read']]
  ])
};

// Factory para crear la instancia de MSAL
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}
