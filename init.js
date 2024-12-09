// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');

fs.copyFileSync('.env.sample', '.env');
fs.copyFileSync('.env.sample', './packages/server/.env'); // Для разработки
fs.copyFileSync('.env.sample', './packages/client/.env'); // Для разработки

fs.mkdirSync('tmp/pgdata', { recursive: true });
