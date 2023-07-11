import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";

const gray = colors.gray;

// Using tips in RefactoringUI to create a color palette
const flowColors = {
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
  // background: {
  //   50: gray[600],
  //   100: gray[700],
  //   200: gray[800],
  //   300: gray[900]
  // },
  // foreground: {
  //   900: gray[400],
  //   800: gray[200],
  //   700: gray[50]
  // },
  positive: colors.green,
  negative: colors.red,
  warning: colors.yellow,
};

// more round than the tailwind defaults
const flowBorderRadius = {
  none: "0",
  sm: "0.25rem",
  DEFAULT: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  "3xl": "2.25rem",
  full: "9999px",
};

// more spread than the tailwind defaults
const flowBoxShadow = {
  sm: "0 1px 6px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 9px 0 rgba(0, 0, 0, 0.07), 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 18px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.05)",
  lg: "0 10px 25px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 50px -5px rgba(0, 0, 0, 0.07), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 75px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  none: "none",
};

const convertToCssVars = (key, value, transform) => {
  const result = {};
  for (const [k, v] of Object.entries(value)) {
    if (typeof v === "string") result[k] = v;
    else {
      const kResult = {};
      for (const kk in v) {
        const value = `var(--${key}-${k}-${kk})`;
        kResult[kk] = transform?.(value) ?? value;
      }
      result[k] = kResult;
    }
  }
  return result;
};

const convertToCssRoot = (key, value, transform) => {
  const cssVars = {};
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

// --------------- helpers ---------------

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "../**/*.{ts,tsx}", "../../packages/**/*.{ts,tsx}"],
  theme: {
    screens: {}, // don't know what screens to use, so until I do I'll just leave it empty
    colors: convertToCssVars("colors", flowColors, (value) => `rgb(${value} / <alpha-value>)`),
    borderRadius: convertToCssVars("border-radius", flowBorderRadius),
    boxShadow: convertToCssVars("box-shadow", flowBoxShadow),
    extend: {},
  },
  plugins: [
    typography,
    plugin(({ addBase }) => {
      addBase({
        ":root": {
          ...convertToCssRoot("colors", flowColors, (value) => {
            const rgb = hexToRgb(value);
            return `${rgb.r} ${rgb.g} ${rgb.b}`;
          }),
          ...convertToCssRoot("border-radius", flowBorderRadius),
          ...convertToCssRoot("box-shadow", flowBoxShadow),
        },
      });
    }),
  ],
};
