import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routerConfig } from './routerConfig';
import { Router } from '@remix-run/router';

let router: Router;
if (typeof window !== 'undefined') {
    router = createBrowserRouter(routerConfig);
}

const Routes = () => (router ? <RouterProvider router={router} /> : null);

export default Routes;
