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
  backgroundAtom,
  backgroundBlurAtom,
  borderRadiusAtom,
  editorAtom,
  fontSizeAtom,
  initEditorState,
  isExportingAtom,
  languageAtom,
  paddingAtom,
  shadowAtom,
  showLineNumbersAtom,
  showTitleBarAtom,
  showTraficLightsAtom,
  themeAtom,
} from "@/lib/atoms/editor";
import { titleAtom } from "@/lib/atoms/title";
import { themes } from "@/data/themes";
import { cn, downloadHtmlElement } from "@/lib/utils";
import { LanguageName, langNames } from "@uiw/codemirror-extensions-langs";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Download, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { COLORS } from "@/data/colors";
import { languageNames } from "@/data/language-names";

export default function SideBar() {
  const setEditor = useSetAtom(editorAtom);
  const title = useAtomValue(titleAtom);
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  const [backgroundBlur, setBackgroundBlur] = useAtom(backgroundBlurAtom);
  const [showTitleBar, setShowTitleBar] = useAtom(showTitleBarAtom);
  const [showTraficLights, setShowTraficLights] = useAtom(showTraficLightsAtom);
  const [showLineNumbers, setShowLineNumbers] = useAtom(showLineNumbersAtom);
  const [shadow, setShadow] = useAtom(shadowAtom);
  const [borderRadius, setBorderRadius] = useAtom(borderRadiusAtom);
  const [padding, setPadding] = useAtom(paddingAtom);
  const [language, setLanguage] = useAtom(languageAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const [background, setBackground] = useAtom(backgroundAtom);
  const [isExporting, setIsExporting] = useAtom(isExportingAtom);

  const handleReset = useCallback(() => {
    setEditor(initEditorState);
  }, [setEditor]);

  const hadnleExport = useCallback(async () => {
    if (isExporting) return;
    const canvas = document.getElementById("canvas");
    if (canvas) {
      setIsExporting(true);
      try {
        await downloadHtmlElement(canvas, {
          format: ".png",
          scale: 3,
          title: title || "image",
        });
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsExporting(false);
      }
    }
  }, [title, isExporting, setIsExporting]);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex p-4">
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
            <Tabs defaultValue={background?.type || "gradient"}>
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
              <p className="text-sm text-muted-foreground">{shadow.opacity}</p>
            </div>
            <Slider
              id="shadow-opacity"
              value={[shadow.opacity]}
              onValueChange={(values) => {
                setShadow((shadow) => ({ ...shadow, opacity: values[0] }));
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

      <div className="flex items-center gap-4 border-t p-4">
        <Button
          className="flex-1"
          disabled={isExporting}
          onClick={hadnleExport}
        >
          {isExporting ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              Export
              <Download size={20} className="ml-2" />
            </>
          )}
        </Button>
        <Button
          variant="secondary"
          disabled={isExporting}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

const ColorPicker = () => {
  const [background, setBackground] = useAtom(backgroundAtom);

  return (
    <ScrollArea className="w-80">
      <div className="grid grid-flow-col grid-rows-2 gap-2 p-4">
        {COLORS.map((color, i) => (
          <button
            key={i}
            onClick={() => setBackground({ type: "color", color })}
            className={cn(
              "relative h-14 w-14 overflow-hidden rounded-xl border",
              {
                "ring-2 ring-ring ring-offset-2 ring-offset-background":
                  background?.type === "color" && background.color === color,
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
  const [background, setBackground] = useAtom(backgroundAtom);
  return (
    <ScrollArea className="w-80">
      <div className="grid w-fit grid-flow-col grid-rows-2 gap-2 p-4">
        {GRADIENTS.map((gradient, i) => (
          <button
            key={i}
            onClick={() => setBackground(gradient)}
            style={{
              backgroundColor: gradient.color,
              backgroundImage: gradient.image,
            }}
            className={cn("h-14 w-14 rounded-xl border", {
              "ring-2 ring-ring ring-offset-2 ring-offset-background":
                background?.type === "gradient" &&
                background.image === gradient.image,
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
  const [background, setBackground] = useAtom(backgroundAtom);
  return (
    <ScrollArea className="w-80 whitespace-nowrap">
      <div className="flex gap-4 whitespace-nowrap p-4">
        {IMAGES.map((imageUrl, i) => (
          <button
            key={i}
            onClick={() =>
              setBackground({
                type: "image",
                url: imageUrl,
                scale: background?.type === "image" ? background.scale : 100,
              })
            }
            className={cn(
              "h-[120px] w-[180px] overflow-hidden rounded-xl border",
              {
                "ring-2 ring-ring ring-offset-2 ring-offset-background":
                  background?.type === "image" && background.url === imageUrl,
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
