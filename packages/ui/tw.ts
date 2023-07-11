import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const tw = (...args: ClassValue[]) => twMerge(clsx(...args));
