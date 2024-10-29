import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/assets/styles/index.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const app = (
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

if (rootElement.innerHTML === '<!--ssr-outlet-->') {
    ReactDOM.createRoot(rootElement).render(app);
} else {
    ReactDOM.hydrateRoot(rootElement, app);
}
