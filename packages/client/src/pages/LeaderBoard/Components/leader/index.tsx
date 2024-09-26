import styles from './leader.module.scss';

type TProps = {
    index: number;
    name: string;
    points: number;
};

function Leader({ index, name, points }: TProps): JSX.Element {
    return (
        <div className={`${styles.container}`}>
            <p className={`${styles.index}`}>{index + 1}</p>
            <p className={`${styles.name}`}>{name}</p>
            <p className={`${styles.points}`}>{points}</p>
        </div>
    );
}

export default Leader;
