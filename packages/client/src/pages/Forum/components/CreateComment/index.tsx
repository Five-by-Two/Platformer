import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { Button } from '@/ui';

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

    const onSubmit = (data: FormData) => {
        console.log('Комментарий', data.comment, topicId);
        reset();
    };

    return (
        <form
            className={styles.createComment}
            onSubmit={handleSubmit(onSubmit)}>
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
                {errors.comment && (
                    <span className={styles.createComment__error}>
                        {errors.comment.message}
                    </span>
                )}
            </div>

            <div className={styles.createComment__buttonContainer}>
                <Button type="submit">Добавить комментарий</Button>
            </div>
        </form>
    );
};
