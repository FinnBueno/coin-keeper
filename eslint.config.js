import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jestPlugin from "eslint-plugin-jest";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "cdk.out/**",
      "coverage/**",
      ".vite/**",
      "*.config.js",
      "*.config.ts",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: "readonly",
        localStorage: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        alert: "readonly",
        HTMLElement: "readonly",
        // Node globals
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        // TypeScript/React
        JSX: "readonly",
        React: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      jest: jestPlugin,
      "testing-library": testingLibraryPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      jest: {
        version: 27,
      },
    },
    rules: {
      // TypeScript rules
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-unused-vars": "off", // Turn off base rule as it can report incorrect errors
      "no-constant-condition": "warn",

      // React rules
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // React Hooks rules
      ...reactHooksPlugin.configs.recommended.rules,

      // Jest rules
      ...jestPlugin.configs.recommended.rules,
      ...jestPlugin.configs.style.rules,

      // Import rules
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "never",
        },
      ],

      // Prettier
      "prettier/prettier": "warn",
    },
  },
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
        vitest: "readonly",
      },
    },
    rules: {
      ...testingLibraryPlugin.configs.react.rules,
    },
  },
];
