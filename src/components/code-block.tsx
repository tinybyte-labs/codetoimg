"use client";

import { useMemo, useRef } from "react";
import CodeEditor from "./code-editor";
import { useAtom, useAtomValue } from "jotai";
import { themes } from "@/data/themes";
import { editorAtom } from "@/lib/atoms/editor";
import { cn } from "@/lib/utils";
import { titleAtom } from "@/lib/atoms/title";

export default function CodeBlock() {
  const editor = useAtomValue(editorAtom);
  const [title, setTitle] = useAtom(titleAtom);

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const theme = useMemo(() => themes[editor.theme], [editor.theme]);

  return (
    <div
      ref={canvasRef}
      id="canvas"
      style={{
        backgroundColor:
          editor.background?.type === "gradient" ||
          editor.background?.type === "color"
            ? editor.background.color
            : undefined,
        backgroundImage:
          editor.background?.type === "gradient"
            ? editor.background.image
            : editor.background?.type === "image"
              ? `url(${editor.background.url})`
              : undefined,
        backgroundSize: "cover",
        padding: editor.padding,
        width: editor.width,
        height: editor.height,
      }}
    >
      <div
        className="relative overflow-hidden backdrop-blur-xl"
        style={{
          borderRadius: editor.borderRadius,
          boxShadow: `
          0px 0px 0px 0.5px rgba(0,0,0,0.9),
          ${editor.shadow.x}px ${editor.shadow.y}px ${editor.shadow.blur}px ${editor.shadow.spread}px rgba(0,0,0,${editor.shadow.opacity})
          `,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            borderRadius: editor.borderRadius + 1,
            backgroundColor: theme.options.settings.background,
            opacity: editor.backgroundBlur ? 0.8 : 1,
            boxShadow: `inset 0px 0px 0px 1px rgba(255,255,255, 0.3)`,
          }}
        />

        {editor.showTitleBar && (
          <div className="relative h-14">
            {editor.showTraficLights && (
              <div className="absolute left-6 top-1/2 flex -translate-y-1/2 items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      theme.options.theme === "dark" ? "#FFFFFF" : "#000000",
                    opacity: 0.2,
                  }}
                ></div>
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      theme.options.theme === "dark" ? "#FFFFFF" : "#000000",
                    opacity: 0.2,
                  }}
                ></div>
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      theme.options.theme === "dark" ? "#FFFFFF" : "#000000",
                    opacity: 0.2,
                  }}
                ></div>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-24">
              <input
                className="flex-1 bg-transparent text-center text-white placeholder-white opacity-60 outline-none"
                value={title}
                onChange={(e) => {
                  setTitle(e.currentTarget.value);
                }}
              />
            </div>
          </div>
        )}
        <div
          className={cn("p-4", {
            "pt-0": editor.showTitleBar,
          })}
        >
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}
