import { RouteObject } from 'react-router-dom';
import * as Pages from '@/pages';
import { EPageRoutes } from './Enums';

/** Конфигурация используемых в проекте страниц. */
export const routerConfig: RouteObject[] = [
    {
        path: EPageRoutes.HOME_PAGE,
        element: <Pages.HomePage />,
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
            { index: true, element: <Pages.ForumList /> },
            { path: 'create', element: <Pages.CreateTopic /> },
            { path: ':topicId', element: <Pages.ForumTopic /> },
        ],
    },
    {
        path: EPageRoutes.SERVER_ERROR,
        element: <Pages.NotFoundPage />,
    },
    {
        path: EPageRoutes.LEADER_BOARD_PAGE,
        element: <Pages.LeaderBoardPage />,
    },
    {
        path: EPageRoutes.NOT_FOUND,
        element: <Pages.NotFoundPage />,
    },
];
