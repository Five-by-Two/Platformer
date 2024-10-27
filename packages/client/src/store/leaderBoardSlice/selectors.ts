import { RootState } from '../store';

export const leadersSelector = (state: RootState) => state.leaderBoard.leaders;
export const leaderBoardCursorSelector = (state: RootState) => state.leaderBoard.cursor;
export const leaderBoardIsMoreLeadersSelector = (state: RootState) => state.leaderBoard.isMoreLeaders;
