module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
    },
    plugins: ['@typescript-eslint', "react-hooks"],
    rules: {
        '@typescript-eslint/ban-ts-comment': 1,
        'no-unused-expressions': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        'indent': ['error', 4, { "SwitchCase": 1 }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    },
};
