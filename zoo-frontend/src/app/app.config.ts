import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAuth0, authHttpInterceptorFn } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authHttpInterceptorFn])
    ),
    provideAnimations(),
    provideAuth0({
      domain: 'dev-2vkuwcv6a1sf1mai.us.auth0.com',
      clientId: 'zYpaj12eaiypaC3EuXWzlMCjBTan8Nle',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/callback',
        audience: 'zoo-api'
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://localhost:3001/*',
            allowAnonymous: false
          }
        ]
      }
    })
  ]
};
