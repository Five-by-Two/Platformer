import { Topic } from '@/@types/forumTypes';

export const mockTopics: Topic[] = [
    {
        id: '1',
        title: 'Как начать изучение React?',
        content:
            'Всем привет! Я только начинаю изучать React и хотел бы получить советы о том, с чего начать. Какие ресурсы и уроки вы бы посоветовали?',
        author: 'ReactNovice',
        createdAt: new Date('2024-09-25').toISOString(),
        comments: [
            {
                id: 'c1',
                topicId: '1',
                content:
                    'Я рекомендую начать с официальной документации. Она очень подробная!',
                author: 'CodeMaster',
                createdAt: new Date('2024-09-26').toISOString(),
            },
            {
                id: 'c2',
                topicId: '1',
                content:
                    'Также есть отличные курсы на Я.Практикум, Udemy и Stepic!',
                author: 'LearnWithMe',
                createdAt: new Date('2024-09-27').toISOString(),
            },
            {
                id: 'c7',
                topicId: '1',
                content: 'А кто-то может посоветовать видео-курсы на YouTube?',
                author: 'VideoFan',
                createdAt: new Date('2024-09-27').toISOString(),
            },
            {
                id: 'c8',
                topicId: '1',
                content: 'Для начала, YouTube-канал Fireship очень полезен!',
                author: 'YouTubeExpert',
                createdAt: new Date('2024-09-28').toISOString(),
            },
        ],
    },
    {
        id: '2',
        title: 'Проблемы с хуками в React',
        content:
            'Привет! У меня возникают проблемы с использованием хуков в React. Кто-нибудь может помочь?',
        author: 'HookUser',
        createdAt: new Date('2024-09-28').toISOString(),
        comments: [],
    },
    {
        id: '3',
        title: 'Мой первый проект на React',
        content:
            'Я завершил свой первый проект на React! Это простое приложение для заметок. Делитесь мнением!',
        author: 'DevGuru',
        createdAt: new Date('2024-09-29').toISOString(),
        comments: [
            {
                id: 'c3',
                topicId: '3',
                content:
                    'Отличная работа! Как вы реализовали функционал сохранения заметок?',
                author: 'WebDev',
                createdAt: new Date('2024-09-29').toISOString(),
            },
            {
                id: 'c9',
                topicId: '3',
                content:
                    'Я бы порекомендовал добавить возможность группировать заметки.',
                author: 'NoteMaster',
                createdAt: new Date('2024-09-30').toISOString(),
            },
            {
                id: 'c10',
                topicId: '3',
                content:
                    'Вы использовали localStorage или что-то другое для сохранения?',
                author: 'StorageExpert',
                createdAt: new Date('2024-10-01').toISOString(),
            },
        ],
    },
    {
        id: '4',
        title: 'Сравнение React и Vue',
        content:
            'Как вы считаете, какой фреймворк лучше: React или Vue? Какие плюсы и минусы у каждого из них?',
        author: 'FrameworkFan',
        createdAt: new Date('2024-09-30').toISOString(),
        comments: [
            {
                id: 'c4',
                topicId: '4',
                content:
                    'Каждый из них имеет свои преимущества. Лично мне нравится React за гибкость.',
                author: 'DevLover',
                createdAt: new Date('2024-10-01').toISOString(),
            },
            {
                id: 'c5',
                topicId: '4',
                content: 'Vue проще для начала, особенно для новичков.',
                author: 'BeginnerDev',
                createdAt: new Date('2024-10-02').toISOString(),
            },
            {
                id: 'c11',
                topicId: '4',
                content:
                    'А как насчет производительности? Какой быстрее на больших проектах?',
                author: 'PerfAnalyzer',
                createdAt: new Date('2024-10-02').toISOString(),
            },
            {
                id: 'c12',
                topicId: '4',
                content:
                    'Мне кажется, Vue более интуитивный для небольших проектов.',
                author: 'SmallProjectDev',
                createdAt: new Date('2024-10-03').toISOString(),
            },
        ],
    },
    {
        id: '5',
        title: 'Советы по оптимизации React приложений',
        content:
            'Как оптимизировать производительность React приложений? Поделитесь своими советами!',
        author: 'PerformancePro',
        createdAt: new Date('2024-10-01').toISOString(),
        comments: [
            {
                id: 'c13',
                topicId: '5',
                content:
                    'Проверьте, как вы работаете с состоянием. Часто переписывание state может вызывать ререндеры.',
                author: 'OptimizeGuy',
                createdAt: new Date('2024-10-02').toISOString(),
            },
            {
                id: 'c14',
                topicId: '5',
                content:
                    'Мемуизация компонентов с помощью React.memo может серьезно улучшить производительность.',
                author: 'MemoPro',
                createdAt: new Date('2024-10-03').toISOString(),
            },
        ],
    },
    {
        id: '6',
        title: 'Лучшие библиотеки для работы с формами в React',
        content:
            'Какие библиотеки вы используете для работы с формами в React? Я слышал о Formik и React Hook Form.',
        author: 'FormFanatic',
        createdAt: new Date('2024-10-02').toISOString(),
        comments: [
            {
                id: 'c6',
                topicId: '6',
                content:
                    'React Hook Form - это моя любимая библиотека! Очень легкая и быстрая.',
                author: 'QuickDev',
                createdAt: new Date('2024-10-02').toISOString(),
            },
            {
                id: 'c15',
                topicId: '6',
                content:
                    'Formik предоставляет больше контроля, но React Hook Form быстрее по производительности.',
                author: 'FormikFan',
                createdAt: new Date('2024-10-03').toISOString(),
            },
        ],
    },
];
