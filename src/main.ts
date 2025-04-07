import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // 👈 IMPORTA QUESTO
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // 👈 ASSICURATI CHE IL FILE ESISTA

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes), // 👈 AGGIUNGI QUESTO
  ],
});
