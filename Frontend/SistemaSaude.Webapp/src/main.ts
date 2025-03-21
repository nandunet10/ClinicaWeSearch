
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
    providers: [
        // importProvidersFrom(BrowserModule, SharedModule, PacientesModule, AtendimentosModule),
        importProvidersFrom(CommonModule, FormsModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes)
    ]
})
    .catch(err => console.error(err));