import { type Dispatch, type SetStateAction, createContext } from 'react';

export const initialThemeState = {
    theme: `dark`,
    setTheme: (() => null) as Dispatch<SetStateAction<string>>,
};

export const ThemeContext = createContext(initialThemeState);
