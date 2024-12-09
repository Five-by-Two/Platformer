import type { FC } from 'react';
import styles from './styles.module.scss';
import { Topic } from '@/pages/Forum/models/forumTypes';

interface TopicCardItemProps {
    topic: Topic;
    onSelect: (topicId: number) => void;
}
export const TopicCardItem: FC<TopicCardItemProps> = ({ topic, onSelect }) => {
    const handleClick = () => {
        onSelect(topic.id);
    };

    return (
        <div className={styles.topicCardItem} onClick={handleClick}>
            <h3 className={styles.topicCardItem__title}>{topic.title}</h3>
            <p className={styles.topicCardItem__content}>{topic.description}</p>
            {/* <span className={styles.topicCardItem__comments}>
                Комментарии: {topic.comments.length}
            </span> */}
            <span className={styles.topicCardItem__comments}>Автор: {topic.authorName}</span>
        </div>
    );
};
