import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Demonstrates Angular v21's View Transitions API integration
 * Provides smooth animations between route transitions
 */
@Component({
  selector: 'app-view-transitions',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="demo-container">
      <h2>✨ View Transitions API</h2>
      
      <div class="section">
        <h3>What are View Transitions?</h3>
        <p class="description">
          Angular v21 integrates the native View Transitions API to provide 
          smooth, automatic animations between route navigations. This creates 
          a more polished, app-like user experience.
        </p>
        
        <div class="features">
          <h4>Features:</h4>
          <ul>
            <li>✅ Automatic cross-fade between routes</li>
            <li>✅ Shared element transitions</li>
            <li>✅ Customizable animation timing</li>
            <li>✅ No JavaScript animation code needed</li>
            <li>✅ Native browser performance</li>
          </ul>
        </div>
      </div>

      <div class="section">
        <h3>Try It Out</h3>
        <p>Navigate between these pages to see smooth transitions:</p>
        
        <div class="nav-grid">
          <a routerLink="/view-transitions/page1" class="nav-card card-1">
            <div class="card-icon">📄</div>
            <h4>Page 1</h4>
            <p>Red theme page</p>
          </a>
          
          <a routerLink="/view-transitions/page2" class="nav-card card-2">
            <div class="card-icon">📘</div>
            <h4>Page 2</h4>
            <p>Blue theme page</p>
          </a>
          
          <a routerLink="/view-transitions/page3" class="nav-card card-3">
            <div class="card-icon">📗</div>
            <h4>Page 3</h4>
            <p>Green theme page</p>
          </a>
          
          <a routerLink="/view-transitions/page4" class="nav-card card-4">
            <div class="card-icon">📙</div>
            <h4>Page 4</h4>
            <p>Orange theme page</p>
          </a>
        </div>
      </div>

      <div class="section">
        <h3>How to Enable</h3>
        <div class="code-example">
          <pre><code>// In app.config.ts
export const appConfig: ApplicationConfig = {{ '{' }}
  providers: [
    provideRouter(
      routes,
      withViewTransitions() // ← Enable View Transitions!
    )
  ]
{{ '}' }};</code></pre>
        </div>
      </div>

      <div class="section">
        <h3>Customization</h3>
        <p>Customize transitions with CSS:</p>
        <div class="code-example">
          <pre><code>::view-transition-old(root),
::view-transition-new(root) {{ '{' }}
  animation-duration: 0.5s;
{{ '}' }}

::view-transition-old(root) {{ '{' }}
  animation-name: fade-out;
{{ '}' }}

::view-transition-new(root) {{ '{' }}
  animation-name: fade-in;
{{ '}' }}</code></pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      
      padding: 2rem;
      max-width: 1000px;
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

    .nav-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .nav-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      text-decoration: none;
      color: inherit;
      border: 2px solid transparent;
      transition: transform 0.2s, border-color 0.2s;
      cursor: pointer;
    }

    .nav-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .card-1:hover { border-color: #dd0031; }
    .card-2:hover { border-color: #0066cc; }
    .card-3:hover { border-color: #00aa55; }
    .card-4:hover { border-color: #ff8800; }

    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .nav-card h4 {
      margin: 0.5rem 0;
      color: #333;
    }

    .nav-card p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    .code-example {
      background: #1e1e1e;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      margin: 1rem 0;
    }

    .code-example pre {
      margin: 0;
      color: #d4d4d4;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .code-example code {
      color: #d4d4d4;
    }
  `]
})
export class ViewTransitionsComponent {}
