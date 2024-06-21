const jsdoc = require("eslint-plugin-jsdoc");
const importPlugin = require("eslint-plugin-import");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = {
  files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  ignores: ["dist", ".eslintrc.cjs"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: { jsx: true },
    },
    globals: {},
  },
  plugins: {
    jsdoc,
    import: importPlugin,
    react: reactPlugin,
    "react-hooks": reactHooksPlugin,
    "@typescript-eslint": tsPlugin,
  },
  settings: {
    react: { version: "18.2" },
  },
  rules: {
    indent: [0],
    "no-prototype-builtins": [1],
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    "no-var": ["error"],
    "no-unused-vars": ["error"],
    "no-new-object": ["error"],
    "no-alert": ["error"],
    "no-console": ["error"],
    "no-use-before-define": ["error"],
    "keyword-spacing": [
      "error",
      {
        before: true,
        after: true,
      },
    ],
    "semi-spacing": [
      "error",
      {
        before: false,
        after: true,
      },
    ],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
      },
    ],
    "space-before-blocks": ["error", "always"],
    "key-spacing": [
      "error",
      {
        afterColon: true,
        beforeColon: false,
      },
    ],
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true,
      },
    ],
    curly: ["error"],
    "space-infix-ops": ["error"],
    "space-in-parens": ["error", "never"],
    "import/no-cycle": ["error"],
    "react/prop-types": [0],
    "react/jsx-no-duplicate-props": ["error"],
    "react-hooks/exhaustive-deps": [1],
    "react/jsx-no-useless-fragment": [1],
    "react/no-array-index-key": ["error"],
    "react/no-children-prop": [0],
  },
};
