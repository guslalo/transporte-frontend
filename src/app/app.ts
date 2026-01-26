import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration
} from '@azure/msal-angular';
import {
  InteractionStatus,
  EventMessage,
  EventType
} from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class App implements OnInit, OnDestroy {
  private readonly destroying$ = new Subject<void>();
  isAuthenticated = false;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    // Manejar el redirect de MSAL después del login
    this.msalService.handleRedirectObservable().subscribe({
      next: (result) => {
        if (result) {
          console.log('[MSAL] Login exitoso:', result.account?.username);
        }
      },
      error: (error) => {
        console.error('[MSAL] Error en redirect:', error);
      }
    });

    // Escuchar cambios en el estado de interacción
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.destroying$)
      )
      .subscribe(() => {
        this.setAuthenticated();
      });

    // Escuchar eventos de login
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        takeUntil(this.destroying$)
      )
      .subscribe((result: EventMessage) => {
        console.log('[MSAL] Evento LOGIN_SUCCESS');
        this.setAuthenticated();
      });
  }

  setAuthenticated(): void {
    const accounts = this.msalService.instance.getAllAccounts();
    this.isAuthenticated = accounts.length > 0;

    if (this.isAuthenticated) {
      // Establecer la cuenta activa si hay cuentas
      this.msalService.instance.setActiveAccount(accounts[0]);
      console.log('[MSAL] Usuario autenticado:', accounts[0].username);
    }
  }

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
