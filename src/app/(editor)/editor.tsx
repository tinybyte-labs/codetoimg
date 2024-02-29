"use client";

import { appStateAtom, appStateSchema } from "@/lib/atoms/app-state";
import { useAtom } from "jotai";
import { Loader2, Menu, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SideBar from "./side-bar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Preview from "./preview";
import Footer from "./footer";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { randomInt } from "@/lib/utils";

const ads = [
  {
    title: "Tweet AI",
    imageUrl: "/images/tweet-ai-app-icon.png",
    descriptions: [
      "Stuck on what to tweet? Say hello to Tweet AI! 🎉 Craft witty, engaging posts in seconds. No stress, just fun! Try it now and up your social media game! 🚀 ",
      "Struggling to craft the perfect tweet? Look no further! Introducing Tweet AI - the ultimate solution for generating engaging tweets, threads, and replies effortlessly. Elevate your social media game with just a tap. Try Tweet AI now!",
    ],
    appStoreUrl:
      "https://apps.apple.com/ae/app/tweet-ai-ai-tweet-generator/id6473770693",
  },
];

export default function Editor() {
  const [state, setState] = useAtom(appStateAtom);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAd, setShowAd] = useState(true);
  const ad = useMemo(() => ads[randomInt(0, ads.length)], []);
  const description = useMemo(
    () => ad.descriptions[randomInt(0, ad.descriptions.length)],
    [ad.descriptions],
  );

  useEffect(() => {
    const editorState = localStorage.getItem("editor-state");
    if (editorState) {
      try {
        const data = appStateSchema.parse(JSON.parse(editorState));
        setState(data);
      } catch (err: any) {
        console.log(err);
      }
    }
    setIsLoaded(true);
  }, [setState]);

  useEffect(() => {
    if (!isLoaded) return;
    const timeout = setTimeout(() => {
      localStorage.setItem("editor-state", JSON.stringify(state));
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoaded, state]);

  if (!isLoaded) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="polka flex h-screen w-screen flex-col overflow-hidden bg-background md:flex-row">
      <div className="flex h-full w-80 flex-shrink-0 border-r bg-card max-md:hidden">
        <SideBar />
      </div>
      <div className="flex p-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex w-80 p-0">
            <SideBar />
          </SheetContent>
        </Sheet>
      </div>
      <div className="relative flex flex-1 flex-col overflow-auto">
        <Preview />
        <Footer />
      </div>
      {showAd && (
        <div className="relative w-64 overflow-y-auto border-l bg-card max-md:hidden">
          <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
            <Image
              src={ad.imageUrl}
              alt="Tweet AI"
              width={512}
              height={512}
              className="h-16 w-16 rounded-2xl"
            />
            <p className="mt-4 text-center text-xl font-bold">{ad.title}</p>
            <p className="mt-2 text-center text-sm leading-normal text-muted-foreground">
              {description}
            </p>
            {ad.appStoreUrl && (
              <Link href={ad.appStoreUrl} className="mt-8">
                <Image
                  src="/images/download-on-the-appstore.png"
                  alt="Download on the AppStore"
                  width={813}
                  height={272}
                  className="h-fit w-40"
                />
              </Link>
            )}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="absolute left-4 top-4"
                variant="ghost"
                onClick={() => setShowAd(false)}
              >
                <XIcon size={24} />
                <p className="sr-only">Hide Ad</p>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Hide Ad</TooltipContent>
          </Tooltip>
          <p className="absolute left-16 top-6 text-muted-foreground">Ad</p>
        </div>
      )}
    </div>
  );
}
