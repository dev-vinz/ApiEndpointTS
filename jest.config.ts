export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: [
        "**/__tests__/**/*.ts",
        "**/tests/**/*.ts",
        "**/?(*.)+(spec|test).ts",
    ],
    testPathIgnorePatterns: ["tests/models/"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
