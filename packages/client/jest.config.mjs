import dotenv from 'dotenv';

dotenv.config();

export default {
    preset: 'ts-jest/presets/default-esm',
    setupFiles: ['jest-canvas-mock'],
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
    globals: {
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
