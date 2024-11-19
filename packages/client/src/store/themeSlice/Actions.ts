import { createAction } from '@reduxjs/toolkit';
import { THEME_ACTIONS_NAMESPACE } from './Consts';

export const toggleTheme = createAction<boolean>(`${THEME_ACTIONS_NAMESPACE}_CHANGE_THEME`);
