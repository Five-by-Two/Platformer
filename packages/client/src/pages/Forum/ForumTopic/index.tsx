import { FC, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { CommentList, CreateComment } from '../components';
import { Topic } from '@/pages/Forum/models/forumTypes';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { commentsSelector, topicsSelector } from '@/store/forumSlice/selectors';
import { loginSelector } from '@/services/UserService/UserSelectors';
import { Button } from '@/ui';
import { deleteTopic, getComments } from '@/store/forumSlice/forumThunks';

export const ForumTopic: FC = () => {
    const { topicId } = useParams<{
        topicId: string;
    }>();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const [topic, setTopic] = useState<Topic | null>(null);
    const topics = useAppSelector(topicsSelector);
    const login = useAppSelector(loginSelector);
    const comments = useAppSelector(commentsSelector);

    async function handleDeleteClick() {
        if (topicId) {
            await dispatch(deleteTopic(topicId));

            navigate('/forum');
        } else {
            throw new Error('ошибка получения id топика');
        }
    }

    useLayoutEffect(() => {
        if (topicId) {
            const topicSelected = topics.find(item => item.id === Number(topicId));
            if (topicSelected) setTopic(topicSelected);

            dispatch(getComments(topicId));
        }
    }, [topicId, topics]);

    return (
        <div className={styles.forumTopic}>
            {topicId ? (
                !topic ? null : (
                    <div className={styles.forumTopic__content}>
                        <div className={styles.forumTopic__container}>
                            <h2 className={styles.forumTopic__author}>{topic.authorName}</h2>
                            {topic.authorName === login && <Button onClick={handleDeleteClick}>Удалить</Button>}
                        </div>
                        <h3 className={styles.forumTopic__title}>{topic.title}</h3>
                        <p className={styles.forumTopic__description}>{topic.description}</p>
                        {/* comments={topic.comments} */}
                        <CommentList comments={comments} />
                        <CreateComment topicId={topicId} />
                    </div>
                )
            ) : null}
        </div>
    );
};
