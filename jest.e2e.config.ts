export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  displayName: "e2e",
  testMatch: ["**/*.e2e.ts"],
};
