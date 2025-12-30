import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Demonstrates Angular v21's @let directive
 * @let allows you to define template variables for computed values
 * reducing redundant computations and improving template readability
 */
@Component({
  selector: 'app-let-directive-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="demo-container">
      <h2>📝 &#64;let Directive (New in v21)</h2>
      
      <div class="section">
        <h3>What is &#64;let?</h3>
        <p class="description">
          The <code>&#64;let</code> directive allows you to create template-local variables 
          to store computed values, improving readability and performance by avoiding 
          redundant calculations.
        </p>
        
        <div class="features">
          <h4>Benefits:</h4>
          <ul>
            <li>✅ Cache expensive computations in templates</li>
            <li>✅ Improve template readability</li>
            <li>✅ Reduce duplicate function calls</li>
            <li>✅ Better type inference</li>
            <li>✅ Cleaner conditional logic</li>
          </ul>
        </div>
      </div>

      <div class="section">
        <h3>Example 1: Simple Value Assignment</h3>
        
        <div class="example">
          <p>Enter your name:</p>
          <input 
            type="text" 
            [(ngModel)]="userName" 
            placeholder="Type your name"
          />
          
          <!-- Using @let to store computed value -->
          @let greeting = 'Hello, ' + userName + '!';
          @let upperGreeting = greeting.toUpperCase();
          @let greetingLength = greeting.length;
          
          <div class="result">
            <p><strong>Greeting:</strong> {{ greeting }}</p>
            <p><strong>Upper Case:</strong> {{ upperGreeting }}</p>
            <p><strong>Length:</strong> {{ greetingLength }} characters</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Example 2: Complex Calculations</h3>
        
        <div class="example">
          <p>Adjust values:</p>
          <div class="controls">
            <label>
              Price: \${{ price() }}
              <input 
                type="range" 
                min="10" 
                max="1000" 
                [value]="price()" 
                (input)="price.set(+$any($event.target).value)"
              />
            </label>
            
            <label>
              Quantity: {{ quantity() }}
              <input 
                type="range" 
                min="1" 
                max="50" 
                [value]="quantity()" 
                (input)="quantity.set(+$any($event.target).value)"
              />
            </label>
            
            <label>
              Tax Rate: {{ taxRate() }}%
              <input 
                type="range" 
                min="0" 
                max="25" 
                [value]="taxRate()" 
                (input)="taxRate.set(+$any($event.target).value)"
              />
            </label>
          </div>
          
          <!-- Using @let for complex calculations -->
          @let subtotal = price() * quantity();
          @let tax = subtotal * (taxRate() / 100);
          @let total = subtotal + tax;
          @let discount = total > 500 ? total * 0.1 : 0;
          @let finalTotal = total - discount;
          
          <div class="invoice">
            <h4>💰 Invoice</h4>
            <table>
              <tr>
                <td>Subtotal:</td>
                <td>\${{ subtotal.toFixed(2) }}</td>
              </tr>
              <tr>
                <td>Tax ({{ taxRate() }}%):</td>
                <td>\${{ tax.toFixed(2) }}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>\${{ total.toFixed(2) }}</td>
              </tr>
              @if (discount > 0) {
                <tr class="discount-row">
                  <td>Discount (10%):</td>
                  <td>-\${{ discount.toFixed(2) }}</td>
                </tr>
              }
              <tr class="total-row">
                <td><strong>Final Total:</strong></td>
                <td><strong>\${{ finalTotal.toFixed(2) }}</strong></td>
              </tr>
            </table>
            
            @if (discount > 0) {
              <p class="savings">🎉 You saved \${{ discount.toFixed(2) }}!</p>
            }
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Example 3: Conditional Logic</h3>
        
        <div class="example">
          <p>Select user role:</p>
          <select [(ngModel)]="selectedRole">
            <option value="guest">Guest</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
          
          <!-- Using @let for permission checks -->
          @let isGuest = selectedRole === 'guest';
          @let isUser = selectedRole === 'user';
          @let isAdmin = selectedRole === 'admin' || selectedRole === 'superadmin';
          @let isSuperAdmin = selectedRole === 'superadmin';
          @let canRead = !isGuest;
          @let canWrite = isUser || isAdmin;
          @let canDelete = isAdmin;
          @let canManageUsers = isSuperAdmin;
          
          <div class="permissions">
            <h4>🔐 Permissions for: <span>{{ selectedRole }}</span></h4>
            <ul>
              <li [class.allowed]="canRead" [class.denied]="!canRead">
                {{ canRead ? '✅' : '❌' }} Read Access
              </li>
              <li [class.allowed]="canWrite" [class.denied]="!canWrite">
                {{ canWrite ? '✅' : '❌' }} Write Access
              </li>
              <li [class.allowed]="canDelete" [class.denied]="!canDelete">
                {{ canDelete ? '✅' : '❌' }} Delete Access
              </li>
              <li [class.allowed]="canManageUsers" [class.denied]="!canManageUsers">
                {{ canManageUsers ? '✅' : '❌' }} Manage Users
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Example 4: Working with Arrays</h3>
        
        <div class="example">
          @let users = getUsers();
          @let activeUsers = getActiveUsers(users);
          @let inactiveUsers = getInactiveUsers(users);
          @let totalUsers = users.length;
          @let activeCount = activeUsers.length;
          @let inactiveCount = inactiveUsers.length;
          @let activePercentage = (activeCount / totalUsers * 100).toFixed(1);
          
          <div class="stats">
            <h4>👥 User Statistics</h4>
            <div class="stat-grid">
              <div class="stat-card">
                <div class="stat-value">{{ totalUsers }}</div>
                <div class="stat-label">Total Users</div>
              </div>
              <div class="stat-card active">
                <div class="stat-value">{{ activeCount }}</div>
                <div class="stat-label">Active ({{ activePercentage }}%)</div>
              </div>
              <div class="stat-card inactive">
                <div class="stat-value">{{ inactiveCount }}</div>
                <div class="stat-label">Inactive</div>
              </div>
            </div>
            
            <div class="user-lists">
              <div class="user-column">
                <h5>Active Users</h5>
                @for (user of activeUsers; track user.id) {
                  <div class="user-badge active">{{ user.name }}</div>
                }
              </div>
              
              <div class="user-column">
                <h5>Inactive Users</h5>
                @for (user of inactiveUsers; track user.id) {
                  <div class="user-badge inactive">{{ user.name }}</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Syntax Comparison</h3>
        <div class="comparison">
          <div class="old-way">
            <h4>❌ Without &#64;let (Repetitive)</h4>
            <pre><code>&lt;div&gt;
  &lt;p&gt;{{ '{{' }} computeExpensiveValue() {{ '}}' }}&lt;/p&gt;
  &lt;p&gt;{{ '{{' }} computeExpensiveValue().toUpperCase() {{ '}}' }}&lt;/p&gt;
  &lt;p&gt;{{ '{{' }} computeExpensiveValue().length {{ '}}' }}&lt;/p&gt;
&lt;/div&gt;</code></pre>
          </div>
          
          <div class="new-way">
            <h4>✅ With &#64;let (Efficient)</h4>
            <pre><code>&#64;let value = computeExpensiveValue();

&lt;div&gt;
  &lt;p&gt;{{ '{{' }} value {{ '}}' }}&lt;/p&gt;
  &lt;p&gt;{{ '{{' }} value.toUpperCase() {{ '}}' }}&lt;/p&gt;
  &lt;p&gt;{{ '{{' }} value.length {{ '}}' }}&lt;/p&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      
      padding: 2rem;
      max-width: 1200px;
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
      line-height: 1.6;
    }

    code {
      background: #ffe6e6;
      padding: 0.2rem 0.5rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }

    .features {
      background: #fff;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }

    .features h4 {
      margin-top: 0;
      color: #dd0031;
    }

    .features ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
      line-height: 1.8;
    }

    .example {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1rem 0;
    }

    input[type="text"],
    select {
      width: 100%;
      padding: 0.5rem;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      margin: 0.5rem 0;
    }

    input[type="text"]:focus,
    select:focus {
      outline: none;
      border-color: #dd0031;
    }

    .result {
      background: #e8f5e9;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }

    .controls {
      display: grid;
      gap: 1rem;
      margin: 1rem 0;
    }

    .controls label {
      display: block;
      font-weight: bold;
      color: #333;
    }

    input[type="range"] {
      width: 100%;
      margin-top: 0.5rem;
    }

    .invoice {
      background: #fff8e1;
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 1rem;
      border: 2px solid #ffc107;
    }

    .invoice h4 {
      margin-top: 0;
      color: #f57f17;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    td {
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
    }

    .discount-row {
      color: #4caf50;
      font-weight: bold;
    }

    .total-row {
      border-top: 2px solid #333;
      font-size: 1.1rem;
    }

    .savings {
      text-align: center;
      color: #4caf50;
      font-weight: bold;
      margin: 1rem 0 0 0;
    }

    .permissions {
      background: #e3f2fd;
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 1rem;
    }

    .permissions h4 {
      margin-top: 0;
      color: #1565c0;
    }

    .permissions h4 span {
      text-transform: capitalize;
      color: #dd0031;
    }

    .permissions ul {
      list-style: none;
      padding: 0;
    }

    .permissions li {
      padding: 0.75rem;
      margin: 0.5rem 0;
      border-radius: 4px;
      font-weight: bold;
    }

    .allowed {
      background: #c8e6c9;
      color: #2e7d32;
    }

    .denied {
      background: #ffcdd2;
      color: #c62828;
    }

    .stats {
      background: #f3e5f5;
      padding: 1.5rem;
      border-radius: 8px;
    }

    .stats h4 {
      margin-top: 0;
      color: #6a1b9a;
    }

    .stat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      border: 2px solid #ddd;
    }

    .stat-card.active {
      border-color: #4caf50;
      background: #e8f5e9;
    }

    .stat-card.inactive {
      border-color: #f44336;
      background: #ffebee;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #dd0031;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #666;
      margin-top: 0.5rem;
    }

    .user-lists {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }

    .user-column h5 {
      margin-top: 0;
      color: #6a1b9a;
    }

    .user-badge {
      padding: 0.5rem 1rem;
      margin: 0.5rem 0;
      border-radius: 20px;
      font-size: 0.9rem;
      text-align: center;
    }

    .user-badge.active {
      background: #c8e6c9;
      color: #2e7d32;
    }

    .user-badge.inactive {
      background: #ffcdd2;
      color: #c62828;
    }

    .comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }

    .old-way,
    .new-way {
      background: white;
      padding: 1rem;
      border-radius: 8px;
    }

    .old-way h4 {
      color: #c62828;
      margin-top: 0;
    }

    .new-way h4 {
      color: #2e7d32;
      margin-top: 0;
    }

    pre {
      background: #1e1e1e;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      margin: 0.5rem 0 0 0;
    }

    pre code {
      color: #d4d4d4;
      background: transparent;
      padding: 0;
      font-size: 0.85rem;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .comparison,
      .user-lists {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LetDirectiveDemoComponent {
  userName = 'World';
  selectedRole = 'user';
  
  price = signal(100);
  quantity = signal(5);
  taxRate = signal(10);

  getUsers() {
    return [
      { id: 1, name: 'Alice', active: true },
      { id: 2, name: 'Bob', active: true },
      { id: 3, name: 'Charlie', active: false },
      { id: 4, name: 'Diana', active: true },
      { id: 5, name: 'Eve', active: false },
      { id: 6, name: 'Frank', active: true },
      { id: 7, name: 'Grace', active: true },
      { id: 8, name: 'Henry', active: false },
    ];
  }

  getActiveUsers(users: any[]) {
    return users.filter((u: any) => u.active);
  }

  getInactiveUsers(users: any[]) {
    return users.filter((u: any) => !u.active);
  }
}
