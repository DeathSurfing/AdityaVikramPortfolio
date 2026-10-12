import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { plugin as shadcn } from "@shadcn/lint";
import tsParser from "@typescript-eslint/parser";

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
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { shadcn },
    settings: {
      shadcn: {
        ui: "@/components/",
        note: "Theme lives in app/globals.css (@theme). Use theme colors and the spacing scale.",
      },
    },
    rules: {
      "shadcn/no-raw-colors": "error",
      "shadcn/no-arbitrary-values": "error",
      "shadcn/no-unknown-classes": ["error", {
        // StaggeredMenu styles itself via its own stylesheet (StaggeredMenu.css).
        allow: ["sm-*", "staggered-menu-*"],
      }],
      "shadcn/no-inline-styles": ["error", {
        // motion/gsap animate dynamic values via inline styles.
        allow: ["opacity", "transform", "scaleY", "originY", "x", "y", "left", "top", "width", "pointerEvents", "backgroundColor", "background", "animationDelay", "--*"],
      }],
      "shadcn/require-static-classes": "error",
    },
  },
  // Component directory: components style themselves (docs: turn no-restyle off here).
  {
    files: ["components/**/*.{jsx,tsx}"],
    plugins: { shadcn },
    rules: {
      "shadcn/no-restyle": "off",
    },
  },
  // OG image is rendered server-side to an image; Tailwind classes have no effect there.
  {
    files: ["app/opengraph-image.tsx"],
    rules: {
      "shadcn/no-inline-styles": "off",
    },
  },
]);

export default eslintConfig;
