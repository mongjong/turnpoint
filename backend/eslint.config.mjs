// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

const ignores = [
    '**/*.js',
];

export default tseslint.config(
    {
        ...eslint.configs.recommended,
        ignores,
    },
    {
        rules: {
            quotes: ['error', 'single'],
        },
    },
    ...tseslint.configs.recommended.map((config) => ({
        ...config,
        ignores,
    })),
);
