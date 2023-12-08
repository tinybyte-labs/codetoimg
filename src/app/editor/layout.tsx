"use client";

import { ReactNode, useEffect, useState } from "react";
import SideBar from "./side-bar";
import { Button } from "@/components/ui/button";
import { Loader2, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeProvider from "@/components/theme-provider";
import { useAtom } from "jotai";
import { settingsAtom } from "@/lib/atoms/settings";

export default function EditorLayout({ children }: { children: ReactNode }) {
  const [domLoaded, setDomLoaded] = useState(false);
  const [state, setState] = useAtom(settingsAtom);

  useEffect(() => {
    const editorState = localStorage.getItem("editor-state");
    if (editorState) {
      const data = JSON.parse(editorState);
      setState(data);
    }
    setDomLoaded(true);
  }, [setState]);

  useEffect(() => {
    if (!domLoaded) return;
    const timeout = setTimeout(() => {
      localStorage.setItem("editor-state", JSON.stringify(state));
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [domLoaded, state]);

  return (
    <ThemeProvider>
      {domLoaded ? (
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
          {children}
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
    </ThemeProvider>
  );
}
