import { defineConfig } from "windicss/helpers";
import plugin from "windicss/plugin";
import colors from "windicss/colors";

// Using tips in RefactoringUI to create a color palette
const flowColors: Record<string, string | Record<string | number, string>> = {
  transparent: "transparent",
  current: "currentColor",
  primary: colors.indigo,
  gray: colors.gray,
  positive: colors.green,
  negative: colors.red,
  warning: colors.yellow,
};

const colorPalette: Record<string, string | Record<string, string>> = {};
for (const [color, shades] of Object.entries(flowColors)) {
  if (typeof shades === "string") colorPalette[color] = shades;
  else {
    const colorGroup: Record<string, string> = {};
    for (const shade in shades) {
      colorGroup[shade] = `rgb(var(--color-${color}-${shade}) / var(--tw-bg-opacity, 100))`; // FIXME: use <alpha-value> instead of var(--tw-bg-opacity, 100)
    }
    colorPalette[color] = colorGroup;
  }
}

const rootColors: Record<string, string> = {};
for (const [color, shades] of Object.entries(flowColors)) {
  if (typeof shades === "string") rootColors[`--color-${color}`] = shades;
  else {
    for (const [shade, value] of Object.entries(shades)) {
      const rgb = hexToRgb(value);
      rootColors[`--color-${color}-${shade}`] = `${rgb.r} ${rgb.g} ${rgb.b}`;
    }
  }
}

export default defineConfig({
  theme: {
    screens: {}, // don't know what screens to use, so until I do I'll just leave it empty
    colors: colorPalette,
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ":root": rootColors,
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
