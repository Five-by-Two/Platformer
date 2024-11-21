export type TTopic = {
    id: number;
    title: string;
    description: string;
    authorName: string;
    createdAt: string;
    updatedAt: string;
};

export type TTopicData = {
    title: string;
    description: string;
    authorName: string;
};

export type TCommentReq = {
    message: string;
    authorName: string;
    TopicId: number;
};

export type TReplies = {
    id: number;
    message: string;
    authorName: string;
    createdAt: string;
    updatedAt: string;
    CommentId: number;
    ReplyId: null | number;
};

export type TCommentData = {
    id: number;
    message: string;
    authorName: string;
    createdAt: string;
    updatedAt: string;
    TopicId: number;
};

export type TComment = TCommentData & {
    Replies: TReplies[];
};

export type TForumState = {
    topics: TTopic[];
    comments: TComment[];
};

export type TIdData = {
    commentId: string;
    topicId: string;
};
