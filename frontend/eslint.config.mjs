import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	]),
	{
		rules: {
			// Предупреждение о типе при импорте
			// "@typescript-eslint/consistent-type-imports": "error",
			// Предупреждение о типе изображения
			"@next/next/no-img-element": "off",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"prefer-const": "off",
		},
	},
]);

export default eslintConfig;
