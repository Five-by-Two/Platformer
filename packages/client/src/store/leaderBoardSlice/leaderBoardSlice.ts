import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TLeaderBoardState } from './types';
import { TResLeader } from '@/services/LeaderBoardService/Models/Constants';

const defaultState: TLeaderBoardState = {
    leaders: [],
    cursor: 0,
    isMoreLeaders: false,
};

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const leaderBoardSlice = createSlice({
    name: 'leaderBoard',
    initialState: defaultState,
    reducers: {
        setLeaders: (state, action: PayloadAction<{ leaders: TResLeader[] | []; cursor: number }>) => {
            if (action.payload.leaders.length > 6) {
                state.isMoreLeaders = true;
            } else {
                state.isMoreLeaders = false;
            }

            state.leaders = action.payload.leaders.slice(0, 6).map(item => {
                return Object.assign(item, { id: generateId() });
            });
            state.cursor = action.payload.cursor;
        },
    },
});

export const { setLeaders } = leaderBoardSlice.actions;

export default leaderBoardSlice.reducer;
