/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  rootDir: 'src',
  preset: "ts-jest",
  testEnvironment: "node",
  "extensionsToTreatAsEsm": [".ts"],
  transform: {
    "[.]ts$": ['ts-jest',{useESM:true}],
  },
  reporters: [
    "/home/rzymek/devel/any-toolkit/dist/jest/reporter.js",
    "default",
  ],
  testResultsProcessor: "/home/rzymek/devel/any-toolkit/dist/jest/testResultsProcessor.js"


  // transformIgnorePatterns: [
  //   "node_modules/(?!variables/.*)",
  //   "node_modules/.+\\.js$"
  // ]
};

export default config;
