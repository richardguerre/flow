import { Color } from "@prisma/client";

type RGB = {
  r: number;
  g: number;
  b: number;
};

function hexToRgb(hex: string) {
  if (hex.length === 4) {
    hex = hex.replace(/#([a-f0-9])/i, "$1$1");
  }
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return {
    r: parseInt(res![1]!, 16),
    g: parseInt(res![2]!, 16),
    b: parseInt(res![3]!, 16),
  };
}

export const nearestColor = (colorPallette: Record<string, string>, color: RGB | string) => {
  if (typeof color === "string") {
    color = hexToRgb(color);
  }
  const rgbColor = color as RGB;
  const colorKeys = Object.keys(colorPallette);
  const colorValues = colorKeys.map((key) => hexToRgb(colorPallette[key]!));
  const colorDistances = colorValues.map((value) => {
    return Math.sqrt(
      Math.pow(value.r - rgbColor.r, 2) +
        Math.pow(value.g - rgbColor.g, 2) +
        Math.pow(value.b - rgbColor.b, 2),
    );
  });
  const minDistance = Math.min(...colorDistances);
  const minDistanceIndex = colorDistances.indexOf(minDistance);
  return colorKeys[minDistanceIndex];
};

// shade 300 of tailwind colors (matches up the best with Google Calendar's colors)
const colorPalette: Record<Color, string> = {
  slate: "#cbd5e1",
  gray: "#d1d5db",
  zinc: "#d4d4d8",
  neutral: "#d4d4d4",
  stone: "#d6d3d1",
  red: "#fca5a5",
  orange: "#fdba74",
  amber: "#fcd34d",
  yellow: "#fde047",
  lime: "#bef264",
  green: "#86efac",
  emerald: "#6ee7b7",
  teal: "#5eead4",
  cyan: "#67e8f9",
  sky: "#7dd3fc",
  blue: "#93c5fd",
  indigo: "#a5b4fc",
  violet: "#c4b5fd",
  purple: "#d8b4fe",
  fuchsia: "#f0abfc",
  pink: "#f9a8d4",
  rose: "#fda4af",
};

export const nearestTailwindColor = (color: string) => nearestColor(colorPalette, color);

// --------------------- tests ---------------------

// const toIgnore = {
//   lightBlue: true,
//   warmGray: true,
//   trueGray: true,
//   coolGray: true,
//   blueGray: true,
// };

// const colorPallette: Record<string, string> = {};
// for (const color of Object.keys(colors)) {
//   if (toIgnore[color as keyof typeof toIgnore]) continue;
//   const shade = colors[color as keyof typeof colors]?.["300"];
//   if (!shade) continue;
//   colorPallette[color] = shade;
// }
// console.log(JSON.stringify(colorPallette, null, 2));

// // the following is the default color pallette from Tailwind CSS with each value being a hex string of the 200 shade
// // const colorPallette = {
// //   slate: "#e2e8f0",
// //   gray: "#e5e7eb",
// //   zinc: "#e4e4e7",
// //   neutral: "#e5e5e5",
// //   stone: "#e7e5e4",
// //   red: "#fecaca",
// //   orange: "#fed7aa",
// //   amber: "#fde68a",
// //   yellow: "#fef08a",
// //   lime: "#d9f99d",
// //   green: "#bbf7d0",
// //   emerald: "#a7f3d0",
// //   teal: "#99f6e4",
// //   cyan: "#a5f3fc",
// //   sky: "#bae6fd",
// //   blue: "#bfdbfe",
// //   indigo: "#c7d2fe",
// //   violet: "#ddd6fe",
// //   purple: "#e9d5ff",
// //   fuchsia: "#f5d0fe",
// //   pink: "#fbcfe8",
// //   rose: "#fecdd3",
// // };

// console.log(nearestColor(colorPallette, "#92e1c0"));
