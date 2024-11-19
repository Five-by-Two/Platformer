import ReactDOM from 'react-dom/client';
import '@/assets/styles/index.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRouter from '@/router';

const rootElement = document.getElementById('root') as HTMLElement;
const app = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.hydrateRoot(rootElement, app);
