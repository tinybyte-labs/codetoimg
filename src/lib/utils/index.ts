import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./converter";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function objectDiff(object: any, compareWith: any) {
  const diff: any = {};

  for (const innerKey in object) {
    if (
      typeof object[innerKey] === "object" &&
      typeof compareWith[innerKey] === "object"
    ) {
      const obj = objectDiff(object[innerKey], compareWith[innerKey]);
      if (Object.keys(obj).length) {
        diff[innerKey] = obj;
      }
    } else {
      if (object[innerKey] !== compareWith[innerKey]) {
        diff[innerKey] = object[innerKey];
      }
    }
  }

  return diff;
}
