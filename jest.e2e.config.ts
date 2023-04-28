export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testTimeout: 90000,
  preset: "ts-jest",
  displayName: "e2e",
  testMatch: ["**/*.e2e.ts"],
};
