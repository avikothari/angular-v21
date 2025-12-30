import { Component, signal, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Demonstrates Angular v21's NEW linkedSignal() API
 * linkedSignal creates a writable signal that tracks another signal,
 * but can also be updated independently
 */
@Component({
  selector: 'app-linked-signal-demo',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="demo-container">
      <h2>🔗 Linked Signal Demo (New in v21)</h2>
      
      <div class="section">
        <h3>What is linkedSignal?</h3>
        <p class="description">
          <code>linkedSignal()</code> creates a writable signal that automatically 
          syncs with a source signal, but can also be modified independently. 
          When the source changes, the linked signal resets to match it.
        </p>
      </div>

      <div class="section">
        <h3>Example: Search with Reset</h3>
        
        <div class="control-group">
          <label>Source Value (API/Props):</label>
          <input 
            type="text" 
            [value]="sourceValue()" 
            (input)="sourceValue.set($any($event.target).value)"
            placeholder="Type source value"
          />
          <button (click)="resetSource()">Reset Source</button>
        </div>

        <div class="control-group">
          <label>Linked Value (Local State):</label>
          <input 
            type="text" 
            [value]="linkedValue()" 
            (input)="linkedValue.set($any($event.target).value)"
            placeholder="Type local value"
          />
          <p class="info">This value syncs from source but can be edited independently</p>
        </div>

        <div class="status">
          <p>Source Value: <strong>{{ sourceValue() }}</strong></p>
          <p>Linked Value: <strong>{{ linkedValue() }}</strong></p>
          <p class="hint">💡 When you change the source, the linked value resets to match it!</p>
        </div>
      </div>

      <div class="section">
        <h3>Example: Form with Default Values</h3>
        
        <div class="control-group">
          <label>Product Price (from API):</label>
          <input 
            type="number" 
            [value]="defaultPrice()" 
            (input)="defaultPrice.set(+$any($event.target).value)"
          />
          <button (click)="loadNewPrice()">Load New Price</button>
        </div>

        <div class="control-group">
          <label>Your Custom Price:</label>
          <input 
            type="number" 
            [value]="customPrice()" 
            (input)="customPrice.set(+$any($event.target).value)"
          />
          <p class="info">Edit price locally, resets when default price changes</p>
        </div>

        <div class="status">
          <p>Default Price: <strong>\${{ defaultPrice() }}</strong></p>
          <p>Custom Price: <strong>\${{ customPrice() }}</strong></p>
          <p>Discount: <strong>{{ discount() }}%</strong></p>
        </div>
      </div>

      <div class="section">
        <h3>Use Cases for linkedSignal()</h3>
        <ul>
          <li>✅ Form fields that reset when props/data changes</li>
          <li>✅ Local editable copies of remote data</li>
          <li>✅ Search inputs that reset when filters change</li>
          <li>✅ Temporary modifications that can be reverted</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      
      padding: 2rem;
      max-width: 900px;
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

    .description {
      background: #fff;
      padding: 1rem;
      border-left: 4px solid #dd0031;
      margin: 1rem 0;
    }

    code {
      background: #ffe6e6;
      padding: 0.2rem 0.5rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }

    .control-group {
      margin: 1rem 0;
      padding: 1rem;
      background: white;
      border-radius: 4px;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: #333;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    input:focus {
      outline: none;
      border-color: #dd0031;
    }

    button {
      margin-top: 0.5rem;
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

    .status {
      background: #e6f7ff;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }

    .info {
      color: #666;
      font-size: 0.9rem;
      font-style: italic;
      margin: 0.5rem 0;
    }

    .hint {
      color: #ff6b00;
      font-weight: bold;
    }

    strong {
      color: #dd0031;
    }

    ul {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }

    li {
      margin: 0.5rem 0;
      line-height: 1.6;
    }
  `]
})
export class LinkedSignalDemoComponent {
  // Example 1: Search with reset
  sourceValue = signal('Initial Value');
  
  // linkedSignal automatically syncs with sourceValue
  // but can also be updated independently
  linkedValue = linkedSignal(() => this.sourceValue());

  // Example 2: Form with default values
  defaultPrice = signal(99.99);
  
  // Custom price linked to default, but can be edited
  customPrice = linkedSignal(() => this.defaultPrice());
  
  // Computed discount based on the difference
  discount = signal(0);

  constructor() {
    // Watch for price changes to calculate discount
    this.updateDiscount();
  }

  resetSource() {
    this.sourceValue.set('Initial Value');
  }

  loadNewPrice() {
    const newPrice = Math.floor(Math.random() * 200) + 50;
    this.defaultPrice.set(newPrice);
  }

  private updateDiscount() {
    setInterval(() => {
      const def = this.defaultPrice();
      const custom = this.customPrice();
      if (custom < def) {
        const disc = Math.round(((def - custom) / def) * 100);
        this.discount.set(disc);
      } else {
        this.discount.set(0);
      }
    }, 500);
  }
}
