module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 15000, // 전체 테스트 타임아웃 15초 설정
};
