import { TComment, TCommentData, TCommentReq, TTopic, TTopicData } from '@/store/forumSlice/types';

export type TopicModel = TTopic;

export type GetTopicsModel = TTopic[];

export type CreateTopicModel = TTopicData;

export type GetCommentsModel = TComment[];

export type CreateCommentModel = TCommentData;

export type CreateCommentReqModel = TCommentReq;
