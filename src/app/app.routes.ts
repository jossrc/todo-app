import { Routes, RouterModule } from '@angular/router';
import { PendienteComponent } from './pages/pendiente/pendiente.component';
import { CompletadaComponent } from './pages/completada/completada.component';



const ROUTES: Routes = [
    {path: 'pendientes', component: PendienteComponent},
    {path: 'completadas', component: CompletadaComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'pendientes'}
];

export const APP_ROUTES =  RouterModule.forRoot(ROUTES);
