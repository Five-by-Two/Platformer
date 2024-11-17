import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { Button } from '@/ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { loginSelector } from '@/services/UserService/UserSelectors';
import { createComment } from '@/store/forumSlice/forumThunks';

interface CreateCommentProps {
    topicId: string;
}

interface FormData {
    comment: string;
}

export const CreateComment: FC<CreateCommentProps> = ({ topicId }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const dispatch = useAppDispatch();
    const login = useAppSelector(loginSelector);

    const onSubmit = (data: FormData) => {
        console.log('Комментарий', data.comment, topicId);
        if (login) {
            dispatch(
                createComment({
                    message: data.comment,
                    authorName: login,
                    TopicId: Number(topicId),
                }),
            );
        } else {
            throw new Error('Ошибка получения логина');
        }
        reset();
    };

    return (
        <form className={styles.createComment} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.createComment__textareaContainer}>
                <textarea
                    placeholder="Оставить комментарий..."
                    {...register('comment', {
                        required: 'Это поле обязательно для заполнения',
                        minLength: {
                            value: 10,
                            message: 'Минимальная длина содержания 10 символов',
                        },
                    })}
                    className={styles.createComment__textarea}
                    rows={2}
                />
                {errors.comment && <span className={styles.createComment__error}>{errors.comment.message}</span>}
            </div>

            <div className={styles.createComment__buttonContainer}>
                <Button type="submit">Добавить комментарий</Button>
            </div>
        </form>
    );
};
