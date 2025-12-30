import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Demonstrates Angular v21's Incremental Hydration features
 * Allows progressive loading of SSR content for better performance
 */
@Component({
  selector: 'app-hydration-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-container">
      <h2>💧 Incremental Hydration (SSR)</h2>
      
      <div class="section">
        <h3>What is Incremental Hydration?</h3>
        <p class="description">
          In Angular v21, incremental hydration allows you to control which parts 
          of your SSR (Server-Side Rendered) application become interactive and when. 
          This improves initial load performance by deferring hydration of less critical components.
        </p>
        
        <div class="features">
          <h4>Benefits:</h4>
          <ul>
            <li>✅ Faster Time to Interactive (TTI)</li>
            <li>✅ Reduced JavaScript execution on initial load</li>
            <li>✅ Better Core Web Vitals scores</li>
            <li>✅ Prioritize above-the-fold content</li>
            <li>✅ Lazy hydration of off-screen components</li>
          </ul>
        </div>
      </div>

      <div class="section">
        <h3>Hydration Strategies</h3>
        
        <div class="strategy-grid">
          <div class="strategy-card">
            <h4>🚀 Immediate (Default)</h4>
            <p>Component hydrates as soon as possible</p>
            <code>&#64;Component({{ '{' }})  // Default behavior</code>
          </div>
          
          <div class="strategy-card">
            <h4>⏱️ &#64;defer (on viewport)</h4>
            <p>Hydrate when scrolled into view</p>
            <code>&#64;defer (on viewport) {{ '{' }}...{{ '}' }} </code>
          </div>
          
          <div class="strategy-card">
            <h4>🎯 &#64;defer (on interaction)</h4>
            <p>Hydrate on user interaction</p>
            <code>&#64;defer (on interaction) {{ '{' }}...{{ '}' }} </code>
          </div>
          
          <div class="strategy-card">
            <h4>⏰ &#64;defer (on idle)</h4>
            <p>Hydrate when browser is idle</p>
            <code>&#64;defer (on idle) {{ '{' }}...{{ '}' }} </code>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Example: Deferred Component</h3>
        
        <div class="example-area">
          <p class="info">⬇️ Scroll down to see the heavy component hydrate when it enters viewport:</p>
          
          <div class="spacer">Scroll down...</div>
          
          @defer (on viewport) {
            <div class="heavy-component">
              <h4>🎨 Heavy Component (Deferred)</h4>
              <p>This component was hydrated when it entered the viewport!</p>
              <p>Current time: {{ currentTime() }}</p>
              <button (click)="incrementCounter()">
                Clicks: {{ clickCounter() }}
              </button>
            </div>
          } @placeholder {
            <div class="placeholder">
              <div class="skeleton"></div>
              <p>Component will load when visible...</p>
            </div>
          } @loading (minimum 500ms) {
            <div class="loading">
              <div class="spinner"></div>
              <p>Hydrating component...</p>
            </div>
          }
        </div>
      </div>

      <div class="section">
        <h3>Interactive Example</h3>
        
        @defer (on interaction) {
          <div class="interactive-component">
            <h4>🎮 Interactive Component</h4>
            <p>This component hydrated when you clicked or hovered!</p>
            <button (click)="toggleShow()">
              {{ showContent() ? 'Hide' : 'Show' }} Content
            </button>
            
            @if (showContent()) {
              <div class="content-box">
                <p>✨ Now I'm interactive!</p>
                <p>Hydration happened on-demand.</p>
              </div>
            }
          </div>
        } @placeholder {
          <div class="placeholder interactive-placeholder">
            <p>👆 Click or hover to hydrate this component</p>
          </div>
        }
      </div>

      <div class="section">
        <h3>Configuration</h3>
        <div class="code-example">
          <pre><code>// app.config.ts
import &#123; provideClientHydration, 
         withIncrementalHydration &#125; from '&#64;angular/platform-browser';

export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideClientHydration(
      withIncrementalHydration() // ← Enable incremental hydration
    )
  ]
&#125;;</code></pre>
        </div>
      </div>

      <div class="section">
        <h3>Best Practices</h3>
        <ul class="best-practices">
          <li>🎯 Defer below-the-fold components with <code>on viewport</code></li>
          <li>⚡ Use <code>on idle</code> for analytics and non-critical widgets</li>
          <li>🎮 Use <code>on interaction</code> for modals, dropdowns, tooltips</li>
          <li>📊 Monitor Time to Interactive (TTI) metrics</li>
          <li>🔍 Test with slow network conditions</li>
        </ul>
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

    .strategy-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .strategy-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      border: 2px solid #ddd;
    }

    .strategy-card h4 {
      margin-top: 0;
      color: #dd0031;
    }

    .strategy-card code {
      display: block;
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 0.85rem;
      margin-top: 0.5rem;
      overflow-x: auto;
    }

    .example-area {
      background: white;
      padding: 1rem;
      border-radius: 4px;
    }

    .spacer {
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: #999;
      border: 2px dashed #ddd;
      margin: 1rem 0;
    }

    .heavy-component,
    .interactive-component {
      background: #e8f5e9;
      padding: 2rem;
      border-radius: 8px;
      border: 2px solid #4caf50;
      margin: 1rem 0;
    }

    .heavy-component h4,
    .interactive-component h4 {
      margin-top: 0;
      color: #2e7d32;
    }

    .placeholder {
      background: #f5f5f5;
      padding: 2rem;
      border-radius: 8px;
      border: 2px dashed #999;
      text-align: center;
      color: #666;
    }

    .skeleton {
      height: 100px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .loading {
      text-align: center;
      padding: 2rem;
      background: #fff3cd;
      border-radius: 8px;
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

    .content-box {
      background: rgba(255, 255, 255, 0.5);
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }

    .interactive-placeholder {
      cursor: pointer;
      transition: all 0.3s;
    }

    .interactive-placeholder:hover {
      background: #e3f2fd;
      border-color: #2196f3;
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

    .best-practices {
      background: white;
      padding: 1rem 1rem 1rem 2rem;
      border-radius: 4px;
      line-height: 1.8;
    }

    .best-practices code {
      background: #ffe6e6;
      padding: 0.2rem 0.5rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }

    .info {
      color: #666;
      font-style: italic;
    }
  `]
})
export class HydrationDemoComponent {
  currentTime = signal(new Date().toLocaleTimeString());
  clickCounter = signal(0);
  showContent = signal(false);

  constructor() {
    // Update time every second
    setInterval(() => {
      this.currentTime.set(new Date().toLocaleTimeString());
    }, 1000);
  }

  incrementCounter() {
    this.clickCounter.update(v => v + 1);
  }

  toggleShow() {
    this.showContent.update(v => !v);
  }
}
