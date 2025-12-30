import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Demonstrates Angular v21's Control Flow syntax
 * @if, @else, @for, @switch, @defer and related features
 */

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-control-flow-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-container">
      <h2>🎮 Control Flow Syntax</h2>
      
      <div class="section">
        <h3>What's New in Control Flow?</h3>
        <p class="description">
          Angular v21 uses the new template syntax with <code>&#64;if</code>, <code>&#64;for</code>, 
          <code>&#64;switch</code>, and <code>&#64;defer</code> blocks instead of structural directives 
          like *ngIf and *ngFor. This syntax is more readable, type-safe, and performant.
        </p>
      </div>

      <div class="section">
        <h3>&#64;if / &#64;else - Conditional Rendering</h3>
        
        <div class="example">
          <div class="controls">
            <button (click)="toggleLogin()">
              {{ isLoggedIn() ? 'Logout' : 'Login' }}
            </button>
            <button (click)="cycleUserType()">
              Change User Type ({{ userType() }})
            </button>
          </div>
          
          @if (isLoggedIn()) {
            <div class="message success">
              ✅ Welcome back! You are logged in.
              
              @if (userType() === 'admin') {
                <p>🔐 You have admin privileges.</p>
              } @else if (userType() === 'moderator') {
                <p>⚡ You have moderator privileges.</p>
              } @else {
                <p>👤 You have standard user access.</p>
              }
            </div>
          } @else {
            <div class="message info">
              ℹ️ Please login to continue.
            </div>
          }
        </div>
      </div>

      <div class="section">
        <h3>&#64;for - List Rendering with track</h3>
        
        <div class="example">
          <div class="controls">
            <button (click)="addTask()">Add Task</button>
            <button (click)="removeTask()">Remove Last</button>
            <button (click)="shuffleTasks()">Shuffle</button>
          </div>
          
          @if (tasks().length > 0) {
            <div class="task-list">
              @for (task of tasks(); track task.id) {
                <div class="task-card" [class.completed]="task.completed">
                  <div class="task-header">
                    <h4>{{ task.title }}</h4>
                    <span class="priority" [class]="'priority-' + task.priority">
                      {{ task.priority }}
                    </span>
                  </div>
                  <div class="task-actions">
                    <button (click)="toggleTask(task.id)">
                      {{ task.completed ? 'Undo' : 'Complete' }}
                    </button>
                    <button (click)="deleteTask(task.id)" class="delete">
                      Delete
                    </button>
                  </div>
                </div>
              } @empty {
                <p class="empty-state">No tasks yet. Add one to get started!</p>
              }
            </div>
          } @else {
            <p class="empty-state">📝 No tasks available. Click "Add Task" to create one!</p>
          }
          
          <div class="stats">
            <p>Total: <strong>{{ tasks().length }}</strong></p>
            <p>Completed: <strong>{{ completedCount() }}</strong></p>
            <p>Pending: <strong>{{ pendingCount() }}</strong></p>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>&#64;switch - Multiple Conditions</h3>
        
        <div class="example">
          <div class="controls">
            <button (click)="setTheme('light')">Light</button>
            <button (click)="setTheme('dark')">Dark</button>
            <button (click)="setTheme('auto')">Auto</button>
            <button (click)="setTheme('custom')">Custom</button>
          </div>
          
          @switch (currentTheme()) {
            @case ('light') {
              <div class="theme-preview light-theme">
                <h4>☀️ Light Theme</h4>
                <p>Bright and clean interface for daytime use.</p>
              </div>
            }
            @case ('dark') {
              <div class="theme-preview dark-theme">
                <h4>🌙 Dark Theme</h4>
                <p>Easy on the eyes for nighttime coding sessions.</p>
              </div>
            }
            @case ('auto') {
              <div class="theme-preview auto-theme">
                <h4>🔄 Auto Theme</h4>
                <p>Automatically switches based on system preferences.</p>
              </div>
            }
            @default {
              <div class="theme-preview custom-theme">
                <h4>🎨 Custom Theme</h4>
                <p>Personalized color scheme tailored to your preferences.</p>
              </div>
            }
          }
        </div>
      </div>

      <div class="section">
        <h3>&#64;defer - Lazy Loading & Triggers</h3>
        
        <div class="example">
          <h4>Defer on Idle</h4>
          <p class="info">This component loads when the browser is idle:</p>
          
          @defer (on idle) {
            <div class="deferred-content idle">
              <p>✅ Loaded when browser was idle!</p>
              <p>Current time: {{ getCurrentTime() }}</p>
            </div>
          } @placeholder {
            <div class="placeholder">
              <p>⏳ Waiting for browser to be idle...</p>
            </div>
          } @loading (minimum 200ms) {
            <div class="loading">
              <div class="spinner"></div>
              <p>Loading...</p>
            </div>
          }
          
          <h4>Defer on Interaction</h4>
          <p class="info">This component loads on click or hover:</p>
          
          @defer (on interaction) {
            <div class="deferred-content interaction">
              <p>✅ Loaded on interaction!</p>
              <button (click)="incrementInteraction()">
                Clicks: {{ interactionCount() }}
              </button>
            </div>
          } @placeholder {
            <div class="placeholder interactive">
              <p>👆 Click or hover here to load content</p>
            </div>
          }
          
          <h4>Defer on Timer</h4>
          <p class="info">This component loads after 3 seconds:</p>
          
          @defer (on timer(3s)) {
            <div class="deferred-content timer">
              <p>✅ Loaded after 3 seconds!</p>
            </div>
          } @placeholder {
            <div class="placeholder">
              <p>⏰ Will load in 3 seconds...</p>
            </div>
          }
        </div>
      </div>

      <div class="section">
        <h3>Syntax Comparison</h3>
        <div class="comparison">
          <div class="old-syntax">
            <h4>Old Syntax</h4>
            <pre><code>&lt;div *ngIf="isVisible"&gt;Content&lt;/div&gt;

