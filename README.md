# Angular v21 Features Showcase

A comprehensive demonstration of all the major features introduced in Angular version 21. This project serves as an interactive learning resource to understand and explore Angular's latest capabilities.

## 🚀 Features Demonstrated

### 1. **Signals** (`/signals`)
- **signal()**: Create reactive state
- **computed()**: Derive values from signals automatically
- **effect()**: React to signal changes
- Examples with basic signals, computed signals, and side effects

### 2. **Linked Signals** (`/linked-signal`) ⭐ NEW in v21
- **linkedSignal()**: Create writable signals that sync with a source signal
- Use cases: Form fields that reset when props change, local editable copies of remote data
- Examples with search inputs, form defaults, and temporary modifications

### 3. **Resource API** (`/resource`) ⭐ NEW in v21
- **resource()**: Declarative async data loading
- Built-in loading, error, and success states
- Automatic cancellation of pending requests
- Examples with REST API calls and state management

### 4. **View Transitions** (`/view-transitions`)
- Native View Transitions API integration
- Smooth route animations with `withViewTransitions()`
- Automatic cross-fade between routes
- Customizable animation timing

### 5. **Incremental Hydration** (`/hydration`)
- Progressive SSR hydration for better performance
- `@defer` with multiple triggers:
  - `on viewport`: Load when scrolled into view
  - `on interaction`: Load on user interaction
  - `on idle`: Load when browser is idle
  - `on timer`: Load after specific delay
- `@placeholder`, `@loading`, and `@error` states

### 6. **@let Directive** (`/let-directive`) ⭐ NEW in v21
- Template-local variables for computed values
- Reduce redundant calculations
- Improve template readability
- Better type inference
- Examples with complex calculations, conditionals, and array operations

### 7. **Control Flow Syntax** (`/control-flow`)
- **@if / @else**: Conditional rendering (replaces *ngIf)
- **@for**: List rendering with track (replaces *ngFor)
- **@switch / @case / @default**: Multiple conditions (replaces ngSwitch)
- **@defer**: Lazy loading with various triggers
- **@empty**: Handle empty states in @for loops

## 🎯 Key Angular v21 Improvements

### Performance
- ✅ Optimized rendering with signals
- ✅ Incremental hydration for faster TTI
- ✅ Better tree-shaking
- ✅ Improved change detection

### Developer Experience
- ✅ Type-safe template syntax
- ✅ Cleaner control flow
- ✅ Better TypeScript integration
- ✅ More intuitive APIs

### Modern Web Standards
- ✅ View Transitions API
- ✅ Native browser features
- ✅ Hardware-accelerated animations
- ✅ Progressive enhancement

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🏗️ Project Structure

```
src/app/
├── home/                          # Home page with feature overview
├── features/
│   ├── signals/                   # Signals demonstration
│   ├── linked-signal/             # Linked signals (NEW v21)
│   ├── resource/                  # Resource API (NEW v21)
│   ├── view-transitions/          # View Transitions
│   │   └── pages/                 # Transition demo pages
│   ├── hydration/                 # Incremental hydration
│   ├── let-directive/             # @let directive (NEW v21)
│   └── control-flow/              # Control flow syntax
├── app.config.ts                  # App configuration with v21 features
├── app.routes.ts                  # Route definitions
└── app.ts                         # Root component
```

## 🛠️ Configuration

### Enable View Transitions
```typescript
// app.config.ts
import { withViewTransitions } from '@angular/router';

provideRouter(
  routes,
  withViewTransitions()
)
```

### Enable Incremental Hydration
```typescript
// app.config.ts
import { withIncrementalHydration } from '@angular/platform-browser';

provideClientHydration(
  withEventReplay(),
  withIncrementalHydration()
)
```

## 📚 Learning Path

1. **Start with Signals** - Understand reactive state management
2. **Explore Linked Signals** - Learn about synchronized writable signals
3. **Try Resource API** - See declarative async data handling
4. **Experience View Transitions** - Navigate between pages smoothly
5. **Understand @let Directive** - Optimize template calculations
6. **Master Control Flow** - Use modern template syntax
7. **Explore Hydration** - Learn progressive SSR loading

## 💡 Tips

1. **Signals vs Observables**: Use signals for local state, observables for streams
2. **linkedSignal Use Cases**: Form inputs that reset, local copies of props
3. **Resource API**: Perfect for component-level data fetching
4. **@defer Strategies**: Choose based on content priority
5. **View Transitions**: Works best with structural route changes

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
