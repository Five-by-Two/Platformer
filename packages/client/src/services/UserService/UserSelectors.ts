import { RootState } from '@/store';

export const loginSelector = (state: RootState) => state.user.user?.login;