&lt;div *ngFor="let item of items; trackBy: trackByFn"&gt;
  {{ '{{' }} item.name {{ '}}' }}
&lt;/div&gt;

&lt;ng-container [ngSwitch]="value"&gt;
  &lt;div *ngSwitchCase="'a'"&gt;A&lt;/div&gt;
  &lt;div *ngSwitchDefault&gt;Other&lt;/div&gt;
&lt;/ng-container&gt;</code></pre>
          </div>
          
          <div class="new-syntax">
            <h4>New Syntax (v21)</h4>
            <pre><code>&#64;if (isVisible) {{ '{' }}
  &lt;div&gt;Content&lt;/div&gt;
{{ '}' }}

&#64;for (item of items; track item.id) {{ '{' }}
  &lt;div&gt;{{ '{{' }} item.name {{ '}}' }}&lt;/div&gt;
{{ '}' }}

&#64;switch (value) {{ '{' }}
  &#64;case ('a') {{ '{' }}&lt;div&gt;A&lt;/div&gt;{{ '}' }}
  &#64;default {{ '{' }}&lt;div&gt;Other&lt;/div&gt;{{ '}' }}
{{ '}' }}</code></pre>
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

    h4 {
      color: #555;
      margin-top: 1.5rem;
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

    .example {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1rem 0;
    }

    .controls {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      background: #dd0031;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    button:hover {
      background: #c50028;
    }

    button.delete {
      background: #f44336;
    }

    button.delete:hover {
      background: #d32f2f;
    }

    .message {
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }

    .message.success {
      background: #e8f5e9;
      border-left: 4px solid #4caf50;
      color: #2e7d32;
    }

    .message.info {
      background: #e3f2fd;
      border-left: 4px solid #2196f3;
      color: #1565c0;
    }

    .task-list {
      display: grid;
      gap: 1rem;
      margin: 1rem 0;
    }

    .task-card {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 8px;
      border-left: 4px solid #dd0031;
    }

    .task-card.completed {
      opacity: 0.6;
      border-left-color: #4caf50;
    }

    .task-card.completed h4 {
      text-decoration: line-through;
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .task-header h4 {
      margin: 0;
      color: #333;
    }

    .priority {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    .priority-low {
      background: #e3f2fd;
      color: #1976d2;
    }

    .priority-medium {
      background: #fff3e0;
      color: #f57c00;
    }

    .priority-high {
      background: #ffebee;
      color: #c62828;
    }

    .task-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .task-actions button {
      font-size: 0.85rem;
      padding: 0.4rem 0.8rem;
    }

    .empty-state {
      text-align: center;
      color: #999;
      padding: 2rem;
      font-style: italic;
    }

    .stats {
      display: flex;
      gap: 2rem;
      margin-top: 1rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .stats p {
      margin: 0;
    }

    .stats strong {
      color: #dd0031;
    }

    .theme-preview {
      padding: 2rem;
      border-radius: 8px;
      margin-top: 1rem;
    }

    .light-theme {
      background: #ffffff;
      border: 2px solid #e0e0e0;
      color: #333;
    }

    .dark-theme {
      background: #1e1e1e;
      border: 2px solid #333;
      color: #f0f0f0;
    }

    .auto-theme {
      background: linear-gradient(90deg, #ffffff 50%, #1e1e1e 50%);
      border: 2px solid #666;
      color: #333;
    }

    .custom-theme {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: 2px solid #5a67d8;
      color: white;
    }

    .theme-preview h4 {
      margin-top: 0;
    }

    .deferred-content {
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1rem 0;
    }

    .deferred-content.idle {
      background: #e8f5e9;
      border: 2px solid #4caf50;
    }

    .deferred-content.interaction {
      background: #e3f2fd;
      border: 2px solid #2196f3;
    }

    .deferred-content.timer {
      background: #fff3e0;
      border: 2px solid #ff9800;
    }

    .placeholder {
      padding: 1.5rem;
      background: #f5f5f5;
      border: 2px dashed #999;
      border-radius: 8px;
      text-align: center;
      color: #666;
      margin: 1rem 0;
    }

    .placeholder.interactive {
      cursor: pointer;
      transition: all 0.3s;
    }

    .placeholder.interactive:hover {
      background: #e3f2fd;
      border-color: #2196f3;
    }

    .loading {
      text-align: center;
      padding: 1.5rem;
      background: #fff8e1;
      border-radius: 8px;
      margin: 1rem 0;
    }

    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #dd0031;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .info {
      color: #666;
      font-size: 0.9rem;
      font-style: italic;
      margin: 0.5rem 0;
    }

    .comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }

    .old-syntax,
    .new-syntax {
      background: white;
      padding: 1rem;
      border-radius: 8px;
    }

    .old-syntax h4 {
      color: #f57c00;
      margin-top: 0;
    }

    .new-syntax h4 {
      color: #4caf50;
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
      display: block;
    }

    @media (max-width: 768px) {
      .comparison {
        grid-template-columns: 1fr;
      }
      
      .stats {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
})
export class ControlFlowDemoComponent {
  isLoggedIn = signal(false);
  userType = signal<'admin' | 'moderator' | 'user'>('user');
  
  tasks = signal<Task[]>([
    { id: 1, title: 'Learn Angular v21 features', completed: false, priority: 'high' },
    { id: 2, title: 'Build demo application', completed: false, priority: 'medium' },
    { id: 3, title: 'Write tests', completed: true, priority: 'low' },
  ]);
  
  currentTheme = signal<'light' | 'dark' | 'auto' | 'custom'>('light');
  interactionCount = signal(0);
  
  nextTaskId = 4;

  completedCount = signal(0);
  pendingCount = signal(0);

  constructor() {
    this.updateCounts();
  }

  toggleLogin() {
    this.isLoggedIn.update(v => !v);
  }

  cycleUserType() {
    const types: ('admin' | 'moderator' | 'user')[] = ['user', 'moderator', 'admin'];
    const current = this.userType();
    const currentIndex = types.indexOf(current);
    const nextIndex = (currentIndex + 1) % types.length;
    this.userType.set(types[nextIndex]);
  }

  addTask() {
    const priorities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    
    this.tasks.update(tasks => [
      ...tasks,
      {
        id: this.nextTaskId++,
        title: `New task #${this.nextTaskId - 1}`,
        completed: false,
        priority
      }
    ]);
    this.updateCounts();
  }

  removeTask() {
    this.tasks.update(tasks => tasks.slice(0, -1));
    this.updateCounts();
  }

  shuffleTasks() {
    this.tasks.update(tasks => {
      const shuffled = [...tasks];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  }

  toggleTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    this.updateCounts();
  }

  deleteTask(id: number) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
    this.updateCounts();
  }

  setTheme(theme: 'light' | 'dark' | 'auto' | 'custom') {
    this.currentTheme.set(theme);
  }

  getCurrentTime() {
    return new Date().toLocaleTimeString();
  }

  incrementInteraction() {
    this.interactionCount.update(v => v + 1);
  }

  private updateCounts() {
    const allTasks = this.tasks();
    this.completedCount.set(allTasks.filter(t => t.completed).length);
    this.pendingCount.set(allTasks.filter(t => !t.completed).length);
  }
}
