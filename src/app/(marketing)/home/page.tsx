import { Button } from "@/components/ui/button";
import { GITHUB_REPO } from "@/constants";
import { StarIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const title = "Create and Share Stunning Images of your Code";
const description =
  "Transform your code into visually captivating images with our powerful tool. Personalize the background, choose themes, toggle the title bar, add branding, and explore various features.";

export const metadata: Metadata = {
  title,
  description,
};

export default function HomePage() {
  return (
    <>
      <section id="hero" className="py-24">
        <div className="container max-w-screen-lg">
          <h1 className="text-center text-5xl font-bold md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-screen-sm text-center font-medium text-muted-foreground md:text-lg">
            {description}
          </p>
          <div className="mt-12 flex items-center justify-center gap-6">
            <Button asChild size="lg">
              <Link href="/">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={GITHUB_REPO} target="_blank">
                Star on Github
              </Link>
            </Button>
          </div>
        </div>
        <div className="container mt-16 max-w-screen-xl">
          <div className="border-[rgba(0,0,0,0.1) overflow-hidden rounded-xl border shadow-2xl lg:rounded-2xl">
            <div className="flex h-8 items-center border-b bg-card md:h-10 lg:h-12">
              <div className="flex-1">
                <div className="ml-4 flex items-center gap-2 max-md:hidden lg:ml-6">
                  <div className="h-3 w-3 rounded-full bg-muted" />
                  <div className="h-3 w-3 rounded-full bg-muted" />
                  <div className="h-3 w-3 rounded-full bg-muted" />
                </div>
              </div>
              <div className="flex h-5 flex-1 items-center justify-center rounded-md bg-muted px-4 md:h-6 lg:h-8">
                <p className="text-clip text-muted-foreground max-lg:text-sm max-md:text-xs">
                  codetoimg.com
                </p>
              </div>
              <div className="flex-1"></div>
            </div>
            <Image
              src="/images/cover-screenshot.png"
              width={3200}
              height={2200}
              className="object-cover dark:hidden"
              alt="CodeToImg Screenshot"
            />

            <Image
              src="/images/cover-screenshot-dark.png"
              width={3200}
              height={2200}
              className="hidden object-cover dark:block"
              alt="CodeToImg Screenshot"
            />
          </div>
        </div>
      </section>
    </>
  );
}
