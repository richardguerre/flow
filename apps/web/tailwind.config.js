import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

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
    extend: {},
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
};
