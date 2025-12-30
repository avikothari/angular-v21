import { Component, resource } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Demonstrates Angular v21's NEW resource() API for async data loading
 * resource() provides a declarative way to handle async operations
 * with built-in loading, error, and success states
 */

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

@Component({
  selector: 'app-resource-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-container">
      <h2>🔄 Resource API Demo (New in v21)</h2>
      
      <div class="section">
        <h3>What is resource()?</h3>
        <p class="description">
          <code>resource()</code> is a new primitive for async data loading that provides:
        </p>
        <ul>
          <li>✅ Automatic loading states (loading, success, error)</li>
          <li>✅ Reactive dependencies - refetch when signals change</li>
          <li>✅ Built-in error handling</li>
          <li>✅ Cancellation of pending requests</li>
          <li>✅ No need for manual state management</li>
        </ul>
      </div>

      <div class="section">
        <h3>Example 1: Load Users</h3>
        
        @if (usersResource.isLoading()) {
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading users...</p>
          </div>
        }
        
        @if (usersResource.error()) {
          <div class="error">
            <p>❌ Error: {{ usersResource.error()?.message }}</p>
            <button (click)="usersResource.reload()">Retry</button>
          </div>
        }
        
        @if (usersResource.value(); as users) {
          <div class="success">
            <p>✅ Loaded {{ users.length }} users</p>
            <button (click)="usersResource.reload()">Refresh</button>
            
            <div class="user-list">
              @for (user of users.slice(0, 5); track user.id) {
                <div class="user-card">
                  <h4>{{ user.name }}</h4>
                  <p>@{{ user.username }}</p>
                  <p class="email">{{ user.email }}</p>
                </div>
              }
            </div>
          </div>
        }
      </div>

      <div class="section">
        <h3>Example 2: Load Posts (with delay simulation)</h3>
        
        @if (postsResource.isLoading()) {
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading posts...</p>
          </div>
        }
        
        @if (postsResource.error()) {
          <div class="error">
            <p>❌ Error loading posts</p>
            <button (click)="postsResource.reload()">Retry</button>
          </div>
        }
        
        @if (postsResource.value(); as posts) {
          <div class="success">
            <p>✅ Loaded {{ posts.length }} posts</p>
            <button (click)="postsResource.reload()">Refresh</button>
            
            <div class="post-list">
              @for (post of posts.slice(0, 3); track post.id) {
                <div class="post-card">
                  <h4>{{ post.title }}</h4>
                  <p>{{ post.body }}</p>
                </div>
              }
            </div>
          </div>
        }
      </div>

      <div class="section">
        <h3>Resource State</h3>
        <div class="state-info">
          <p><strong>Users Resource:</strong></p>
          <ul>
            <li>Status: {{ usersResource.status() }}</li>
            <li>Is Loading: {{ usersResource.isLoading() }}</li>
            <li>Has Value: {{ usersResource.hasValue() }}</li>
            <li>Has Error: {{ !!usersResource.error() }}</li>
          </ul>
          
          <p><strong>Posts Resource:</strong></p>
          <ul>
            <li>Status: {{ postsResource.status() }}</li>
            <li>Is Loading: {{ postsResource.isLoading() }}</li>
            <li>Has Value: {{ postsResource.hasValue() }}</li>
            <li>Has Error: {{ !!postsResource.error() }}</li>
          </ul>
        </div>
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

    .loading {
      text-align: center;
      padding: 2rem;
      background: #fff;
      border-radius: 4px;
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

    .error {
      background: #ffebee;
      padding: 1rem;
      border-left: 4px solid #c62828;
      border-radius: 4px;
      color: #c62828;
    }

    .success {
      background: #e8f5e9;
      padding: 1rem;
      border-left: 4px solid #2e7d32;
      border-radius: 4px;
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

    .user-list, .post-list {
      display: grid;
      gap: 1rem;
      margin-top: 1rem;
    }

    .user-card, .post-card {
      background: white;
      padding: 1rem;
      border-radius: 4px;
      border: 1px solid #ddd;
    }

    .user-card h4, .post-card h4 {
      margin: 0 0 0.5rem 0;
      color: #dd0031;
    }

    .user-card p, .post-card p {
      margin: 0.25rem 0;
      color: #666;
    }

    .email {
      color: #999;
      font-size: 0.9rem;
    }

    .state-info {
      background: #fff;
      padding: 1rem;
      border-radius: 4px;
    }

    .state-info ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }

    .state-info strong {
      color: #dd0031;
    }

    ul {
      line-height: 1.8;
    }
  `]
})
export class ResourceDemoComponent {
  // Example 1: Load users from API
  usersResource = resource({
    loader: async () => {
      console.log('🔄 Loading users...');
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to load users');
      }
      const users = await response.json() as User[];
      console.log('✅ Users loaded:', users.length);
      return users;
    }
  });

  // Example 2: Load posts with simulated delay
  postsResource = resource({
    loader: async () => {
      console.log('🔄 Loading posts...');
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to load posts');
      }
      const posts = await response.json() as Post[];
      console.log('✅ Posts loaded:', posts.length);
      return posts;
    }
  });
}
