import { AxiosError } from 'axios';
import { AxiosService } from '../AxiosService/AxiosService';
import { baseEndpoint, ratingFieldName, TResLeader } from './Models/Constants';

class LeaderBoardService {
    async GetLeaders(cursor = 0): Promise<TResLeader[] | [] | void> {
        return AxiosService.post<TResLeader[] | []>('/' + baseEndpoint + '/all', {
            ratingFieldName: ratingFieldName,
            cursor: cursor,
            limit: 7,
        })
            .then(res => res.data)
            .catch((ex: AxiosError) => {
                console.error('Ошибка получения лидеров', ex);
                return;
            });
    }

    async PostUserPoints(login: string, points: number): Promise<boolean> {
        return AxiosService.post('/' + baseEndpoint, {
            data: {
                login: login,
                infinityJumpPoint: points,
            },
            ratingFieldName: ratingFieldName,
        })
            .then(() => true)
            .catch((ex: AxiosError) => {
                console.error('Ошибка отправки результатов', ex);
                return false;
            });
    }
}

export default new LeaderBoardService();
