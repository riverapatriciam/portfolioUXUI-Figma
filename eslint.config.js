import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  {
    // src/imports is Figma-generated code — regenerated, never hand-edited or linted.
    ignores: [
      "dist/**",
      "src/imports/**",
      "node_modules/**",
      // Unused stock shadcn drop-in, deleted in the dead-code cleanup phase.
      "src/app/components/ui/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-console": "warn",
    },
  },
);
