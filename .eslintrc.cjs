module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:svelte/recommended",
    ],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        extraFileExtensions: [".svelte"],
        project: "./jsconfig.json",
    },
    env: {
        browser: true,
        es2017: true,
        node: true,
    },
};
