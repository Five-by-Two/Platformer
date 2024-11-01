import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TLeaderBoardState } from './types';
import { TResLeader } from '@/services/LeaderBoardService/Models/Constants';
import { nanoid } from 'nanoid';

const defaultState: TLeaderBoardState = {
    leaders: [],
    cursor: 0,
    isMoreLeaders: false,
};

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
                return Object.assign(item, { id: nanoid() });
            });
            state.cursor = action.payload.cursor;
        },
    },
});

export const { setLeaders } = leaderBoardSlice.actions;

export default leaderBoardSlice.reducer;
