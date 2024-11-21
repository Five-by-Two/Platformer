# Платформер

---

Данный проект создан в ознакомительных целях. Он представляет собой бесконечную 2D игру в стиле выживания на платформах.
Чем выше подняться на платформах, тем больше можно заработать очков! Соревнуйся и побеждай в увлекательной игре "Платформер".
Попади в топ 10 лидеров и стань лучшим игроком "Платформера".

---

Подробный видеоразбор проекта находится по [ссылке](https://disk.yandex.ru/i/vuCF3eut0RLusQ)

---

### Запуск проекта

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server

---

### Запуск проекта в продакшене

1. Выполните команду `node init.js`
2. Убедитесь что у вас установлен `node` и `docker` и `docker compose (v2)`
3. выполните команду `docker compose up --build` для сборки образов и запуска контейнеров
    - если необходимо запустить только сервер, выполните команду `docker compose up --build -d server`
    - если необходимо запустить только клиент, выполните команду `docker compose up --build -d client`
    - если необходимо запустить оба, выполните команду `docker compose up --build`
4. выполните команду `docker compose logs` чтобы посмотреть логи контейнеров
5. выполните команду `docker compose ps` чтобы посмотреть статус контейнеров
6. выполните команду `docker compose exec prakticum-client bash` чтобы войти в контейнер клиента
7. выполните команду `docker compose exec prakticum-server bash` чтобы войти в контейнер сервера
8. выполните команду `docker compose restart` чтобы перезапустить контейнеры
9. выполните команду, выполните команду `docker compose start` чтобы запустить контейнеры
10. Для остановки контейнеров выполните команду `docker compose stop`
11. После завершения работы контейнеров выполните команду `docker compose down`, чтобы удалить контейнеры

## Используемые технологии

![Static Badge](https://img.shields.io/badge/typescript-blue)
![Static Badge](https://img.shields.io/badge/canvas-orange)
![Static Badge](https://img.shields.io/badge/vite-purple)
![Static Badge](https://img.shields.io/badge/eslint-blue)
![Static Badge](https://img.shields.io/badge/git-black)
