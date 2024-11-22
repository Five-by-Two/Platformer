import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '@/store';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import AppRouter from '@/router';

interface RenderResult {
    html: string;
    initialState: unknown;
}

export async function render(): Promise<RenderResult> {
    const store = configureStore({
        reducer,
    });

    const html = renderToString(
        <Provider store={store}>
            <AppRouter />
        </Provider>,
    );

    return {
        html,
        initialState: store.getState(),
    };
}
