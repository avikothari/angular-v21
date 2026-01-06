# Angular v21 API Reference

This document provides a comprehensive API reference for all components and services in the Angular v21 demo project.

## Components

### App Component
**Path**: `src/app/app.ts`  
**Selector**: `app-root`  
**Standalone**: Yes

#### Properties
| Name | Type | Description |
|------|------|-------------|
| `title` | `WritableSignal<string>` | Application title |
| `mobileMenuOpen` | `WritableSignal<boolean>` | Mobile menu state |

#### Methods
| Name | Parameters | Returns | Description |
|------|------------|---------|-------------|
| `toggleMobileMenu()` | None | `void` | Toggles mobile menu visibility |
| `closeMobileMenu()` | None | `void` | Closes mobile menu |

---

### HomeComponent
**Path**: `src/app/home/home.component.ts`  
**Selector**: `app-home`  
**Standalone**: Yes

#### Features
- Overview of all Angular v21 features
- Navigation cards to each feature demo
- Feature descriptions and highlights

---

### SignalsDemoComponent
**Path**: `src/app/features/signals/signals-demo.component.ts`  
**Selector**: `app-signals-demo`  
**Standalone**: Yes

#### Signals
| Name | Type | Initial Value | Description |
|------|------|---------------|-------------|
| `count` | `WritableSignal<number>` | `0` | Counter value |
| `user` | `WritableSignal<{name: string, age: number}>` | `{name: 'John Doe', age: 25}` | User object |
| `effectRunCount` | `WritableSignal<number>` | `0` | Effect execution counter |

#### Computed Signals
| Name | Type | Description |
|------|------|-------------|
| `doubleCount` | `Signal<number>` | Returns `count() * 2` |
| `isEven` | `Signal<boolean>` | Returns `count() % 2 === 0` |
| `countDescription` | `Signal<string>` | Returns description based on count value |

#### Methods
| Name | Parameters | Returns | Description |
|------|------------|---------|-------------|
| `increment()` | None | `void` | Increments count by 1 |
| `decrement()` | None | `void` | Decrements count by 1 |
| `reset()` | None | `void` | Resets count to 0 |
| `updateUser()` | None | `void` | Updates entire user object |
| `incrementAge()` | None | `void` | Increments user age |

#### Effects
- Logs count and user changes to console
- Updates effect run counter

---

### LinkedSignalDemoComponent
**Path**: `src/app/features/linked-signal/linked-signal-demo.component.ts`  
**Selector**: `app-linked-signal-demo`  
**Standalone**: Yes

#### Signals
| Name | Type | Description |
|------|------|-------------|
| `sourceValue` | `WritableSignal<string>` | Source value for linked signal |
| `linkedValue` | `LinkedSignal<string>` | Linked to sourceValue |
| `defaultPrice` | `WritableSignal<number>` | Default product price |
| `customPrice` | `LinkedSignal<number>` | Linked to defaultPrice |
| `discount` | `WritableSignal<number>` | Calculated discount percentage |

#### Methods
| Name | Parameters | Returns | Description |
|------|------------|---------|-------------|
| `resetSource()` | None | `void` | Resets source to initial value |
| `loadNewPrice()` | None | `void` | Loads random new price |

---

### ResourceDemoComponent
**Path**: `src/app/features/resource/resource-demo.component.ts`  
**Selector**: `app-resource-demo`  
**Standalone**: Yes

#### Resources
| Name | Type | Description |
|------|------|-------------|
| `usersResource` | `Resource<User[]>` | Fetches users from API |
| `postsResource` | `Resource<Post[]>` | Fetches posts with delay |

