import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Settings, initSettings } from "../atoms/settings";

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

export const getSettings = (params: any) => {
  const settings: Settings = {
    ...initSettings,
    ...params,
  };
  if (params.padding) {
    settings.padding = Number(params.padding);
  }
  if (params.borderRadius) {
    settings.borderRadius = Number(params.borderRadius);
  }
  if (params.borderRadius) {
    settings.borderRadius = Number(params.borderRadius);
  }
  if (params.fontSize) {
    settings.fontSize = Number(params.fontSize);
  }
  if (params.shadowOpacity) {
    settings.shadowOpacity = Number(params.shadowOpacity);
  }
  if (params.shadowBlur) {
    settings.shadowBlur = Number(params.shadowBlur);
  }
  if (params.shadowSpread) {
    settings.shadowSpread = Number(params.shadowSpread);
  }
  if (params.shadowX) {
    settings.shadowX = Number(params.shadowX);
  }
  if (params.shadowY) {
    settings.shadowY = Number(params.shadowY);
  }
  if (params.backgroundBlur) {
    settings.backgroundBlur = params.backgroundBlur === "true";
  }
  if (params.showLineNumbers) {
    settings.showLineNumbers = params.showLineNumbers === "true";
  }
  if (params.showTraficLights) {
    settings.showTraficLights = params.showTraficLights === "true";
  }
  if (params.showTitleBar) {
    settings.showTitleBar = params.showTitleBar === "true";
  }

  return settings;
};
