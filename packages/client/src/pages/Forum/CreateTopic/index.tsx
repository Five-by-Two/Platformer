import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/ui';
import styles from './styles.module.scss';

interface FormData {
    title: string;
    description: string;
}

export const CreateTopic: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log('Новая тема:', data.title);
        console.log('Описание темы:', data.description);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.createTopicForm}>
            <div className={styles.createTopicForm__field}>
                <input
                    type="text"
                    placeholder="Создать новую тему"
                    {...register('title', {
                        required: 'Это поле обязательно для заполнения',
                        minLength: {
                            value: 5,
                            message: 'Минимальная длина содержания 5 символов',
                        },
                    })}
                    className={styles.createTopicForm__input}
                />
                {errors.title && (
                    <span className={styles.createTopicForm__error}>
                        {errors.title.message}
                    </span>
                )}
            </div>
            <div className={`${styles.createTopicForm__field} ${styles.full}`}>
                <textarea
                    placeholder="Описание темы"
                    {...register('description', {
                        required: 'Это поле обязательно для заполнения',
                        minLength: {
                            value: 10,
                            message: 'Минимальная длина содержания 10 символов',
                        },
                    })}
                    className={styles.createTopicForm__textarea}
                    rows={5}
                />
                {errors.description && (
                    <span className={styles.createTopicForm__error}>
                        {errors.description.message}
                    </span>
                )}
            </div>

            <Button variant="primary" type="submit">
                Создать
            </Button>
        </form>
    );
};
