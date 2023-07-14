import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// transitioned to UnoCSS (https://github.com/richardguerre/flow/pull/11) but tailwind-merge still works so keeping it for now
export const tw = (...args: ClassValue[]) => twMerge(clsx(...args));
