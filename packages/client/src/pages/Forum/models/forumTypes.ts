export interface Topic {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string | Date;
    comments: Comment[];
}

export interface CreateTopicData {
    title: string;
    content: string;
}

export interface Comment {
    id: string;
    topicId: string;
    content: string;
    author: string;
    createdAt: string | Date;
}

export interface CreateCommentData {
    topicId: string;
    content: string;
}
