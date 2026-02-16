import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType
} from '@azure/msal-browser';
import {
  MsalInterceptor,
  MSAL_INSTANCE,
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalGuard,
  MsalBroadcastService
} from '@azure/msal-angular';
import { msalConfig, loginRequest } from './auth-config';

// ============================================
// CONFIGURACIÓN DE MSAL PARA MICROSOFT ENTRA ID
// ============================================

// Factory para crear la instancia de MSAL
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

// Configuración del Guard de MSAL (protege rutas)
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest
  };
}

// Configuración del Interceptor de MSAL (añade tokens a peticiones HTTP)
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  // Proteger llamadas a microservicios en Azure Container Apps (producción)
  protectedResourceMap.set('https://vehiculo.victoriouscoast-64217b31.brazilsouth.azurecontainerapps.io/*', ['api://b32e213f-1949-47de-ba99-3a83a5477f28/access_as_user']);
  protectedResourceMap.set('https://rutas.victoriouscoast-64217b31.brazilsouth.azurecontainerapps.io/*', ['api://b32e213f-1949-47de-ba99-3a83a5477f28/access_as_user']);
  protectedResourceMap.set('https://asignacion.victoriouscoast-64217b31.brazilsouth.azurecontainerapps.io/*', ['api://b32e213f-1949-47de-ba99-3a83a5477f28/access_as_user']);
  protectedResourceMap.set('https://bff.victoriouscoast-64217b31.brazilsouth.azurecontainerapps.io/*', ['api://b32e213f-1949-47de-ba99-3a83a5477f28/access_as_user']);

  // Proteger llamadas al API Management (producción alternativa)
  protectedResourceMap.set('https://recurso-duoc.azure-api.net/*', ['api://b32e213f-1949-47de-ba99-3a83a5477f28/access_as_user']);

  // Proteger llamadas locales (desarrollo)
  protectedResourceMap.set('http://localhost:8080/*', ['api://b32e213f-1949-47de-ba99-3a83a5477f28/access_as_user']);
  protectedResourceMap.set('http://localhost:8090/*', ['api://b32e213f-1949-47de-ba99-3a83a5477f28/access_as_user']);
  protectedResourceMap.set('http://localhost:8070/*', ['api://b32e213f-1949-47de-ba99-3a83a5477f28/access_as_user']);

  // Microsoft Graph API (opcional)
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['User.Read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ]
};
