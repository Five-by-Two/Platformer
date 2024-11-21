import { RouteObject } from 'react-router-dom';
import * as Pages from '@/pages';
import { EPageRoutes } from './Enums';
import PrivateRoute from './privateRoute';
import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { AuthLayout } from '@/layouts';

/** Конфигурация используемых в проекте страниц. */
export const routerConfig: RouteObject[] = [
    {
        path: EPageRoutes.SIGN_IN_PAGE,
        element: (
            <AuthLayout>
                <Pages.SignInPage />
            </AuthLayout>
        ),
    },
    {
        path: EPageRoutes.SIGN_UP_PAGE,
        element: (
            <AuthLayout>
                <Pages.SignUpPage />
            </AuthLayout>
        ),
    },
    {
        path: EPageRoutes.SERVER_ERROR,
        element: (
            <AuthLayout>
                <Pages.ServerErrorPage />
            </AuthLayout>
        ),
    },
    {
        path: EPageRoutes.NOT_FOUND,
        element: (
            <AuthLayout>
                <Pages.NotFoundPage />
            </AuthLayout>
        ),
    },
    {
        element: (
            <PrivateRoute>
                <MainLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: EPageRoutes.HOME_PAGE,
                element: <Pages.HomePage />,
            },

            {
                path: EPageRoutes.GAME_PAGE,
                element: <Pages.GamePage />,
            },
            {
                path: EPageRoutes.PROFILE_PAGE,
                element: <Pages.ProfilePage />,
            },
            {
                path: EPageRoutes.FORUM_PAGE,
                element: <Pages.Forum />,
                children: [
                    {
                        index: true,
                        element: <Pages.ForumList />,
                    },
                    {
                        path: 'create',
                        element: <Pages.CreateTopic />,
                    },
                    {
                        path: ':topicId',
                        element: <Pages.ForumTopic />,
                    },
                ],
            },

            {
                path: EPageRoutes.LEADER_BOARD_PAGE,
                element: <Pages.LeaderBoardPage />,
            },
        ],
    },
];
