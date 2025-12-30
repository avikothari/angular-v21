import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transition-page1',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-container page1">
      <div class="content">
        <h1>📄 Page 1</h1>
        <p class="subtitle">Red Theme</p>
        
        <div class="info-card">
          <h3>This is Page 1</h3>
          <p>Notice the smooth fade transition when you navigate between pages.</p>
          <p>This is powered by Angular v21's View Transitions API integration!</p>
        </div>

        <div class="navigation">
          <a routerLink="/view-transitions" class="btn btn-back">← Back to Overview</a>
          <a routerLink="/view-transitions/page2" class="btn btn-next">Next Page →</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .page1 { background: linear-gradient(135deg, #dd0031 0%, #ff6b9d 100%); }

    .content {
      max-width: 600px;
      text-align: center;
      color: white;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }

    .subtitle {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .info-card {
      background: rgba(255, 255, 255, 0.95);
      padding: 2rem;
      border-radius: 12px;
      margin: 2rem 0;
      color: #333;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }

    .info-card h3 {
      margin-top: 0;
      color: #dd0031;
    }

    .info-card p {
      line-height: 1.6;
      margin: 0.5rem 0;
    }

    .navigation {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      border: 2px solid white;
      transition: all 0.3s;
      font-weight: bold;
    }

    .btn:hover {
      background: white;
      color: #dd0031;
    }
  `]
})
export class TransitionPage1Component {}
