/** Страницы приложения. */
export enum EPagePaths {
  /** Домашняя страница. */
  HOME_PAGE = '',
  /** Регистрация. */
  SIGN_UP_PAGE = 'sign-up',
  /** Авторизация. */
  SIGN_IN_PAGE = 'sign-in',
  /** Игра. */
  GAME_PAGE = 'game',
  /** Профиль. */
  PROFILE_PAGE = 'profile',
  /** Страница лидеров. */
  LEADER_BOARD_PAGE = 'leaderboard',
  /** Форум. */
  FORUM_PAGE = 'forum',
  /** Топик форума. */
  FORUM_TOPIC_PAGE = 'forum/:topic',
  /** Страница не найдена (404). */
  NOT_FOUND = 'not-found',
  /** Ошибка на стороне сервера (500). */
  SERVER_ERROR = 'server-error',
}
