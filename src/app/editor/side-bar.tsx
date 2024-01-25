"use client";

import ThemeToggleButton from "@/components/theme-toggle-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  appStateAtom,
  initEditorState,
  isExportingAtom,
} from "@/lib/atoms/app-state";
import {
  ExportSettings,
  copyNodeAsImage,
  downloadHtmlElement,
} from "@/lib/utils";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Check, CopyIcon, DownloadIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCallback, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { logEvent } from "@/lib/gtag";
import Link from "next/link";
import FrameSettings from "./frame-settings";
import WindowSettings from "./window-settings";
import EditorSettings from "./editor-settings";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import BrandingSettings from "./branding-settings";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SideBar() {
  const setEditorSettings = useSetAtom(appStateAtom);

  const handleReset = useCallback(() => {
    setEditorSettings(initEditorState);
    logEvent("reset_state");
  }, [setEditorSettings]);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex p-4 max-md:pr-14">
        <Link href="/">
          <Image
            src="/code-to-img.svg"
            alt="CodeToImg Logo"
            className="h-10 w-10 object-contain"
            width={512}
            height={512}
          />
        </Link>

        <div className="flex flex-1 items-center justify-end">
          <ThemeToggleButton />
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="space-y-6 py-4">
          <FrameSettings />
          <WindowSettings />
          <EditorSettings />
          <BrandingSettings />
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <div className="flex items-center gap-2 border-t p-4">
        <ExportButton />

        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}

const ExportButton = () => {
  const editorState = useAtomValue(appStateAtom);
  const [isExporting, setIsExporting] = useAtom(isExportingAtom);
  const [exportFormat, setExportFormat] =
    useState<ExportSettings["format"]>("png");
  const [exportScale, setExportScale] = useState<number>(2);
  const [exportQuality, setExportQuality] = useState<number>(1);
  const [filename, setFilename] = useState("codetoimg-snippet");
  const canvasRef = useRef<HTMLElement | null>(null);
  const { toast } = useToast();
  const [isCopying, setIsCopying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const handleExport = useCallback(async () => {
    if (isExporting) return;
    if (!canvasRef.current) return;

    setIsExporting(true);
    try {
      const export_settings: ExportSettings = {
        format: exportFormat,
        scale: exportScale,
        filename: filename || "codetoimg",
        quality: exportQuality,
      };
      await downloadHtmlElement(canvasRef.current, export_settings);
      logEvent("export", {
        state: editorState,
        export_settings,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Failed to export",
        description: error.message ?? "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  }, [
    isExporting,
    setIsExporting,
    exportFormat,
    exportScale,
    filename,
    exportQuality,
    editorState,
    toast,
  ]);

  const handleCopy = useCallback(async () => {
    if (!canvasRef.current) return;
    if (isExporting || isCopying || isCopied) return;

    try {
      setIsCopying(true);
      await copyNodeAsImage(canvasRef.current, exportScale);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Failed to export",
        description: error.message ?? "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setIsCopying(false);
    }
  }, [exportScale, isCopied, isCopying, isExporting, toast]);

  return (
    <Popover
      onOpenChange={(opened) => {
        if (opened) {
          canvasRef.current = document.getElementById("canvas");
          if (canvasRef.current) {
            setCanvasSize({
              width: canvasRef.current.clientWidth,
              height: canvasRef.current.clientHeight,
            });
          }
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button className="flex-1">Export</Button>
      </PopoverTrigger>
      <PopoverContent side="right" sideOffset={8} align="end" className="w-80">
        <div className="space-y-6 py-4">
          <fieldset className="space-y-2">
            <Label htmlFor="filename">Filename</Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => {
                setFilename(e.currentTarget.value);
              }}
              placeholder="codetoimg"
            />
          </fieldset>

          <fieldset className="space-y-2">
            <Label htmlFor="export-format">Format</Label>
            <Tabs
              value={exportFormat}
              onValueChange={(value) => setExportFormat(value as any)}
            >
              <TabsList className="w-full">
                <TabsTrigger className="flex-1" value="png">
                  PNG
                </TabsTrigger>
                <TabsTrigger className="flex-1" value="jpeg">
                  JPEG
                </TabsTrigger>
                <TabsTrigger className="flex-1" value="svg">
                  SVG
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </fieldset>

          <fieldset className="space-y-2">
            <Label htmlFor="export-format">Scale</Label>

            <Tabs
              value={exportScale.toString()}
              onValueChange={(value) => setExportScale(Number(value))}
            >
              <TabsList className="w-full">
                {[1, 2, 3, 4].map((scale) => (
                  <TabsTrigger
                    key={scale}
                    className="flex-1"
                    value={scale.toString()}
                  >
                    {scale}x
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </fieldset>

          {exportFormat === "jpeg" && (
            <fieldset className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="export-quality">Quality</Label>
                <p className="text-sm text-muted-foreground">
                  {Math.round(exportQuality * 100)}%
                </p>
              </div>
              <Slider
                id="export-quality"
                value={[exportQuality]}
                onValueChange={(values) => {
                  setExportQuality(values[0]);
                }}
                min={0}
                max={1}
                step={0.01}
              />
            </fieldset>
          )}

          <div className="flex items-center justify-between gap-4">
            <Label>Output Resolution</Label>
            <p className="text-right text-sm text-muted-foreground">
              {canvasSize.width * exportScale}x{canvasSize.height * exportScale}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <Loader2 size={18} className="-ml-1 mr-2 animate-spin" />
            ) : (
              <DownloadIcon size={18} className="-ml-1 mr-2" />
            )}
            Download
          </Button>
          <Button
            variant="secondary"
            onClick={handleCopy}
            disabled={isExporting || isCopied || isCopying}
          >
            {isCopied ? (
              <Check size={18} className="-ml-1 mr-2" />
            ) : isCopying ? (
              <Loader2 size={18} className="-ml-1 mr-2 animate-spin" />
            ) : (
              <CopyIcon size={18} className="-ml-1 mr-2" />
            )}
            {isCopied ? "Copied" : "Copy"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
