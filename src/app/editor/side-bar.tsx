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
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

export default function SideBar() {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
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
        <Button className="flex-1" onClick={() => setExportDialogOpen(true)}>
          Export
          <Download size={20} className="-mr-1 ml-2" />
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
      />
    </div>
  );
}

const ExportDialog = ({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const editorState = useAtomValue(appStateAtom);
  const [isExporting, setIsExporting] = useAtom(isExportingAtom);
  const [exportFormat, setExportFormat] =
    useState<ExportSettings["format"]>("png");
  const [exportScale, setExportScale] = useState<number>(2);
  const [exportQuality, setExportQuality] = useState<number>(1);
  const [filename, setFilename] = useState("codetoimg-snippet");
  const canvasRef = useRef<HTMLElement | null>(null);
  const { toast } = useToast();

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
      onOpenChange?.(false);
    } catch (err: any) {
      console.log(err);
      toast({
        title: "Failed to export",
        description: err.message ?? "Something went wrong!",
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
    onOpenChange,
    toast,
  ]);

  useEffect(() => {
    canvasRef.current = document.getElementById("canvas");
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Image</DialogTitle>
        </DialogHeader>

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

          <fieldset className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="export-scale">Scale</Label>
              <p className="text-sm text-muted-foreground">{exportScale}x</p>
            </div>
            <Slider
              id="export-scale"
              value={[exportScale]}
              onValueChange={(values) => {
                setExportScale(values[0]);
              }}
              min={1}
              max={4}
              step={1}
            />
          </fieldset>

          <div className="flex items-center justify-between gap-4">
            <Label>Output Resolution</Label>
            <p className="text-right text-sm text-muted-foreground">
              {(canvasRef.current?.clientWidth ?? 0) * exportScale}x
              {(canvasRef.current?.clientHeight ?? 0) * exportScale}
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting && (
              <Loader2 size={18} className="-ml-1 mr-2 animate-spin" />
            )}
            Export
            <DownloadIcon className="-mr-1 ml-2 h-5 w-5" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
