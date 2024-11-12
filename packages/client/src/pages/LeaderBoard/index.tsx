import { nanoid } from 'nanoid';
import styles from './leaderBoard.module.scss';
import catIcon from '../../assets/images/Cat-Sheet.png';
import leaderBoardData from './leaderBoardData';
import Leader from './Components/Leader';
import Button from '../../components/button';
import { useNavigate } from 'react-router';

export function LeaderBoardPage(): JSX.Element {
    const navigate = useNavigate();

    function handleClickButtonBack() {
        navigate(-1);
    }

    return (
        <section className={`${styles.leaderBoard}`}>
            <div className={`${styles.blockTitle}`}>
                <img src={catIcon} className={`${styles.icon}`} />
                <h2 className={`${styles.title}`}>Leaderboard</h2>
            </div>
            <div className={`${styles.container}`}>
                {leaderBoardData.map((item, index) => {
                    const key = nanoid();
                    return <Leader key={key} index={index} name={item.name} points={item.points} />;
                })}
            </div>
            <Button text="BACK" onClick={handleClickButtonBack} />
        </section>
    );
}
