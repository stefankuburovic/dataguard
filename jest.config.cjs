module.exports = {
    transform: {
        '^.+\\.ts$': 'babel-jest',
        '^.+\\.vue$': '@vue/vue3-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'js', 'vue'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['/node_modules/'],
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
};