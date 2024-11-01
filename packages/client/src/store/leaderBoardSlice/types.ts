import { TResLeader } from '@/services/LeaderBoardService/Models/Constants';

export type TLeaderBoardState = {
    leaders: (TResLeader & { id: string })[];
    cursor: number;
    isMoreLeaders: boolean;
};