#### Interfaces
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
```

#### Resource Methods
- `.value()` - Get current value
- `.isLoading()` - Check if loading
- `.error()` - Get error if any
- `.status()` - Get current status
- `.reload()` - Reload data

---

### ViewTransitionsComponent
**Path**: `src/app/features/view-transitions/view-transitions.component.ts`  
**Selector**: `app-view-transitions`  
**Standalone**: Yes

#### Features
- Navigation to 4 demo pages
- Each page has different theme color
- Automatic view transitions on navigation

#### Child Routes
| Path | Component | Theme |
|------|-----------|-------|
| `/view-transitions/page1` | `TransitionPage1Component` | Red |
| `/view-transitions/page2` | `TransitionPage2Component` | Blue |
| `/view-transitions/page3` | `TransitionPage3Component` | Green |
| `/view-transitions/page4` | `TransitionPage4Component` | Orange |

---

### HydrationDemoComponent
**Path**: `src/app/features/hydration/hydration-demo.component.ts`  
**Selector**: `app-hydration-demo`  
**Standalone**: Yes

#### Signals
| Name | Type | Description |
|------|------|-------------|
| `currentTime` | `WritableSignal<string>` | Current time display |
| `clickCounter` | `WritableSignal<number>` | Interaction counter |
| `showContent` | `WritableSignal<boolean>` | Content visibility |

#### Methods
| Name | Parameters | Returns | Description |
|------|------------|---------|-------------|
| `incrementCounter()` | None | `void` | Increments click counter |
| `toggleShow()` | None | `void` | Toggles content visibility |

#### Defer Strategies Demonstrated
- `@defer (on idle)` - Loads when browser idle
- `@defer (on interaction)` - Loads on user interaction
- `@defer (on timer(3s))` - Loads after 3 seconds
- `@defer (on viewport)` - Loads when scrolled into view

---

### LetDirectiveDemoComponent
**Path**: `src/app/features/let-directive/let-directive-demo.component.ts`  
**Selector**: `app-let-directive-demo`  
**Standalone**: Yes

#### Properties
| Name | Type | Description |
|------|------|-------------|
| `userName` | `string` | User name for greeting |
| `selectedRole` | `string` | Selected user role |
| `price` | `WritableSignal<number>` | Product price |
| `quantity` | `WritableSignal<number>` | Product quantity |
| `taxRate` | `WritableSignal<number>` | Tax rate percentage |

#### Methods
| Name | Parameters | Returns | Description |
|------|------------|---------|-------------|
| `getUsers()` | None | `User[]` | Returns array of users |
| `getActiveUsers()` | `users: User[]` | `User[]` | Filters active users |
| `getInactiveUsers()` | `users: User[]` | `User[]` | Filters inactive users |

#### Template Variables Examples
- `@let greeting = 'Hello, ' + userName + '!'`
- `@let subtotal = price() * quantity()`
- `@let isAdmin = selectedRole === 'admin'`

---

### ControlFlowDemoComponent
**Path**: `src/app/features/control-flow/control-flow-demo.component.ts`  
**Selector**: `app-control-flow-demo`  
**Standalone**: Yes

#### Signals
| Name | Type | Description |
|------|------|-------------|
| `isLoggedIn` | `WritableSignal<boolean>` | Login state |
| `userType` | `WritableSignal<string>` | User type (admin/moderator/user) |
| `tasks` | `WritableSignal<Task[]>` | Task list |
| `currentTheme` | `WritableSignal<string>` | Selected theme |
| `interactionCount` | `WritableSignal<number>` | Interaction counter |

#### Interfaces
```typescript
interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}
```

#### Methods
| Name | Parameters | Returns | Description |
|------|------------|---------|-------------|
| `toggleLogin()` | None | `void` | Toggles login state |
| `cycleUserType()` | None | `void` | Cycles through user types |
| `addTask()` | None | `void` | Adds new task |
| `removeTask()` | None | `void` | Removes last task |
| `shuffleTasks()` | None | `void` | Shuffles task order |
| `toggleTask()` | `id: number` | `void` | Toggles task completion |
| `deleteTask()` | `id: number` | `void` | Deletes task by ID |
| `setTheme()` | `theme: string` | `void` | Sets current theme |

---

## Configuration Files

### app.config.ts
Main application configuration with Angular v21 features enabled.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withViewTransitions() // Enable View Transitions
    ),
    provideClientHydration(
      withEventReplay(),
      withIncrementalHydration() // Enable Incremental Hydration
    )
  ]
};
```

### app.routes.ts
Routing configuration with lazy-loaded components.

```typescript
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component')
      .then(m => m.HomeComponent)
  },
  // ... other routes
];
```

---

## Styling Patterns

### Component Styles
- Each component uses encapsulated styles
- Consistent color scheme with Angular red (#dd0031)
- Responsive design with media queries
- CSS Grid and Flexbox for layouts

### Common CSS Classes

#### Status Classes
- `.loading` - Loading state styling
- `.error` - Error state styling  
- `.success` - Success state styling
- `.placeholder` - Placeholder styling

#### Layout Classes
- `.demo-container` - Main container wrapper
- `.section` - Section wrapper
- `.example` - Example area
- `.controls` - Control buttons area

#### Animation Classes
- `.spinner` - Loading spinner animation
- `.skeleton` - Skeleton loading animation

---

## TypeScript Configurations

### tsconfig.json
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022", "dom"],
    "useDefineForClassFields": false,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Key TypeScript Features Used
- Strict mode enabled
- ES2022 features
- Type inference with signals
- Decorators for components
- Async/await for resources

---

## Testing Patterns

### Component Testing
```typescript
import { TestBed } from '@angular/core/testing';
import { SignalsDemoComponent } from './signals-demo.component';

describe('SignalsDemoComponent', () => {
  it('should increment count', () => {
    const component = new SignalsDemoComponent();
    expect(component.count()).toBe(0);
    component.increment();
    expect(component.count()).toBe(1);
  });
});
```

### Signal Testing
```typescript
it('should compute double count', () => {
  const component = new SignalsDemoComponent();
  component.count.set(5);
  expect(component.doubleCount()).toBe(10);
});
```

### Resource Testing
```typescript
it('should load users', async () => {
  const component = new ResourceDemoComponent();
  await component.usersResource.reload();
  expect(component.usersResource.value()).toBeDefined();
});
```

---

## Browser Compatibility

### Supported Browsers
- Chrome/Edge 90+
- Firefox 88+
- Safari 15+

### Required APIs
- View Transitions API (Chrome 111+)
- Signals (Angular polyfill)
- ES2022 features

### Fallbacks
- View transitions gracefully degrade
- SSR provides initial content
- Progressive enhancement approach

---

## Performance Metrics

### Bundle Sizes
- Initial bundle: ~50KB (gzipped)
- Lazy chunks: 5-10KB each
- Total size: ~150KB (all features)

### Loading Performance
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Largest Contentful Paint: < 2.5s

### Runtime Performance
- Signal updates: O(1)
- Computed signals: Cached
- Effects: Batched updates
- Change detection: On-demand
