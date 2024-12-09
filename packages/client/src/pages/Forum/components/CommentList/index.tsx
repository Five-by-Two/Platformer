import { type FC } from 'react';
import styles from './styles.module.scss';
import { Comment } from '@/pages/Forum/models/forumTypes'; // Импортируем стили
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { loginSelector } from '@/services/UserService/UserSelectors';
import { Button } from '@/ui';
import { deleteComment } from '@/store/forumSlice/forumThunks';
import { TIdData } from '@/store/forumSlice/types';

interface CommentListProps {
    comments: Comment[];
}

export const CommentList: FC<CommentListProps> = ({ comments }) => {
    const login = useAppSelector(loginSelector);
    const dispatch = useAppDispatch();

    function handleDeleteClick(data: TIdData) {
        dispatch(deleteComment(data));
    }

    return (
        <div className={styles.commentList}>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id} className={styles.commentList__item}>
                        <div className={styles.commentList__container}>
                            <p className={styles.commentList__content}>{comment.message}</p>
                            {comment.authorName === login && (
                                <Button
                                    onClick={() =>
                                        handleDeleteClick({
                                            topicId: String(comment.TopicId),
                                            commentId: String(comment.id),
                                        })
                                    }
                                    variant="secondary">
                                    Удалить
                                </Button>
                            )}
                        </div>
                        <small className={styles.commentList__author}>Автор: {comment.authorName}</small>
                        <small className={styles.commentList__date}>
                            {new Date(comment.createdAt).toLocaleString('ru')}
                        </small>
                    </div>
                ))
            ) : (
                <p className={styles.commentList__noComments}>Комментариев нет.</p>
            )}
        </div>
    );
};
