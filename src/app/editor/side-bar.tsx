/* eslint-disable @next/next/no-img-element */
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
import { logEvent } from "@/lib/gtag";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BASE_URL } from "@/constants";

export default function SideBar() {
  const [state, setSettings] = useAtom(settingsAtom);
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
          <fieldset className="flex items-center justify-between gap-4 px-4">
            <Label>Background</Label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="transparent-grid relative aspect-[3/2] h-10 overflow-hidden rounded-md border">
                  <div
                    className="absolute inset-0"
                    style={{
                      display: state.background.hidden ? "none" : "block",
                      opacity: state.background.opacity,
                      ...(state.background.type === "color"
                        ? {
                            backgroundColor: state.background.color,
                          }
                        : state.background.type === "gradient"
                          ? {
                              backgroundImage: state.background.gradient,
                            }
                          : state.background.type === "image"
                            ? {
                                backgroundImage: `url(${state.background.imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }
                            : {}),
                    }}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="w-96">
                <Tabs defaultValue="gradient">
                  <TabsList className="w-full">
                    <TabsTrigger className="flex-1" value="gradient">
                      Gradient
                    </TabsTrigger>
                    <TabsTrigger className="flex-1" value="color">
                      Color
                    </TabsTrigger>
                    <TabsTrigger className="flex-1" value="image">
                      Image
                    </TabsTrigger>
                  </TabsList>
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
              </PopoverContent>
            </Popover>
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
                {state.shadowOpacity}
              </p>
            </div>
            <Slider
              id="shadow-opacity"
              value={[state.shadowOpacity]}
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

const ColorPicker = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  return (
    <div className="pt-4">
      <Input
        placeholder="Enter a valid hex color value"
        value={
          settings.background.type === "color" ? settings.background.color : ""
        }
        onChange={(e) => {
          console.log(e);
          setSettings({
            ...settings,
            background: {
              ...settings.background,
              type: "color",
              color: e.currentTarget.value,
            },
          });
        }}
      />
      <div className="grid grid-cols-6 gap-2 pt-4">
        {COLORS.map((color) => (
          <button
            key={color}
            onClick={() =>
              setSettings((settings) => ({
                ...settings,
                background: {
                  ...settings.background,
                  type: "color",
                  color,
                },
              }))
            }
            className={cn("aspect-square rounded-full border", {
              "ring-2 ring-ring ring-offset-2 ring-offset-background":
                settings.background.type === "color" &&
                settings.background.color === color,
            })}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

const GradientPicker = () => {
  const [settings, setSettings] = useAtom(settingsAtom);
  return (
    <div className="pt-4">
      <Input
        placeholder="Enter a valid CSS gradient value"
        value={
          settings.background.type === "gradient"
            ? settings.background.gradient
            : ""
        }
        onChange={(e) => {
          setSettings({
            ...settings,
            background: {
              ...settings.background,
              type: "gradient",
              gradient: e.currentTarget.value,
            },
          });
        }}
      />
      <div className="grid grid-cols-6 gap-2 pt-4">
        {GRADIENTS.map((gradient) => (
          <button
            key={gradient}
            onClick={() =>
              setSettings((settings) => ({
                ...settings,
                background: {
                  ...settings.background,
                  type: "gradient",
                  gradient,
                },
              }))
            }
            style={{ backgroundImage: gradient }}
            className={cn("aspect-square rounded-full border", {
              "ring-2 ring-ring ring-offset-2 ring-offset-background":
                settings.background.type === "gradient" &&
                settings.background.gradient === gradient,
            })}
          />
        ))}
      </div>
    </div>
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
].map((imageUrl) => `${BASE_URL}${imageUrl}`);

const ImagePicker = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  return (
    <div className="pt-4">
      <Input
        placeholder="Enter a valid image URL"
        value={
          settings.background.type === "image"
            ? settings.background.imageUrl
            : ""
        }
        onChange={(e) => {
          setSettings((settings) => ({
            ...settings,
            background: {
              ...settings.background,
              type: "image",
              imageUrl: e.currentTarget.value,
            },
          }));
        }}
        className="flex-1"
      />
      <p className="my-2 text-center text-sm text-muted-foreground">OR</p>
      <div className="relative">
        <Button asChild className="w-full" variant="outline">
          <label htmlFor="image-picker" className=" cursor-pointer">
            Upload Image
          </label>
        </Button>
        <input
          id="image-picker"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const files = e.currentTarget.files;
            if (files && files.length > 0) {
              setSettings((settings) => ({
                ...settings,
                background: {
                  ...settings.background,
                  type: "image",
                  imageUrl: URL.createObjectURL(files[0]),
                },
              }));
            }
          }}
          className="pointer-events-none absolute opacity-0"
        />
      </div>
      <div className="grid grid-cols-3 gap-2 pt-4">
        {IMAGES.map((imageUrl, i) => (
          <button
            key={i}
            onClick={() =>
              setSettings((settings) => ({
                ...settings,
                background: {
                  ...settings.background,
                  type: "image",
                  imageUrl,
                },
              }))
            }
            className={cn("aspect-[3/2] overflow-hidden rounded-xl border", {
              "ring-2 ring-ring ring-offset-2 ring-offset-background":
                settings.background.type === "image" &&
                settings.background.imageUrl === imageUrl,
            })}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
};
