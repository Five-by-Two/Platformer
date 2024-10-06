import type { FC } from 'react';
import styles from './styles.module.scss';
import { Comment } from '@/pages/Forum/models/forumTypes'; // Импортируем стили

interface CommentListProps {
    comments: Comment[];
}

export const CommentList: FC<CommentListProps> = ({ comments }) => {
    return (
        <div className={styles.commentList}>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id} className={styles.commentList__item}>
                        <p className={styles.commentList__content}>
                            {comment.content}
                        </p>
                        <small className={styles.commentList__author}>
                            Автор: {comment.author}
                        </small>
                        <small className={styles.commentList__date}>
                            {new Date(comment.createdAt).toLocaleString('ru')}
                        </small>
                    </div>
                ))
            ) : (
                <p className={styles.commentList__noComments}>
                    Комментариев нет.
                </p>
            )}
        </div>
    );
};
