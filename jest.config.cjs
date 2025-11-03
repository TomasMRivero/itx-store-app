const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/src/tests/__mocks__/fileMock.js'
  },
  transformIgnorePatterns: ['node_modules/(?!(until-async)/)'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  moduleDirectories: ['node_modules', 'src']
};

module.exports = config;