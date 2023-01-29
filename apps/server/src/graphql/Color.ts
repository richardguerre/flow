import { Color } from "@prisma/client";
import { builder } from "./builder";

const values: Record<Color, { value: Color }> = {
  slate: { value: "slate" },
  gray: { value: "gray" },
  zinc: { value: "zinc" },
  neutral: { value: "neutral" },
  stone: { value: "stone" },
  red: { value: "red" },
  orange: { value: "orange" },
  amber: { value: "amber" },
  yellow: { value: "yellow" },
  lime: { value: "lime" },
  green: { value: "green" },
  emerald: { value: "emerald" },
  teal: { value: "teal" },
  cyan: { value: "cyan" },
  sky: { value: "sky" },
  blue: { value: "blue" },
  indigo: { value: "indigo" },
  violet: { value: "violet" },
  purple: { value: "purple" },
  fuchsia: { value: "fuchsia" },
  pink: { value: "pink" },
  rose: { value: "rose" },
};
export const ColorEnum = builder.enumType("Color", { values });
