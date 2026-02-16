import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './pages/login/login.component';
import { ShellComponent } from './layout/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { RoutesComponent } from './pages/routes/routes.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: '',
		component: ShellComponent,
		canActivate: [MsalGuard],
		children: [
			{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'vehiculos', component: VehiclesComponent },
			{ path: 'rutas', component: RoutesComponent },
			{ path: 'horarios', component: SchedulesComponent }
		]
	},
	{ path: '**', redirectTo: 'dashboard' }
];
