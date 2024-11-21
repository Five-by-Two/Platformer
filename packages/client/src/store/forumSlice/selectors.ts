import { RootState } from '..';

export const topicsSelector = (state: RootState) => state.forum.topics;

export const commentsSelector = (state: RootState) => state.forum.comments;
