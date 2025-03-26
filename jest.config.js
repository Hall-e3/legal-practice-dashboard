module.exports = {
  collectCoverage: true,
  coverageProvider: "v8",
  collectCoverageFrom: [
    "components/auth/*.{js,jsx,ts,tsx}",
    "hooks/useCase.{js,jsx,ts,tsx}",
    "redux/features/casesSlice.{js,jsx,ts,tsx}",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$":
      "<rootDir>/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@/redux/(.*)$": "<rootDir>/redux/$1",
    "^@/features/(.*)$": "<rootDir>/redux/features/$1",
    "^@/types/(.*)$": "<rootDir>/types/$1",
    "^@/services/(.*)$": "<rootDir>/services/$1",
    "^@/enums/(.*)$": "<rootDir>/enums/$1",
    "^@/enums$": "<rootDir>/enums",
    "^@/config/(.*)$": "<rootDir>/config/$1",
    "^@/config$": "<rootDir>/config",
    "^@/utils/(.*)$": "<rootDir>/utils/$1",
    "^@/data/(.*)$": "<rootDir>/data/$1",
    "^@/app/(.*)$": "<rootDir>/app/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
