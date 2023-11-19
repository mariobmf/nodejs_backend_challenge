/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    "<rootDir>/src/application/entities/__tests__/*.ts",
    "<rootDir>/src/application/use-cases/**/*.ts",
  ],
  coverageDirectory: "coverage",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
};
