import { configureStore } from '@reduxjs/toolkit';
import App from './src/App';
import { reducer } from '@/store';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

export async function render() {
    const store = configureStore({
        reducer,
    });

    const html = renderToString(
        <Provider store={store}>
            <App />
        </Provider>,
    );

    return {
        html,
        initialState: store.getState(),
    };
}
