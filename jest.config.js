/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
const esModules = ['react-id-swiper','swiper','ssr-window','dom7'].join('|');

module.exports = {
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/'],
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'vue'
    ],
    transform: {
        "\\.[jt]sx?$": "babel-jest",
        '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/imageMock.js',
        '^.+\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js'
    },
    moduleNameMapper: {
        '^uuid$': require.resolve('uuid'),
        '^Swiper$': require.resolve('react-id-swiper'),
        '^@src/(.*)$': '<rootDir>/src/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@services/(.*)$': '<rootDir>/src/app/services/$1',
        '^@modules/(.*)$': '<rootDir>/src/app/modules/$1',
        '^@pages/(.*)$': '<rootDir>/src/app/pages/$1',
        '^@tests/(.*)$': '<rootDir>/tests/$1',
        '^.+\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
        '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/imageMock.js'
    },
    testMatch: ['<rootDir>/src/**/**/*.test.{js,ts,jsx,tsx}'],
    setupFilesAfterEnv: ['<rootDir>/jest.setupTests.js'],
    moduleDirectories: ['node_modules'],
    clearMocks: true,
    coverageDirectory: 'tests/coverage',
    coveragePathIgnorePatterns: ['/node_modules/', 'lib/'],
    collectCoverageFrom: ['src/**/**/*.{js,ts,jsx,tsx}', 'src/**/**/*.{request,service}.{js,ts,jsx,tsx}'],
    testTimeout: 12000000
}
