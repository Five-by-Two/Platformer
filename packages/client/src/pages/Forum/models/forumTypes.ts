import { TComment, TTopic } from '@/store/forumSlice/types';

export type Topic = TTopic;

// {
//     id: number;
//     title: string;
//     description: string;
//     authorName: string;
//     createdAt: string | Date;
//     // comments: Comment[];
// }

export interface CreateTopicData {
    title: string;
    content: string;
}

export type Comment = TComment;

export interface CreateCommentData {
    topicId: string;
    content: string;
}
