import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TComment, TForumState, TTopic } from './types';

const defaultState: TForumState = {
    topics: [],
    comments: [],
};

const forumSlice = createSlice({
    name: 'forum',
    initialState: defaultState,
    reducers: {
        setTopics: (state, action: PayloadAction<{ topics: TTopic[] }>) => {
            state.topics = action.payload.topics;
        },
        setComments: (state, action: PayloadAction<{ comments: TComment[] }>) => {
            state.comments = action.payload.comments;
        },
    },
});

export const { setTopics, setComments } = forumSlice.actions;

export default forumSlice.reducer;
