import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'signals',
    loadComponent: () => import('./features/signals/signals-demo.component').then(m => m.SignalsDemoComponent)
  },
  {
    path: 'linked-signal',
    loadComponent: () => import('./features/linked-signal/linked-signal-demo.component').then(m => m.LinkedSignalDemoComponent)
  },
  {
    path: 'resource',
    loadComponent: () => import('./features/resource/resource-demo.component').then(m => m.ResourceDemoComponent)
  },
  {
    path: 'view-transitions',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/view-transitions/view-transitions.component').then(m => m.ViewTransitionsComponent)
      },
      {
        path: 'page1',
        loadComponent: () => import('./features/view-transitions/pages/page1.component').then(m => m.TransitionPage1Component)
      },
      {
        path: 'page2',
        loadComponent: () => import('./features/view-transitions/pages/page2.component').then(m => m.TransitionPage2Component)
      },
      {
        path: 'page3',
        loadComponent: () => import('./features/view-transitions/pages/page3.component').then(m => m.TransitionPage3Component)
      },
      {
        path: 'page4',
        loadComponent: () => import('./features/view-transitions/pages/page4.component').then(m => m.TransitionPage4Component)
      }
    ]
  },
  {
    path: 'hydration',
    loadComponent: () => import('./features/hydration/hydration-demo.component').then(m => m.HydrationDemoComponent)
  },
  {
    path: 'let-directive',
    loadComponent: () => import('./features/let-directive/let-directive-demo.component').then(m => m.LetDirectiveDemoComponent)
  },
  {
    path: 'control-flow',
    loadComponent: () => import('./features/control-flow/control-flow-demo.component').then(m => m.ControlFlowDemoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
