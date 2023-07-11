import { nearestColor } from "@flowdev/nearest-color";
import { Color } from "@prisma/client";

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
