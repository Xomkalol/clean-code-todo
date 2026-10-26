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
       ...globals.node,
       ...globals.browser,
    },
    rules: {
			"no-var": "error",
			"prefer-const": "error",
      "no-console": 'error',
		},
  },
  prettier,
]);
