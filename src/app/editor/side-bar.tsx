"use client";

import ThemeToggleButton from "@/components/theme-toggle-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  appStateAtom,
  initEditorState,
  isExportingAtom,
} from "@/lib/atoms/app-state";
import { ExportSettings, downloadHtmlElement } from "@/lib/utils";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Download, DownloadIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { logEvent } from "@/lib/gtag";
import FrameSettings from "./frame-settings";
import WindowSettings from "./window-settings";
import EditorSettings from "./editor-settings";
import BrandingSettings from "./branding-settings";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";

export default function SideBar() {
  const setEditorSettings = useSetAtom(appStateAtom);

  const handleReset = useCallback(() => {
    setEditorSettings((state) => ({
      ...initEditorState,
      editor: {
        ...initEditorState.editor,
        tabs: state.editor.tabs,
      },
    }));
    logEvent("reset_state");
  }, [setEditorSettings]);

  return (
    <Tabs asChild defaultValue="frame">
      <div className="flex">
        <TabsList className="flex w-48 flex-col gap-1 border-r p-2">
          <TabsTrigger value="frame" asChild>
            <Button
              variant="ghost"
              className="justify-start rounded-md data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              Frame
            </Button>
          </TabsTrigger>
          <TabsTrigger value="window" asChild>
            <Button
              variant="ghost"
              className="justify-start rounded-md data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              Window
            </Button>
          </TabsTrigger>
          <TabsTrigger value="editor" asChild>
            <Button
              variant="ghost"
              className="justify-start rounded-md data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              Editor
            </Button>
          </TabsTrigger>
          <TabsTrigger value="branding" asChild>
            <Button
              variant="ghost"
              className="justify-start rounded-md data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              Branding
            </Button>
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="w-72">
          <TabsContent className="mt-0" value="frame">
            <FrameSettings />
          </TabsContent>
          <TabsContent className="mt-0" value="window">
            <WindowSettings />
          </TabsContent>
          <TabsContent className="mt-0" value="editor">
            <EditorSettings />
          </TabsContent>
          <TabsContent className="mt-0" value="branding">
            <BrandingSettings />
          </TabsContent>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </Tabs>
  );
}
