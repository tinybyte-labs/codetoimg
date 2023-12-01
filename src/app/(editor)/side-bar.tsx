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
import { GRADIENTS } from "@/data/gradients";
import {
  backgroundBlurAtom,
  borderRadiusAtom,
  settingsAtom,
  fontSizeAtom,
  initSettings,
  isExportingAtom,
  languageAtom,
  paddingAtom,
  showLineNumbersAtom,
  showTitleBarAtom,
  showTraficLightsAtom,
  themeAtom,
} from "@/lib/atoms/settings";
import { themes } from "@/data/themes";
import {
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
import Link from "next/link";
import { useCallback, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { COLORS } from "@/data/colors";
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

export default function SideBar() {
  const [settings, setSettings] = useAtom(settingsAtom);
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  const [backgroundBlur, setBackgroundBlur] = useAtom(backgroundBlurAtom);
  const [showTitleBar, setShowTitleBar] = useAtom(showTitleBarAtom);
  const [showTraficLights, setShowTraficLights] = useAtom(showTraficLightsAtom);
  const [showLineNumbers, setShowLineNumbers] = useAtom(showLineNumbersAtom);
  const [borderRadius, setBorderRadius] = useAtom(borderRadiusAtom);
  const [padding, setPadding] = useAtom(paddingAtom);
  const [language, setLanguage] = useAtom(languageAtom);
  const [theme, setTheme] = useAtom(themeAtom);
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
  }, [setSettings]);

  const copyEmbeding = useCallback(() => {
    const canvas = document.getElementById("canvas");
    const changes = objectDiff(settings, initSettings);
    const params = new URLSearchParams(changes);
    const src = `${window.location.origin}/embed?${params.toString()}`;
    navigator.clipboard.writeText(
      `<iframe src="${src}" style="width: ${
        canvas?.clientWidth ?? 0
      }px; height: ${
        canvas?.clientHeight ?? 0
      }px; border:0; transform: scale(1); overflow:hidden;" sandbox="allow-scripts allow-same-origin"></iframe>`,
    );
    toast({ title: "Copied!" });
  }, [settings, toast]);

  const copyPlanImage = useCallback(async () => {
    if (isExporting) return;

    const canvas = document.getElementById("canvas");
    if (canvas) {
      setIsExporting(true);
      try {
        await copyNodeAsImage(canvas);
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
  }, [isExporting, setIsExporting, toast]);

  const copyPlanUrl = useCallback(() => {
    const changes = objectDiff(settings, initSettings);
    const params = new URLSearchParams(changes);
    const url = `${window.location.origin}/?${params.toString()}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Copied!" });
  }, [settings, toast]);

  const hadnleExport = useCallback(async () => {
    if (isExporting) return;
    const canvas = document.getElementById("canvas");
    if (canvas) {
      setIsExporting(true);
      try {
        await downloadHtmlElement(canvas, {
          format: exportFormat,
          scale: exportScale,
          title: filename || "codetoimg",
        });
        setExportDialogOpen(false);
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsExporting(false);
      }
    }
  }, [exportFormat, exportScale, filename, isExporting, setIsExporting]);

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
          <fieldset>
            <Tabs defaultValue="gradient">
              <div className="space-y-1 px-4">
                <Label>Background</Label>
                <TabsList className="w-full">
                  <TabsTrigger className="flex-1" value="color">
                    Color
                  </TabsTrigger>
                  <TabsTrigger className="flex-1" value="gradient">
                    Gradient
                  </TabsTrigger>
                  <TabsTrigger className="flex-1" value="image">
                    Image
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="color" asChild>
                <ColorPicker />
              </TabsContent>
              <TabsContent value="gradient" asChild>
                <GradientPicker />
              </TabsContent>
              <TabsContent value="image" asChild>
                <ImagePicker />
              </TabsContent>
            </Tabs>
          </fieldset>

          <fieldset className="space-y-1 px-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="padding">Padding</Label>
              <p className="text-sm text-muted-foreground">{padding}px</p>
            </div>
            <Slider
              id="padding"
              value={[padding]}
              onValueChange={(values) => {
                setPadding(values[0]);
              }}
              min={32}
              max={128}
              step={1}
            />
          </fieldset>

          <fieldset className="space-y-1 px-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="border-radius">Roundness</Label>
              <p className="text-sm text-muted-foreground">{borderRadius}px</p>
            </div>
            <Slider
              id="border-radius"
              value={[borderRadius]}
              onValueChange={(values) => {
                setBorderRadius(values[0]);
              }}
              min={0}
              max={100}
              step={1}
            />
          </fieldset>

          <fieldset className="space-y-1 px-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="shadow-opacity">Shadow</Label>
              <p className="text-sm text-muted-foreground">
                {settings.shadowOpacity}
              </p>
            </div>
            <Slider
              id="shadow-opacity"
              value={[settings.shadowOpacity]}
              onValueChange={(values) => {
                setSettings((settings) => ({
                  ...settings,
                  shadowOpacity: values[0],
                }));
              }}
              min={0}
              max={1}
              step={0.1}
            />
          </fieldset>

          <fieldset className="space-y-1 px-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="shadow-opacity">Font Size</Label>
              <p className="text-sm text-muted-foreground">{fontSize}</p>
            </div>
            <Slider
              id="shadow-opacity"
              value={[fontSize]}
              onValueChange={(values) => {
                setFontSize(values[0]);
              }}
              min={12}
              max={32}
              step={1}
            />
          </fieldset>

          <fieldset className="space-y-1 px-4">
            <Label htmlFor="background-blur">Language</Label>
            <Select
              value={language}
              onValueChange={(lang: LanguageName) => setLanguage(lang)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languageNames)
                  .sort((a, b) => a[0].localeCompare(b[0]))
                  .map((item) => (
                    <SelectItem key={item[0]} value={item[0]}>
                      {item[1]}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </fieldset>

          <fieldset className="space-y-1 px-4">
            <Label htmlFor="background-blur">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(themes)
                  .sort()
                  .map((option) => (
                    <SelectItem key={option} value={option}>
                      {themes[option]?.name || "Unknown"}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </fieldset>

          <fieldset className="flex items-center justify-between px-4">
            <Label htmlFor="background-blur">Background Blur</Label>
            <Switch
              id="background-blur"
              checked={backgroundBlur}
              onCheckedChange={setBackgroundBlur}
            />
          </fieldset>

          <fieldset className="flex items-center justify-between px-4">
            <Label htmlFor="show-title-bar">Title Bar</Label>
            <Switch
              id="show-title-bar"
              checked={showTitleBar}
              onCheckedChange={setShowTitleBar}
            />
          </fieldset>

          {showTitleBar && (
            <>
              <fieldset className="flex items-center justify-between px-4">
                <Label htmlFor="show-trafic-lights">Trafic Lights</Label>
                <Switch
                  id="show-trafic-lights"
                  checked={showTraficLights}
                  onCheckedChange={setShowTraficLights}
                />
              </fieldset>
            </>
          )}

          <fieldset className="flex items-center justify-between px-4">
            <Label htmlFor="line-numbers">Line Numbers</Label>
            <Switch
              id="line-numbers"
              checked={showLineNumbers}
              onCheckedChange={setShowLineNumbers}
            />
          </fieldset>
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
              <DropdownMenuItem onClick={copyPlanUrl}>
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

const ColorPicker = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  return (
    <ScrollArea className="w-80">
      <div className="grid grid-flow-col grid-rows-2 gap-2 p-4">
        {COLORS.map((color, i) => (
          <button
            key={i}
            onClick={() =>
              setSettings((settings) => ({
                ...settings,
                backgroundColor: color,
                backgroundImage: undefined,
              }))
            }
            className={cn(
              "relative h-14 w-14 overflow-hidden rounded-xl border",
              {
                "ring-2 ring-ring ring-offset-2 ring-offset-background":
                  settings.backgroundColor === color,
              },
            )}
          >
            <div className="transparent-grid absolute inset-0"></div>
            <div
              className="absolute inset-0 z-10"
              style={{
                backgroundColor: color,
              }}
            ></div>
            <p className="sr-only">Gradient color {i}</p>
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const GradientPicker = () => {
  const [settings, setSettings] = useAtom(settingsAtom);
  return (
    <ScrollArea className="w-80">
      <div className="grid w-fit grid-flow-col grid-rows-2 gap-2 p-4">
        {GRADIENTS.map((gradient, i) => (
          <button
            key={i}
            onClick={() =>
              setSettings((settings) => ({
                ...settings,
                backgroundColor: undefined,
                backgroundImage: gradient,
              }))
            }
            style={{
              backgroundImage: gradient,
            }}
            className={cn("h-14 w-14 rounded-xl border", {
              "ring-2 ring-ring ring-offset-2 ring-offset-background":
                settings.backgroundImage === gradient,
            })}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const IMAGES = [
  "/images/wallpapers/wallpaper-01.png",
  "/images/wallpapers/wallpaper-02.png",
  "/images/wallpapers/wallpaper-03.png",
  "/images/wallpapers/wallpaper-04.png",
  "/images/wallpapers/wallpaper-05.png",
  "/images/wallpapers/wallpaper-06.png",
  "/images/wallpapers/wallpaper-07.png",
  "/images/wallpapers/wallpaper-08.png",
  "/images/wallpapers/wallpaper-09.png",
  "/images/wallpapers/wallpaper-10.png",
  "/images/wallpapers/wallpaper-11.png",
  "/images/wallpapers/wallpaper-12.png",
];

const ImagePicker = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  return (
    <ScrollArea className="w-80 whitespace-nowrap">
      <div className="flex gap-4 whitespace-nowrap p-4">
        {IMAGES.map((imageUrl, i) => (
          <button
            key={i}
            onClick={() =>
              setSettings((settings) => ({
                ...settings,
                backgroundColor: undefined,
                backgroundImage: `url(${imageUrl})`,
              }))
            }
            className={cn(
              "h-[120px] w-[180px] overflow-hidden rounded-xl border",
              {
                "ring-2 ring-ring ring-offset-2 ring-offset-background":
                  settings.backgroundImage === `url(${imageUrl})`,
              },
            )}
          >
            <Image
              src={imageUrl}
              alt="Wallpaper"
              width={180}
              height={120}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
