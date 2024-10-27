import { TResLeader } from '@/services/LeaderBoardService/Models/Constants';

export type TLeaderBoardState = {
    leaders: TResLeader[] | [];
    cursor: number;
    isMoreLeaders: boolean;
};
