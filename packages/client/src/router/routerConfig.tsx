import { RouteObject } from 'react-router-dom';
import * as Pages from '../pages';
import { EPageRoutes } from './Enums';
import PrivateRoute from './privateRoute';

/** Конфигурация используемых в проекте страниц. */
export const routerConfig: RouteObject[] = [
    {
        path: EPageRoutes.HOME_PAGE,
        element: (
            <PrivateRoute>
                <Pages.HomePage />
            </PrivateRoute>
        ),
    },
    {
        path: EPageRoutes.SIGN_IN_PAGE,
        element: <Pages.SignInPage />,
    },
    {
        path: EPageRoutes.SIGN_UP_PAGE,
        element: <Pages.SignUpPage />,
    },
    {
        path: EPageRoutes.GAME_PAGE,
        element: (
            <PrivateRoute>
                <Pages.GamePage />
            </PrivateRoute>
        ),
    },
    {
        path: EPageRoutes.PROFILE_PAGE,
        element: (
            <PrivateRoute>
                <Pages.ProfilePage />
            </PrivateRoute>
        ),
    },
    {
        path: EPageRoutes.FORUM_PAGE,
        element: (
            <PrivateRoute>
                <Pages.ForumPage />
            </PrivateRoute>
        ),
    },
    {
        path: EPageRoutes.FORUM_TOPIC_PAGE,
        element: (
            <PrivateRoute>
                <Pages.ForumTopicPage />
            </PrivateRoute>
        ),
    },
    {
        path: EPageRoutes.SERVER_ERROR,
        element: <Pages.ServerErrorPage />,
    },
    {
        path: EPageRoutes.LEADER_BOARD_PAGE,
        element: (
            <PrivateRoute>
                <Pages.LeaderBoardPage />
            </PrivateRoute>
        ),
    },
];
