import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/assets/styles/index.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './contexts/ThemeContext/ThemeProvider';

const rootElement = document.getElementById('root') as HTMLElement;
const app = (
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>
);

ReactDOM.hydrateRoot(rootElement, app);
