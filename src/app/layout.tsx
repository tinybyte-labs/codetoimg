import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import Analytics from "./analytics";

const inter = Inter({ subsets: ["latin"] });

const title = "Code To Image";
const description = `CodeToImg is a beautifully designed application that helps you generate beautiful and customizable images of your code snippets. This is built for the developer by the developer. If you want to share your code with anyone or on any social media this is the application you need.`;
const url = "https://codetoimg.com";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "codetoimg, codeimg, image, code, developer, developer tool, image generator, code snippets, snippets, code to image, converter, image converter, convert code to images, code to img, code image, snapshot, code snapshot, codeblock",
  twitter: {
    card: "summary_large_image",
    creator: "@codetoimg",
    description,
    title,
    images: `${url}/images/og-image.png`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: `${url}/images/og-image.png`,
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
      <body className={cn(inter.className, "flex min-h-screen flex-col")}>
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
