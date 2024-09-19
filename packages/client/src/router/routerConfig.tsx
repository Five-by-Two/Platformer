import { RouteObject } from 'react-router-dom'
import * as Pages from '../pages'
import { EPagePaths } from './Enums'

/** Перечень используемых в проекте страниц. */
export const routerConfig: RouteObject[] = [
  {
    path: EPagePaths.HOME_PAGE,
    element: <Pages.HomePage />,
  },
  {
    path: EPagePaths.SIGN_IN_PAGE,
    element: <Pages.SignInPage />,
  },
  {
    path: EPagePaths.SIGN_UP_PAGE,
    element: <Pages.SignUpPage />,
  },
  {
    path: EPagePaths.GAME_PAGE,
    element: <Pages.GamePage />,
  },
  {
    path: EPagePaths.PROFILE_PAGE,
    element: <Pages.ProfilePage />,
  },
  {
    path: EPagePaths.FORUM_PAGE,
    element: <Pages.ForumPage />,
  },
  {
    path: EPagePaths.FORUM_TOPIC_PAGE,
    element: <Pages.ForumTopicPage />,
  },
  {
    path: EPagePaths.SERVER_ERROR,
    element: <Pages.NotFoundPage />,
  },
  {
    path: EPagePaths.LEADER_BOARD_PAGE,
    element: <Pages.LeaderBoardPage />,
  },
]
