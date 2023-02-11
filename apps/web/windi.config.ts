import { defineConfig } from "windicss/helpers";
import { Theme } from "windicss/types/interfaces";
import plugin from "windicss/plugin";
import colors from "windicss/colors";

// This makes the shades of gray type-safe, so that you don't have to do colors.gray[50]! (! is needed because TS doesn't know if the shade exists)
const gray = colors.gray as Record<
  50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
  string
>;

type Color = string | Record<string | number, string>;

// Using tips in RefactoringUI to create a color palette
const flowColors: Record<string, Color> = {
  transparent: "transparent",
  current: "currentColor",
  primary: colors.indigo,
  background: {
    50: gray[50],
    100: gray[100],
    200: gray[200],
    300: gray[300],
  },
  foreground: {
    900: gray[900],
    800: gray[700],
    700: gray[500],
  },
  positive: colors.green,
  negative: colors.red,
  warning: colors.yellow,
};

const convertToCssVars = (
  key: keyof Theme,
  value: Record<string, Color>,
  transform?: (value: any) => string
) => {
  const result: Record<string, Color> = {};
  for (const [k, v] of Object.entries(value)) {
    if (typeof v === "string") result[k] = v;
    else {
      const kResult: Record<string, string> = {};
      for (const kk in v) {
        const value = `var(--${key}-${k}-${kk})`;
        kResult[kk] = transform?.(value) ?? value;
      }
      result[k] = kResult;
    }
  }
  return result;
};

const convertToCssRoot = (
  key: keyof Theme,
  value: Record<string, Color>,
  transform?: (value: any) => string
) => {
  const cssVars: Record<string, string> = {};
  for (const [k, v] of Object.entries(value)) {
    if (typeof v === "string") cssVars[`--${key}-${k}`] = v;
    else {
      for (const [kk, vv] of Object.entries(v)) {
        cssVars[`--${key}-${k}-${kk}`] = transform?.(vv) ?? vv;
      }
    }
  }
  return cssVars;
};

export default defineConfig({
  theme: {
    screens: {}, // don't know what screens to use, so until I do I'll just leave it empty
    textColor: convertToCssVars(
      "colors",
      flowColors,
      (value) => `rgb(${value} / var(--tw-text-opacity, var(--tw-text-opacity, 100)))` // FIXME: use <alpha-value> instead of var(--tw-bg-opacity, 100),
    ),
    backgroundColor: convertToCssVars(
      "colors",
      flowColors,
      (value) => `rgb(${value} / var(--tw-text-opacity, var(--tw-bg-opacity, 100)))` // FIXME: use <alpha-value> instead of var(--tw-bg-opacity, 100),
    ),
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ":root": convertToCssRoot("colors", flowColors, (value) => {
          const rgb = hexToRgb(value);
          return `${rgb.r} ${rgb.g} ${rgb.b}`;
        }),
      });
    }),
  ],
  attributify: false,
});

// --------------- helpers ---------------

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return {
    r: parseInt(result![1]!, 16),
    g: parseInt(result![2]!, 16),
    b: parseInt(result![3]!, 16),
  };
}
