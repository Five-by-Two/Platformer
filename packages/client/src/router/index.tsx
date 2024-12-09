import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routerConfig } from '@/router/routerConfig';
import { Router } from '@remix-run/router';

const AppRouter = () => {
    const [isClient, setIsClient] = useState(false);

    const flags = {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    };
    useEffect(() => {
        setIsClient(true); // Установка флага клиента после монтирования
    }, []);

    const router: Router | null = isClient ? createBrowserRouter(routerConfig, { future: { ...flags } }) : null;

    return router ? (
        <RouterProvider
            router={router}
            future={{
                v7_startTransition: true,
            }}
        />
    ) : null;
};

export default AppRouter;
