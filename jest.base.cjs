const baseConfig = {
    verbose: true,
    rootDir: "../src",
    roots: ['<rootDir>'],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
    modulePathIgnorePatterns: ['<rootDir>/build/'],
    moduleFileExtensions: ["js"],
};

module.exports = baseConfig;

