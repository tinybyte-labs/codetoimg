import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Analytics from "./analytics";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/components/theme-provider";
import { Provider as JotaiProvider } from "jotai";

const inter = Inter({ subsets: ["latin"] });

const title = "CodeToImg | Create and Share Stunning Images of your Code";
const description = `CodeToImg is a beautifully designed application that helps you generate beautiful and customizable images of your code snippets. This is built for the developer by the developer. If you want to share your code with anyone or on any social media this is the application you need.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://codetoimg.com"),
  title,
  description,
  keywords:
    "codetoimg, codeimg, image, code, developer, developer tool, image generator, code snippets, snippets, code to image, converter, image converter, convert code to images, code to img, code image, snapshot, code snapshot, codeblock",
  twitter: {
    card: "summary_large_image",
    creator: "@codetoimg",
    description,
    title,
    images: `/images/og-image.png`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: `/images/og-image.png`,
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex min-h-screen flex-col antialiased",
        )}
      >
        <Analytics />
        <ThemeProvider>
          <TooltipProvider>
            <JotaiProvider>{children}</JotaiProvider>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
