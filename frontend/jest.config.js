/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@backend-types/(.*)$': '<rootDir>/../backend/types/genTypes/$1',
	},
	setupFiles: ['<rootDir>/jest.setup.js'],
	testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

module.exports = createJestConfig(customJestConfig);