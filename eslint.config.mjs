import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
        globals: {
        ...globals.browser,
        ...globals.node
      },
    },
    rules: {
			"no-var": "error",
			"prefer-const": "error",
      "no-console": 'error',
		},
  },
  prettier,
]);
