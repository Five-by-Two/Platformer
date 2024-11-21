import { RootState } from '..';

export const leadersSelector = (state: RootState) => state.leaderBoard.leaders;
export const leaderBoardCursorSelector = (state: RootState) => state.leaderBoard.cursor;
export const isMoreLeadersSelector = (state: RootState) => state.leaderBoard.isMoreLeaders;
