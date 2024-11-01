import styles from './leaderBoard.module.scss';
import catIcon from '../../assets/images/Cat-Sheet.png';
import Leader from './Components/Leader';
import Button from '../../components/button';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { useEffect } from 'react';
import { setLeaderBoards } from '@/store/thunks';
import { leaderBoardCursorSelector, isMoreLeadersSelector, leadersSelector } from '@/store/leaderBoardSlice/selectors';
import { LEADERS_PER_PAGE } from '@/utils/constants';
import { getSessionStorage } from '@/utils/storageUtill';

export function LeaderBoardPage(): JSX.Element {
    const navigate = useNavigate();
    const leaders = useAppSelector(leadersSelector);
    const leaderBoardCursor = useAppSelector(leaderBoardCursorSelector);
    const isMoreLeaders = useAppSelector(isMoreLeadersSelector);

    const dispatch = useAppDispatch();

    function handleBackClick() {
        navigate(-1);
    }

    function handleNextLeadersClick() {
        dispatch(setLeaderBoards(leaderBoardCursor + LEADERS_PER_PAGE));
    }

    function handlePrevLeadersClick() {
        dispatch(setLeaderBoards(leaderBoardCursor - LEADERS_PER_PAGE));
    }

    useEffect(() => {
        const cursorHistory = getSessionStorage('cursor');
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
                        return (
                            <Leader
                                key={item.id}
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
                <Button text="BACK" onClick={handleBackClick} />
                {leaderBoardCursor > 0 && <Button text="<--" onClick={handlePrevLeadersClick} />}
                {isMoreLeaders && <Button text="-->" onClick={handleNextLeadersClick} />}
            </div>
        </section>
    );
}
