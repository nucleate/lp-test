module.exports = {
    roots: ['<rootDir>/src/__tests__'],
    testMatch: ['**/*.test.(ts)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    verbose: true,
    silent: true,
    collectCoverage: true,
    coverageDirectory: './__coverage__',
    testPathIgnorePatterns: ['/node_modules/', '.*\\.d\\.ts$', '/build/'],
};
