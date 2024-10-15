import { Route, Routes } from 'react-router-dom';
import { routerConfig } from './routerConfig';

export function Router() {
    return (
        <Routes>
            {routerConfig.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}>
                    {route.children &&
                        route.children.map((child, i) => (
                            <Route
                                key={i}
                                path={child?.path}
                                element={child.element}
                                index={child?.index || false}
                            />
                        ))}
                </Route>
            ))}
        </Routes>
    );
}
