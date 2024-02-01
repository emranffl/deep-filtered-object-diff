module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.m?[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // ignore .d.ts files
  testPathIgnorePatterns: ["\\.d\\.ts$", "esm"],
}