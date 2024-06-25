const jsdoc = require("eslint-plugin-jsdoc");
const importPlugin = require("eslint-plugin-import");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
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
      indent: ["warn", 2],
      "no-prototype-builtins": ["warn"],
      "linebreak-style": ["error", "unix"],
      semi: ["error", "always"],
      "no-var": ["error"],
      "no-unused-vars": ["warn"],
      "no-new-object": ["warn"],
      "no-alert": ["error"],
      "no-console": ["error"],
      "no-use-before-define": ["error"],
      "keyword-spacing": [
        "warn",
        {
          before: true,
          after: true,
        },
      ],
      "semi-spacing": [
        "warn",
        {
          before: false,
          after: true,
        },
      ],
      "space-before-function-paren": [
        "warn",
        {
          anonymous: "always",
          named: "never",
        },
      ],
      "space-before-blocks": ["warn", "always"],
      "key-spacing": [
        "warn",
        {
          afterColon: true,
          beforeColon: false,
        },
      ],
      "comma-spacing": [
        "warn",
        {
          before: false,
          after: true,
        },
      ],
      curly: ["warn"],
      "space-infix-ops": ["warn"],
      "space-in-parens": ["warn", "never"],
      "import/no-cycle": ["warn"],
      "react/prop-types": ["off"],
      "react/jsx-no-duplicate-props": ["warn"],
      "react-hooks/exhaustive-deps": ["warn"],
      "react/jsx-no-useless-fragment": ["warn"],
      "react/no-array-index-key": ["warn"],
      "react/no-children-prop": ["off"],
      // Additional rules for TypeScript
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/no-var-requires": ["error"],
      "@typescript-eslint/no-inferrable-types": ["warn"],
    },
  },
  {
    files: ["client/src/store/*.ts "],
    rules: {
      "no-use-before-define": ["off"],
    },
  },
  {
    files: ["server/**/*.js", "server/**/*.ts"],
    rules: {
      "no-console": ["off"],
    },
  },
];
