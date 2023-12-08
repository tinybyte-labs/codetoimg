"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export default function ThemeProvider(props: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    />
  );
}
