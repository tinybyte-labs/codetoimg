"use client";

import { appStateAtom, appStateSchema } from "@/lib/atoms/app-state";
import { useAtom } from "jotai";
import { Loader2, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import SideBar from "./side-bar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Preview from "./preview";
import Footer from "./footer";

export default function Editor() {
  const [state, setState] = useAtom(appStateAtom);
  const [isLoaded, setIsLoaded] = useState(false);

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
    </div>
  );
}
