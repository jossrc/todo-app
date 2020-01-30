import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PendienteComponent } from './pages/pendiente/pendiente.component';

// Rutas
import { APP_ROUTES } from './app.routes';
import { CompletadaComponent } from './pages/completada/completada.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PendienteComponent,
    CompletadaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
