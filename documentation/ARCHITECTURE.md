# Angular v21 Project Architecture

This document provides a detailed overview of the project's architecture, structure, and design decisions.

## Project Overview

This is an Angular v21 demonstration application showcasing all major features introduced in Angular version 21. The project follows Angular best practices with a modular, component-based architecture.

## Directory Structure

```
angular-v21/
├── src/
│   ├── app/
│   │   ├── features/              # Feature modules
│   │   │   ├── control-flow/      # Control flow syntax demo
│   │   │   ├── hydration/         # Incremental hydration demo
│   │   │   ├── let-directive/     # @let directive demo
│   │   │   ├── linked-signal/     # Linked signals demo
│   │   │   ├── resource/          # Resource API demo
│   │   │   ├── signals/           # Signals demo
│   │   │   └── view-transitions/  # View transitions demo
│   │   ├── home/                  # Home component
│   │   ├── app.config.ts          # Application configuration
│   │   ├── app.config.server.ts   # Server-side configuration
│   │   ├── app.routes.ts          # Main routing configuration
│   │   ├── app.routes.server.ts   # Server-side routes
│   │   ├── app.ts                 # Root component
│   │   ├── app.html               # Root component template
│   │   └── app.css                # Root component styles
│   ├── index.html                 # Main HTML file
│   ├── main.ts                    # Client-side bootstrap
│   ├── main.server.ts             # Server-side bootstrap
│   └── styles.css                 # Global styles
├── public/                        # Static assets
├── docs/                          # Documentation
└── package.json                   # Dependencies and scripts
```

## Architecture Patterns

### 1. Component Architecture

- **Standalone Components**: All components use the standalone API (introduced in Angular 14, refined in v21)
- **Smart vs Presentational**: Each feature component is self-contained with its own state management
- **Lazy Loading**: All feature components are lazy-loaded for optimal performance

### 2. State Management

The application uses Angular's new reactive primitives:

- **Signals**: For synchronous reactive state
- **Linked Signals**: For synchronized writable signals that track a source
- **Resource API**: For async data management
- **Effects**: For side effects and reactive computations

### 3. Routing Strategy

```typescript
// Lazy-loaded routes with path-based code splitting
{
  path: 'feature-name',
  loadComponent: () => import('./features/feature/component')
    .then(m => m.ComponentName)
}
```

### 4. Server-Side Rendering (SSR)

- Built with Angular SSR (`@angular/ssr`)
- Incremental hydration enabled for performance
- Event replay for capturing user interactions before hydration

## Key Architectural Decisions

### 1. Standalone Components

**Decision**: Use standalone components exclusively
**Rationale**: 
- Simpler mental model
- Better tree-shaking
- No NgModule boilerplate
- Aligned with Angular's future direction

### 2. Signal-Based State

**Decision**: Use signals for all component state
**Rationale**:
- Better performance than Zone.js change detection
- More predictable than RxJS for simple state
- Type-safe and reactive
- Native to Angular v21

### 3. Feature-Based Organization

**Decision**: Organize by feature rather than file type
**Rationale**:
- Better scalability
- Easier to understand feature boundaries
- Promotes modularity
- Facilitates code splitting

### 4. Minimal External Dependencies

**Decision**: Use only Angular core features
**Rationale**:
- Showcase Angular's built-in capabilities
- Reduce bundle size
- Minimize security vulnerabilities
- Easier maintenance

## Performance Optimizations

### 1. Lazy Loading
- All feature components are lazy-loaded
- Reduces initial bundle size
- Improves First Contentful Paint (FCP)

### 2. Incremental Hydration
```typescript
provideClientHydration(
  withEventReplay(),
  withIncrementalHydration()
)
```
- Defers hydration of below-the-fold content
- Improves Time to Interactive (TTI)
- Better Core Web Vitals scores

### 3. View Transitions
```typescript
provideRouter(routes, withViewTransitions())
```
- Hardware-accelerated animations
- No JavaScript animation overhead
- Native browser performance

### 4. Signal-Based Change Detection
- More efficient than Zone.js patching
- Granular updates
- Predictable performance

## Component Communication Patterns

### 1. Parent-Child Communication
- **Input Signals**: Pass data down via signal inputs
- **Output Events**: Emit events up the component tree

### 2. Cross-Component Communication
- **Shared Signals**: Use signals in services for shared state
- **Resource API**: Share async data between components

### 3. Route-Based Communication
- **Route Parameters**: Pass data via routing
- **Route Data**: Static data in route configuration

## Testing Strategy

### 1. Unit Tests
- Component testing with Vitest
- Signal testing patterns
- Mocking strategies for resources

### 2. Integration Tests
- Route navigation testing
- SSR hydration testing
- Feature interaction testing

## Security Considerations

### 1. Template Security
- Automatic sanitization of dynamic content
- No direct DOM manipulation
- Type-safe templates

### 2. Dependency Security
- Minimal dependencies
- Regular updates via Angular CLI
- npm audit for vulnerability scanning

## Deployment Architecture

### 1. Build Output
```
dist/
├── angular-v21/
│   ├── browser/    # Client-side bundles
│   └── server/     # SSR server bundle
```

### 2. Deployment Options
- **Static Hosting**: Deploy browser bundle to CDN
- **Node.js Server**: Run SSR server for full features
- **Edge Functions**: Deploy SSR to edge workers

## Future Considerations

### 1. Scalability
- Feature modules can be extracted to libraries
- Shared components can be published to npm
- Micro-frontend architecture possible

### 2. Internationalization
- Prepared for i18n with standalone components
- Can add `@angular/localize` when needed

### 3. State Management Evolution
- Can integrate NgRx Signal Store if needed
- Resource API can be extended with custom loaders
- Effects can be organized into services

## Best Practices Applied

1. **Single Responsibility**: Each component has one clear purpose
2. **DRY (Don't Repeat Yourself)**: Shared logic extracted to utilities
3. **KISS (Keep It Simple)**: Minimal abstraction, maximum clarity
4. **Type Safety**: Full TypeScript usage with strict mode
5. **Accessibility**: Semantic HTML and ARIA attributes
6. **Performance First**: Lazy loading, tree-shaking, and optimization

This architecture provides a solid foundation for understanding Angular v21's capabilities while maintaining simplicity and performance.
