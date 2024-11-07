import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routerConfig } from './routerConfig';
import { Router } from '@remix-run/router';

let router: Router;
if (typeof window !== 'undefined') {
    router = createBrowserRouter(routerConfig);
}

const AppRouter = () => (router ? <RouterProvider router={router} /> : null);

export default AppRouter;
