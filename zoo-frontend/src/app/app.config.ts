import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthModule, provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideAuth0({
      domain: 'dev-rkbeore70k0guhoo.us.auth0.com',
      clientId: 'VOTRE_CLIENT_ID', // Remplacez par votre client ID
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'http://localhost:3001'
      }
    })
  ]
};
