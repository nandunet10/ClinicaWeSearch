import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { SharedModule } from './app/shared/shared.module';
import { PacientesModule } from './app/modules/pacientes/pacientes.module';
import { AtendimentosModule } from './app/modules/atendimentos/atendimentos.module';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, SharedModule, PacientesModule, AtendimentosModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));