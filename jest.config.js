module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.s?css$': 'identity-obj-proxy',
    '\\.(s?css|jpg|png)$': require.resolve('./fileMock.js'),
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: ['**/src/**/*.(js|ts|jsx|tsx)'],
};
