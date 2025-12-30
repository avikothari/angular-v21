import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Demonstrates Angular v21 Signal features:
 * - signal(): Create reactive state
 * - computed(): Derive values from signals
 * - effect(): React to signal changes
 */
@Component({
  selector: 'app-signals-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-container">
      <h2>📡 Signals Demo</h2>
      
      <div class="section">
        <h3>Basic Signals</h3>
        <p>Count: <strong>{{ count() }}</strong></p>
        <button (click)="increment()">Increment</button>
        <button (click)="decrement()">Decrement</button>
        <button (click)="reset()">Reset</button>
      </div>

      <div class="section">
        <h3>Computed Signals</h3>
        <p>Double Count: <strong>{{ doubleCount() }}</strong></p>
        <p>Is Even: <strong>{{ isEven() ? 'Yes' : 'No' }}</strong></p>
        <p>Count Description: <strong>{{ countDescription() }}</strong></p>
      </div>

      <div class="section">
        <h3>Signal Updates</h3>
        <p>Name: <strong>{{ user().name }}</strong></p>
        <p>Age: <strong>{{ user().age }}</strong></p>
        <button (click)="updateUser()">Update User</button>
        <button (click)="incrementAge()">Birthday!</button>
      </div>

      <div class="section">
        <h3>Effect Tracking</h3>
        <p class="info">Check the console to see effect logs when signals change</p>
        <p>Effect run count: <strong>{{ effectRunCount() }}</strong></p>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      color: #dd0031;
      border-bottom: 2px solid #dd0031;
      padding-bottom: 0.5rem;
    }

    .section {
      margin: 2rem 0;
      padding: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #f9f9f9;
    }

    h3 {
      margin-top: 0;
      color: #333;
    }

    button {
      margin: 0.5rem 0.5rem 0.5rem 0;
      padding: 0.5rem 1rem;
      background: #dd0031;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    button:hover {
      background: #c50028;
    }

    .info {
      color: #666;
      font-style: italic;
    }

    strong {
      color: #dd0031;
    }
  `]
})
export class SignalsDemoComponent {
  // Basic writable signal
  count = signal(0);

  // Computed signals - automatically update when dependencies change
  doubleCount = computed(() => this.count() * 2);
  isEven = computed(() => this.count() % 2 === 0);
  countDescription = computed(() => {
    const value = this.count();
    if (value === 0) return 'Zero';
    if (value < 0) return 'Negative';
    if (value > 10) return 'Large number';
    return 'Positive';
  });

  // Complex signal with object
  user = signal({
    name: 'John Doe',
    age: 25
  });

  // Track effect runs
  effectRunCount = signal(0);

  constructor() {
    // Effect runs automatically when signals it reads change
    effect(() => {
      const currentCount = this.count();
      const currentUser = this.user();
      
      console.log('🔔 Effect triggered!');
      console.log('  Count:', currentCount);
      console.log('  User:', currentUser);
      
      this.effectRunCount.update(v => v + 1);
    });
  }

  increment() {
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }

  reset() {
    this.count.set(0);
  }

  updateUser() {
    // Update entire object
    this.user.set({
      name: 'Jane Smith',
      age: 30
    });
  }

  incrementAge() {
    // Update specific property
    this.user.update(user => ({
      ...user,
      age: user.age + 1
    }));
  }
}
