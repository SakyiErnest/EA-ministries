import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseProvider } from './firebase/FirebaseContext'
import ErrorBoundary from './Components/UI/ErrorBoundary'

// Register service worker for offline capabilities and caching
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/serviceWorker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }
};

// Preload critical fonts
const preloadFonts = () => {
  // Add font preloading if needed
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap';
  fontPreload.as = 'style';
  document.head.appendChild(fontPreload);
};

// Error handling for React rendering
const renderApp = () => {
  try {
    // Preload critical resources
    preloadFonts();

    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error("Root element not found!");
      return;
    }

    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <FirebaseProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </FirebaseProvider>
        </ErrorBoundary>
      </StrictMode>
    );

    // Register service worker after app is rendered
    registerServiceWorker();
  } catch (error) {
    console.error("Error rendering application:", error);
    // Display a fallback UI
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center;">
          <h2>Something went wrong</h2>
          <p>The application failed to load. Please refresh the page or try again later.</p>
          <button onclick="window.location.reload()">Refresh Page</button>
        </div>
      `;
    }
  }
};

renderApp();
