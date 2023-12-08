import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <section id="hero" className="py-24">
        <div className="container max-w-screen-md">
          <h1 className="text-center text-5xl font-bold leading-tight">
            Craft Stunning Visualizations of Your Code
          </h1>
          <p className="mt-4 text-center text-xl font-medium text-muted-foreground">
            Unleash the Power of Customization with Our Code Screenshot
            Generator - Your Code, Your Style, Your Image
          </p>
          <div className="mt-8 flex items-center justify-center gap-6">
            <Button asChild size="lg" className="h-12">
              <a href="/">Open App</a>
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
              className="object-cover"
              alt="CodeToImg Screenshot"
            />
          </div>
        </div>
      </section>
    </>
  );
}
