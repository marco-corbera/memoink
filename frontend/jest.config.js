module.exports = {
testEnvironment: 'jest-environment-jsdom',
setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
},
transform: {
    '^.+\.(js|jsx|ts|tsx|mjs)$': ['@swc/jest']
},
transformIgnorePatterns: [
    'node_modules/(?!(lucide-react|@babel/runtime)/)'
],
};
