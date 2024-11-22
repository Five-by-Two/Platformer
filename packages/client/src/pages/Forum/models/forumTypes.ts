import { TComment, TTopic } from '@/store/forumSlice/types';

export type Topic = TTopic;

export interface CreateTopicData {
    title: string;
    content: string;
}

export type Comment = TComment;

export interface CreateCommentData {
    topicId: string;
    content: string;
}
