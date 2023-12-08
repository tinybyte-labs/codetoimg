"use client";

import ThemeToggleButton from "@/components/theme-toggle-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  settingsAtom,
  initSettings,
  isExportingAtom,
} from "@/lib/atoms/settings";
import { themes } from "@/data/themes";
import {
  ExportSettings,
  cn,
  copyNodeAsImage,
  downloadHtmlElement,
  objectDiff,
} from "@/lib/utils";
import { LanguageName } from "@uiw/codemirror-extensions-langs";
import { useAtom } from "jotai";
import {
  CodeIcon,
  Copy,
  Download,
  ImageIcon,
  LinkIcon,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { languageNames } from "@/data/language-names";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { logEvent } from "@/lib/gtag";
import Link from "next/link";
import FrameSettings from "./frame-settings";
import WindowSettings from "./window-settings";
import EditorSettings from "./editor-settings";

export default function SideBar() {
  const [state, setSettings] = useAtom(settingsAtom);
  const [isExporting, setIsExporting] = useAtom(isExportingAtom);
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState<"png" | "jpeg" | "svg">(
    "png",
  );
  const [exportScale, setExportSclae] = useState<number>(2);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [filename, setFilename] = useState("codetoimg");

  const handleReset = useCallback(() => {
    setSettings(initSettings);
    logEvent("reset_state");
  }, [setSettings]);

  const copyEmbeding = useCallback(async () => {
    const canvas = document.getElementById("canvas");
    const changes = objectDiff(state, initSettings);
    const params = new URLSearchParams(changes);
    const src = `${window.location.origin}/embed?${params.toString()}`;
    navigator.clipboard.writeText(
      `<iframe src="${src}" style="width: ${
        canvas?.clientWidth ?? 0
      }px; height: ${
        canvas?.clientHeight ?? 0
      }px; border:0; transform: scale(1); overflow:hidden;" sandbox="allow-scripts allow-same-origin"></iframe>`,
    );
    logEvent("copy_embeding", {
      state,
    });
    toast({ title: "Copied!" });
  }, [state, toast]);

  const copyPlanImage = useCallback(async () => {
    if (isExporting) return;

    const canvas = document.getElementById("canvas");
    if (canvas) {
      setIsExporting(true);
      try {
        await copyNodeAsImage(canvas);
        logEvent("copy_image", {
          state,
        });
        toast({ title: "Copied!" });
      } catch (err: any) {
        toast({
          title: "Faield to copy",
          description: err.message || "Something went wrong!",
          variant: "destructive",
        });
      } finally {
        setIsExporting(false);
      }
    }
  }, [isExporting, setIsExporting, state, toast]);

  const copyUrl = useCallback(() => {
    const changes = objectDiff(state, initSettings);
    const params = new URLSearchParams(changes);
    const url = `${window.location.origin}/?${params.toString()}`;
    navigator.clipboard.writeText(url);
    logEvent("copy_url", {
      state,
    });
    toast({ title: "Copied!" });
  }, [state, toast]);

  const hadnleExport = useCallback(async () => {
    if (isExporting) return;
    const canvas = document.getElementById("canvas");
    if (canvas) {
      setIsExporting(true);
      try {
        const export_settings: ExportSettings = {
          format: exportFormat,
          scale: exportScale,
          filename: filename || "codetoimg",
        };
        await downloadHtmlElement(canvas, export_settings);
        logEvent("export", {
          state,
          export_settings,
        });
        setExportDialogOpen(false);
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsExporting(false);
      }
    }
  }, [exportFormat, exportScale, filename, isExporting, setIsExporting, state]);

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
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <div className="flex items-center gap-2 border-t p-4">
        <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex-1">
              Export
              <Download size={20} className="-mr-1 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
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
                <Select
                  value={exportFormat}
                  onValueChange={(value) => setExportFormat(value as any)}
                >
                  <SelectTrigger id="export-format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="svg">SVG</SelectItem>
                  </SelectContent>
                </Select>
              </fieldset>
              {exportFormat !== "svg" && (
                <fieldset className="space-y-2">
                  <Label htmlFor="export-scale">Scale</Label>
                  <Select
                    value={String(exportScale)}
                    onValueChange={(value) => setExportSclae(Number(value))}
                  >
                    <SelectTrigger id="export-scale">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1x</SelectItem>
                      <SelectItem value="2">2x</SelectItem>
                      <SelectItem value="3">3x</SelectItem>
                      <SelectItem value="4">4x</SelectItem>
                    </SelectContent>
                  </Select>
                </fieldset>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button onClick={hadnleExport} disabled={isExporting}>
                {isExporting && (
                  <Loader2 size={18} className="-ml-1 mr-2 animate-spin" />
                )}
                Export
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <p className="sr-only">Copy</p>
              <Copy size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Copy to Clipboard</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={copyPlanImage}>
                <ImageIcon size={18} className="mr-2" />
                Image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={copyUrl}>
                <LinkIcon size={18} className="mr-2" />
                URL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={copyEmbeding}>
                <CodeIcon size={18} className="mr-2" />
                Embeding
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
