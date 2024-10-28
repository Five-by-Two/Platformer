import { nanoid } from 'nanoid';
import styles from './leaderBoard.module.scss';
import catIcon from '../../assets/images/Cat-Sheet.png';
import leaderBoardData from './leaderBoardData';
import Leader from './Components/Leader';
import Button from '../../components/button';
import { useNavigate } from 'react-router';
import LeaderBoardService from '@/services/LeaderBoardService/LeaderBoardService';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { useEffect } from 'react';
import { postPoints, setLeaderBoards } from '@/store/thunks';
import {
    leaderBoardCursorSelector,
    leaderBoardIsMoreLeadersSelector,
    leadersSelector,
} from '@/store/leaderBoardSlice/selectors';

export function LeaderBoardPage(): JSX.Element {
    const navigate = useNavigate();
    const leaders = useAppSelector(leadersSelector);
    const leaderBoardCursor = useAppSelector(leaderBoardCursorSelector);
    const leaderBoardIsMoreLeaders = useAppSelector(leaderBoardIsMoreLeadersSelector);

    const dispatch = useAppDispatch();

    function handleClickButtonBack() {
        navigate(-1);
    }

    function handleClickButtonNext() {
        sessionStorage.setItem('cursor', (leaderBoardCursor + 6).toString());
        dispatch(setLeaderBoards(leaderBoardCursor + 6));
    }

    function handleClickButtonBackLeaders() {
        sessionStorage.setItem('cursor', (leaderBoardCursor - 6).toString());
        dispatch(setLeaderBoards(leaderBoardCursor - 6));
    }

    useEffect(() => {
        const cursorHistory = sessionStorage.getItem('cursor');
        if (cursorHistory) {
            dispatch(setLeaderBoards(Number(cursorHistory)));
        } else {
            dispatch(setLeaderBoards());
        }
    }, []);

    return (
        <section className={`${styles.leaderBoard}`}>
            <div className={`${styles.blockTitle}`}>
                <img src={catIcon} className={`${styles.icon}`} />
                <h2 className={`${styles.title}`}>Leaderboard</h2>
            </div>
            <div className={`${styles.container}`}>
                {leaders.length > 0 ? (
                    leaders.map((item, index) => {
                        const key = nanoid();
                        return (
                            <Leader
                                key={key}
                                index={index + leaderBoardCursor}
                                name={item.data.login}
                                points={item.data.infinityJumpPoint}
                            />
                        );
                    })
                ) : (
                    <h2>Данных не обнаружено</h2>
                )}
            </div>
            <div className={styles.buttons}>
                <Button text="BACK" onClick={handleClickButtonBack} />
                {leaderBoardCursor > 0 && <Button text="<--" onClick={handleClickButtonBackLeaders} />}
                {leaderBoardIsMoreLeaders && <Button text="-->" onClick={handleClickButtonNext} />}
            </div>
        </section>
    );
}
