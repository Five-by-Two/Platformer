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

// import React from 'react';
// import ReactDOM from 'react-dom/server';
// import { Provider } from 'react-redux';
// import { Request as ExpressRequest } from 'express';
// import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
// import { matchRoutes } from 'react-router-dom';
// import { configureStore } from '@reduxjs/toolkit';
//
// import { createFetchRequest, createUrl } from './entry-server.utils';
// import { reducer } from './store';
// import { routerConfig } from '@/router/routerConfig';
//
// export const render = async (req: ExpressRequest) => {
//     const { query, dataRoutes } = createStaticHandler(routerConfig);
//     const fetchRequest = createFetchRequest(req);
//     const context = await query(fetchRequest);
//
//     if (context instanceof Response) {
//         throw context;
//     }
//
//     const store = configureStore({
//         reducer,
//     });
//
//     const url = createUrl(req);
//
//     const foundRoutes = matchRoutes(routerConfig, url);
//     if (!foundRoutes) {
//         throw new Error('Страница не найдена!');
//     }
//
//     const router = createStaticRouter(dataRoutes, context);
//     const html = ReactDOM.renderToString(
//         <Provider store={store}>
//             <StaticRouterProvider router={router} context={context} />
//         </Provider>,
//     );
//
//     return {
//         html,
//         initialState: store.getState(),
//     };
// };
