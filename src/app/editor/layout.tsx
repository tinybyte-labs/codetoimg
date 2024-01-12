"use client";

import { ReactNode, useEffect, useState } from "react";
import SideBar from "./side-bar";
import { Button } from "@/components/ui/button";
import { Loader2, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeProvider from "@/components/theme-provider";
import { useAtom } from "jotai";
import { appStateAtom, appStateSchema } from "@/lib/atoms/app-state";
import Link from "next/link";
import Image from "next/image";
import ThemeToggleButton from "@/components/theme-toggle-button";
import NavBar from "./nav-bar";

export default function EditorLayout({ children }: { children: ReactNode }) {
  const [domLoaded, setDomLoaded] = useState(false);
  const [state, setState] = useAtom(appStateAtom);

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
    setDomLoaded(true);
  }, [setState]);

  useEffect(() => {
    if (!domLoaded) return;
    const timeout = setTimeout(() => {
      localStorage.setItem("editor-state", JSON.stringify(state));
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [domLoaded, state]);

  return (
    <ThemeProvider>
      {domLoaded ? (
        <div className="flex h-screen w-screen flex-col overflow-hidden">
          <NavBar />
          <div className="flex flex-1 overflow-hidden">
            <div className="flex h-full border-r bg-card max-md:hidden">
              <SideBar />
            </div>
            <div className="flex flex-1 overflow-hidden">{children}</div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
    </ThemeProvider>
  );
}
