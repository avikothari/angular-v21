import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <header class="hero">
        <h1>🚀 Angular v21 Feature Showcase</h1>
        <p class="subtitle">
          Explore all the exciting new features in Angular version 21!
        </p>
      </header>

      <div class="features-grid">
        <a routerLink="/signals" class="feature-card card-1">
          <div class="icon">📡</div>
          <h3>Signals</h3>
          <p>Reactive state management with signal(), computed(), and effect()</p>
          <div class="badge">Core Feature</div>
        </a>

        <a routerLink="/linked-signal" class="feature-card card-2">
          <div class="icon">🔗</div>
          <h3>Linked Signals</h3>
          <p>NEW: linkedSignal() for writable signals that sync with source</p>
          <div class="badge new">New in v21</div>
        </a>

        <a routerLink="/resource" class="feature-card card-3">
          <div class="icon">🔄</div>
          <h3>Resource API</h3>
          <p>NEW: Declarative async data loading with built-in states</p>
          <div class="badge new">New in v21</div>
        </a>

        <a routerLink="/view-transitions" class="feature-card card-4">
          <div class="icon">✨</div>
          <h3>View Transitions</h3>
          <p>Smooth route animations with native View Transitions API</p>
          <div class="badge">Enhanced</div>
        </a>

        <a routerLink="/hydration" class="feature-card card-5">
          <div class="icon">💧</div>
          <h3>Incremental Hydration</h3>
          <p>Progressive SSR hydration for better performance</p>
          <div class="badge">Enhanced</div>
        </a>

        <a routerLink="/let-directive" class="feature-card card-6">
          <div class="icon">📝</div>
          <h3>&#64;let Directive</h3>
          <p>Template variables for cleaner, more efficient templates</p>
          <div class="badge new">New in v21</div>
        </a>

        <a routerLink="/control-flow" class="feature-card card-7">
          <div class="icon">🎮</div>
          <h3>Control Flow</h3>
          <p>&#64;if, &#64;for, &#64;switch, &#64;defer - Modern template syntax</p>
          <div class="badge">Core Feature</div>
        </a>

        <div class="feature-card card-8 info-card">
          <div class="icon">📚</div>
          <h3>More Features</h3>
          <ul>
            <li>✅ Standalone components by default</li>
            <li>✅ Improved TypeScript support</li>
            <li>✅ Better tree-shaking</li>
            <li>✅ Enhanced performance</li>
          </ul>
        </div>
      </div>

      <section class="info-section">
        <h2>What's Angular v21?</h2>
        <div class="info-grid">
          <div class="info-box">
            <h4>🎯 Performance First</h4>
            <p>Optimized rendering, faster builds, and improved runtime performance.</p>
          </div>
          <div class="info-box">
            <h4>🔧 Developer Experience</h4>
            <p>Better TypeScript integration, clearer APIs, and improved tooling.</p>
          </div>
          <div class="info-box">
            <h4>⚡ Modern Web</h4>
            <p>Leveraging latest browser APIs for better user experiences.</p>
          </div>
          <div class="info-box">
            <h4>🌐 SSR Ready</h4>
            <p>Enhanced server-side rendering with incremental hydration.</p>
          </div>
        </div>
      </section>

      <footer class="footer">
        <p>Built with ❤️ using Angular v21</p>
        <p class="small">Click any card above to explore the feature in detail!</p>
      </footer>
    </div>
  `,
  styles: [`
    .home-container {
      
      min-height: 100vh;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .hero {
      text-align: center;
      padding: 3rem 1rem;
      background: linear-gradient(135deg, #dd0031 0%, #ff6b9d 100%);
      border-radius: 16px;
      color: white;
      margin-bottom: 3rem;
      box-shadow: 0 8px 32px rgba(221, 0, 49, 0.3);
    }

    .hero h1 {
      font-size: 3rem;
      margin: 0 0 1rem 0;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }

    .subtitle {
      font-size: 1.5rem;
      margin: 0;
      opacity: 0.95;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-decoration: none;
      color: inherit;
      border: 2px solid #e0e0e0;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .feature-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #dd0031, #ff6b9d);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.15);
      border-color: #dd0031;
    }

    .feature-card:hover::before {
      transform: scaleX(1);
    }

    .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.5rem;
    }

    .feature-card p {
      color: #666;
      line-height: 1.6;
      margin: 0;
    }

    .feature-card ul {
      margin: 0;
      padding-left: 1.5rem;
      text-align: left;
    }

    .feature-card li {
      color: #666;
      line-height: 1.8;
      margin: 0.5rem 0;
    }

    .badge {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.25rem 0.75rem;
      background: #e3f2fd;
      color: #1976d2;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: bold;
    }

    .badge.new {
      background: #fff3e0;
      color: #f57c00;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .info-card {
      background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
    }

    .info-section {
      background: #f9f9f9;
      padding: 3rem 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    .info-section h2 {
      text-align: center;
      color: #dd0031;
      margin-top: 0;
      font-size: 2rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .info-box {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #dd0031;
    }

    .info-box h4 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .info-box p {
      margin: 0;
      color: #666;
      line-height: 1.6;
    }

    .footer {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .footer p {
      margin: 0.5rem 0;
    }

    .small {
      font-size: 0.9rem;
      color: #999;
    }

    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.2rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {}
