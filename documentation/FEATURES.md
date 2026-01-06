# Angular v21 Features Documentation

This document provides detailed information about each Angular v21 feature demonstrated in this project.

## Table of Contents

1. [Signals](#signals)
2. [Linked Signals](#linked-signals)
3. [Resource API](#resource-api)
4. [View Transitions](#view-transitions)
5. [Incremental Hydration](#incremental-hydration)
6. [@let Directive](#let-directive)
7. [Control Flow Syntax](#control-flow-syntax)

---

## Signals

### Overview
Signals are Angular's new reactive primitive for managing synchronous state. They provide a simpler alternative to RxJS for local component state.

### Key Concepts

#### Creating Signals
```typescript
import { signal } from '@angular/core';

// Writable signal
const count = signal(0);

// Read value
console.log(count()); // 0

// Set value
count.set(5);

// Update value
count.update(v => v + 1);
```

#### Computed Signals
```typescript
import { computed } from '@angular/core';

const doubleCount = computed(() => count() * 2);
console.log(doubleCount()); // Automatically updates when count changes
```

#### Effects
```typescript
import { effect } from '@angular/core';

effect(() => {
  console.log('Count changed to:', count());
  // Runs whenever count changes
});
```

### Best Practices
- Use signals for local component state
- Use computed() for derived values
- Keep effects minimal and focused on side effects
- Prefer signals over BehaviorSubject for simple state

### Example from Project
```typescript
// From signals-demo.component.ts
count = signal(0);
doubleCount = computed(() => this.count() * 2);
isEven = computed(() => this.count() % 2 === 0);
```

---

## Linked Signals

### Overview
New in Angular v21, `linkedSignal()` creates a writable signal that automatically syncs with a source signal but can also be modified independently.

### Key Concepts

#### Creating Linked Signals
```typescript
import { signal, linkedSignal } from '@angular/core';

const sourceValue = signal('initial');
const linkedValue = linkedSignal(() => sourceValue());

// When source changes, linked resets
sourceValue.set('new value'); // linkedValue now also 'new value'

// But linked can be modified independently
linkedValue.set('custom value');
```

### Use Cases
1. **Form fields that reset on prop changes**
   ```typescript
   defaultPrice = signal(99.99);
   customPrice = linkedSignal(() => this.defaultPrice());
   ```

2. **Search inputs with external filters**
   ```typescript
   apiSearchTerm = signal('');
   localSearchTerm = linkedSignal(() => this.apiSearchTerm());
   ```

3. **Temporary edits with revert capability**
   ```typescript
   originalData = signal(userData);
   editableData = linkedSignal(() => this.originalData());
   ```

### Best Practices
- Use for values that need both external sync and local modification
- Perfect for form inputs that need to reset
- Ideal for draft/edit states

---

## Resource API

### Overview
The Resource API is Angular v21's declarative solution for async data loading, providing automatic state management for loading, success, and error states.

### Key Concepts

#### Basic Resource
```typescript
import { resource } from '@angular/core';

const usersResource = resource({
  loader: async () => {
    const response = await fetch('/api/users');
    return response.json();
  }
});
```

#### Resource States
```typescript
// Check loading state
if (usersResource.isLoading()) { }

// Access value
const users = usersResource.value();

// Check for errors
const error = usersResource.error();

// Get status
const status = usersResource.status(); // 'idle' | 'loading' | 'success' | 'error'

// Reload data
usersResource.reload();
```

#### Resource with Dependencies
```typescript
const userId = signal(1);

const userResource = resource({
  loader: async () => {
    // Automatically re-fetches when userId changes
    const id = userId();
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }
});
```

### Best Practices
- Use for component-level data fetching
- Replaces manual loading/error state management
- Automatically cancels pending requests
- Great alternative to RxJS for simple async operations

### Template Usage
```html
@if (usersResource.isLoading()) {
  <div>Loading...</div>
}

@if (usersResource.error(); as error) {
  <div>Error: {{ error.message }}</div>
}

@if (usersResource.value(); as users) {
  @for (user of users; track user.id) {
    <div>{{ user.name }}</div>
  }
}
```

---

## View Transitions

### Overview
Angular v21 integrates the native View Transitions API to provide smooth, hardware-accelerated animations between route changes.

### Configuration
```typescript
// app.config.ts
import { withViewTransitions } from '@angular/router';

provideRouter(
  routes,
  withViewTransitions()
)
```

### How It Works
1. Browser takes snapshot of current view
2. Updates DOM to new route
3. Animates between snapshots
4. All handled by browser, no JS overhead

### Customization

#### Basic Transition
```css
/* Global transition timing */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 300ms;
  animation-timing-function: ease-in-out;
}
```

#### Custom Animations
```css
/* Fade out old view */
::view-transition-old(root) {
  animation: fade-out 300ms ease-out;
}

/* Slide in new view */
::view-transition-new(root) {
  animation: slide-in 300ms ease-out;
}

@keyframes fade-out {
  to { opacity: 0; }
}

@keyframes slide-in {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```

#### Named Transitions
```css
/* In component styles */
.hero-image {
  view-transition-name: hero;
}

/* Shared element transitions */
::view-transition-old(hero),
::view-transition-new(hero) {
  animation-duration: 500ms;
}
```

### Best Practices
- Use for route transitions
- Keep animations under 300ms
- Test on lower-end devices
- Provide fallback for unsupported browsers

---

## Incremental Hydration

### Overview
Incremental hydration allows SSR applications to selectively hydrate components, improving initial page load performance.

### Configuration
```typescript
// app.config.ts
import { withIncrementalHydration } from '@angular/platform-browser';

provideClientHydration(
  withEventReplay(),
  withIncrementalHydration()
)
```

### Hydration Strategies

#### 1. Defer on Viewport
```typescript
@defer (on viewport) {
  <heavy-component />
} @placeholder {
  <div>Loading...</div>
}
```

#### 2. Defer on Interaction
```typescript
@defer (on interaction) {
  <interactive-widget />
} @placeholder {
  <div>Click to load</div>
}
```

#### 3. Defer on Idle
```typescript
@defer (on idle) {
  <analytics-component />
}
```

#### 4. Defer on Timer
```typescript
@defer (on timer(3s)) {
  <delayed-content />
}
```

### Loading States
```typescript
@defer (on viewport) {
  <content />
} @placeholder {
  <!-- Shown before loading -->
  <placeholder />
} @loading (minimum 200ms) {
  <!-- Shown during loading -->
  <spinner />
} @error {
  <!-- Shown on error -->
  <error-message />
}
```

### Performance Benefits
- Faster Time to Interactive (TTI)
- Reduced initial JavaScript execution
- Better Core Web Vitals scores
- Progressive enhancement

### Best Practices
- Defer below-the-fold content
- Prioritize critical above-the-fold components
- Use `on idle` for analytics and non-critical features
- Test with throttled network conditions

---

## @let Directive

### Overview
The `@let` directive (new in v21) allows you to declare template-local variables, reducing redundant calculations and improving readability.

### Basic Syntax
```html
@let variableName = expression;
```

### Use Cases

#### 1. Avoid Repeated Calculations
```html
<!-- Before -->
<p>Total: {{ calculateTotal() }}</p>
<p>With Tax: {{ calculateTotal() * 1.1 }}</p>
<p>Formatted: {{ calculateTotal().toFixed(2) }}</p>

<!-- After -->
@let total = calculateTotal();
<p>Total: {{ total }}</p>
<p>With Tax: {{ total * 1.1 }}</p>
<p>Formatted: {{ total.toFixed(2) }}</p>
```

#### 2. Complex Template Logic
```html
@let isEligible = user.age >= 18 && user.verified;
@let discount = isEligible ? 0.2 : 0;
@let finalPrice = basePrice * (1 - discount);

<div [class.eligible]="isEligible">
  <p>Price: ${{ finalPrice }}</p>
  @if (discount > 0) {
    <p>You saved: ${{ basePrice * discount }}</p>
  }
</div>
```

#### 3. Working with Arrays
```html
@let activeUsers = users.filter(u => u.active);
@let inactiveUsers = users.filter(u => !u.active);
@let activePercentage = (activeUsers.length / users.length * 100).toFixed(1);

<div>Active: {{ activeUsers.length }} ({{ activePercentage }}%)</div>
<div>Inactive: {{ inactiveUsers.length }}</div>
```

### Benefits
- **Performance**: Calculations happen once per change detection
- **Readability**: Cleaner templates with named values
- **Type Safety**: Full TypeScript inference
- **Debugging**: Easier to understand template logic

### Best Practices
- Use for expensive computations
- Name variables descriptively
- Keep calculations simple and focused
- Don't overuse - simple expressions are fine inline

---

## Control Flow Syntax

### Overview
Angular v21's new control flow syntax replaces structural directives with more readable, performant template syntax.

### @if / @else

#### Basic Conditional
```html
@if (isLoggedIn) {
  <dashboard />
} @else {
  <login-form />
}
```

#### Multiple Conditions
```html
@if (role === 'admin') {
  <admin-panel />
} @else if (role === 'user') {
  <user-dashboard />
} @else {
  <guest-content />
}
```

### @for

#### Basic Loop
```html
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

#### With Index and Other Variables
```html
@for (item of items; track item.id; let i = $index, let isFirst = $first) {
  <div [class.first]="isFirst">
    {{ i + 1 }}. {{ item.name }}
  </div>
}
```

#### Empty State
```html
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
} @empty {
  <p>No items found</p>
}
```

### @switch

```html
@switch (status) {
  @case ('pending') {
    <pending-icon />
  }
  @case ('approved') {
    <success-icon />
  }
  @case ('rejected') {
    <error-icon />
  }
  @default {
    <unknown-icon />
  }
}
```

### @defer

#### Basic Deferred Loading
```html
@defer {
  <heavy-component />
}
```

#### With Conditions
```html
@defer (when isReady) {
  <component />
}
```

#### With Triggers
```html
@defer (on viewport; prefetch on idle) {
  <component />
}
```

### Migration Guide

| Old Syntax | New Syntax |
|---|---|
| `*ngIf="condition"` | `@if (condition) { }` |
| `*ngFor="let item of items"` | `@for (item of items; track item.id) { }` |
| `[ngSwitch]="value"` | `@switch (value) { }` |
| `*ngIf="condition; else other"` | `@if (condition) { } @else { }` |

### Benefits
- **Performance**: Better tree-shaking and optimization
- **Readability**: More intuitive syntax
- **Type Safety**: Better TypeScript integration
- **Consistency**: Unified syntax for all control flow

### Best Practices
- Always use `track` in `@for` loops
- Use `@empty` for user-friendly empty states
- Prefer `@defer` for heavy components
- Keep conditions simple and readable

---

## Summary

Angular v21 introduces powerful features that improve both developer experience and application performance:

1. **Signals**: Simple, performant reactive state
2. **Linked Signals**: Synchronized writable signals
3. **Resource API**: Declarative async data handling
4. **View Transitions**: Native route animations
5. **Incremental Hydration**: Progressive SSR loading
6. **@let Directive**: Template variable declarations
7. **Control Flow**: Modern template syntax

These features work together to create faster, more maintainable Angular applications with better user experiences.
