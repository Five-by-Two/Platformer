import { AxiosError, AxiosResponse } from 'axios';
import { AxiosService } from '../AxiosService/AxiosService';
import {
    CreateCommentModel,
    CreateCommentReqModel,
    CreateTopicModel,
    GetCommentsModel,
    GetTopicsModel,
    TopicModel,
} from './Models/GetTopicsModel';

class ForumService {
    async GetTopics(): Promise<GetTopicsModel | void> {
        return AxiosService.get<GetTopicsModel>('/api/topics/all')
            .then(res => res.data)
            .catch((ex: AxiosError) => {
                console.error('Ошибка получения топиков', ex);
                return;
            });
    }

    async CreateTopic(topicData: CreateTopicModel): Promise<TopicModel | void> {
        return AxiosService.post<TopicModel, AxiosResponse<TopicModel>, CreateTopicModel>(
            '/api/topics/create',
            topicData,
        )
            .then(res => res.data)
            .catch((ex: AxiosError) => {
                console.error('Ошибка создания топика', ex);
                return;
            });
    }

    async DeleteTopic(topicId: string): Promise<string | void> {
        return AxiosService.delete<string>(`/api/topics/delete/${topicId}`)
            .then(res => res.data)
            .catch((ex: AxiosError) => {
                console.error('Ошибка удаления топика', ex);
                return;
            });
    }

    async GetComments(topicId: string): Promise<GetCommentsModel | void> {
        return AxiosService.get<GetCommentsModel>(`/api/comments/by-topic/${topicId}`)
            .then(res => res.data)
            .catch((ex: AxiosError) => {
                console.error('Ошибка получения комментариев', ex);
                return;
            });
    }

    async CreateComment(data: CreateCommentReqModel): Promise<CreateCommentModel | void> {
        return AxiosService.post<CreateCommentModel, AxiosResponse<CreateCommentModel>, CreateCommentReqModel>(
            'api/comments/create',
            data,
        )
            .then(res => res.data)
            .catch((ex: AxiosError) => {
                console.error('Ошибка создания комментария', ex);
                return;
            });
    }

    async DeleteComment(commentId: string): Promise<string | void> {
        return AxiosService.delete<string>(`/api/comments/delete/${commentId}`)
            .then(res => res.data)
            .catch((ex: AxiosError) => {
                console.error('Ошибка удаления комментария', ex);
                return;
            });
    }
}

export default new ForumService();
