import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { CommentList, CreateComment } from '../components';
import { mockTopics } from '../mocks';
import { Topic } from '@/pages/Forum/models/forumTypes';

export const ForumTopic: FC = () => {
    const { topicId } = useParams<{
        topicId: string;
    }>();
    const [topic, setTopic] = useState<Topic | null>(null);

    useEffect(() => {
        if (topicId) {
            const topicSelected = mockTopics.find(item => item.id === topicId);
            if (topicSelected) setTopic(topicSelected);
        }
    }, [topicId]);

    return (
        <div className={styles.forumTopic}>
            {topicId ? (
                !topic ? null : (
                    <div className={styles.forumTopic__content}>
                        <h2 className={styles.forumTopic__author}>
                            {topic.author}
                        </h2>
                        <h3 className={styles.forumTopic__title}>
                            {topic.title}
                        </h3>
                        <p className={styles.forumTopic__description}>
                            {topic.content}
                        </p>
                        <CommentList comments={topic.comments} />
                        <CreateComment topicId={topicId} />
                    </div>
                )
            ) : null}
        </div>
    );
};
