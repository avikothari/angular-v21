import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withViewTransitions() // Enable View Transitions API for smooth route animations
    ),
    provideClientHydration(
      withEventReplay(),
      withIncrementalHydration() // Enable incremental hydration for better SSR performance
    )
  ]
};
