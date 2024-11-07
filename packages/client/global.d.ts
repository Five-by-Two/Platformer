import { RootState } from '@/store';

export {};

// Глобально декларируем в window наш ключ
// и задаем ему тип такой же, как у стейта в сторе
declare global {
    interface Window {
        APP_INITIAL_STATE: RootState;
    }
}
