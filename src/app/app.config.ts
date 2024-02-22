import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withRouterConfig } from '@angular/router';

import { ApplicationConfig } from '@angular/core';
import { authInterceptor } from './Pages/shared/auth/auth.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })), provideHttpClient(withInterceptors([authInterceptor])),],
};
