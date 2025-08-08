/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest/presets/default-esm', // ESM support with ts-jest
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Fix ESM import path mapping
  },
};
