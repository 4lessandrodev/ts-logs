export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  displayName: "unit",
  testMatch: ["**/*.spec.ts"],
};
