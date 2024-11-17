import { FC, useState, ChangeEvent } from 'react';
import styles from './styles.module.scss';
import { TopicCardItem } from '../components';
import { useNavigate } from 'react-router';
import { Button, IconArrowLeft, IconArrowRight } from '@/ui';
import { useAppSelector } from '@/hooks/redux-hooks';
import { topicsSelector } from '@/store/forumSlice/selectors';

const TOPICS_PER_PAGE = 5;

export const ForumList: FC = () => {
    const topics = useAppSelector(topicsSelector);

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredTopics = topics
        .filter(topic => topic.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .reverse();

    const totalPages = Math.ceil(filteredTopics.length / TOPICS_PER_PAGE);
    const paginatedTopics = filteredTopics.slice((currentPage - 1) * TOPICS_PER_PAGE, currentPage * TOPICS_PER_PAGE);

    const handleTopicSelect = (topicId: number) => {
        navigate(String(topicId));
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={styles.forumList}>
            <div className={styles.forumList__header}>
                <h2 className={styles.forumList__title}>Темы</h2>
                <input
                    type="search"
                    placeholder="Поиск тем..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.forumList__search}
                />
            </div>

            <ul className={styles.forumList__list}>
                {paginatedTopics.map(topic => (
                    <TopicCardItem key={topic.id} topic={topic} onSelect={handleTopicSelect} />
                ))}
            </ul>
            <div className={styles.forumList__pagination}>
                <Button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    leftIcon={<IconArrowLeft width={24} height={24} />}
                    variant="secondary">
                    Назад
                </Button>
                <span>
                    Страница {currentPage} из {totalPages}
                </span>
                <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    rightIcon={<IconArrowRight width={24} height={24} />}
                    variant="secondary">
                    Вперед
                </Button>
            </div>
        </div>
    );
};
