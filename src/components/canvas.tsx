"use client";

import CodeEditor from "@/components/code-editor";
import { themes } from "@/data/themes";
import { Settings } from "@/lib/atoms/settings";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function Canvas({
  value,
  onChange,
  readOnly,
  showCopyIcon,
}: {
  value: Settings;
  onChange?: (value: Settings) => void;
  onTitleChange?: (value: string) => void;
  readOnly?: boolean;
  showCopyIcon?: boolean;
}) {
  const theme = useMemo(() => themes[value.theme], [value.theme]);
  const [copied, setCopied] = useState(false);

  const copyCode = useCallback(() => {
    if (copied) return;
    navigator.clipboard.writeText(value.code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }, [copied, value.code]);

  return (
    <div
      id="canvas"
      style={{
        backgroundColor: value.backgroundColor,
        backgroundImage: value.backgroundImage,
        backgroundSize: "cover",
        padding: value.padding,
        width: value.width,
        height: value.height,
      }}
    >
      <div
        className="relative overflow-hidden backdrop-blur-xl"
        style={{
          borderRadius: value.borderRadius,
          boxShadow: `
          0px 0px 0px 0.5px rgba(0,0,0,0.9),
          ${value.shadowX}px ${value.shadowY}px ${value.shadowBlur}px ${value.shadowSpread}px rgba(0,0,0,${value.shadowOpacity})
          `,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            borderRadius: value.borderRadius + 1,
            backgroundColor: theme.options.settings.background,
            opacity: value.backgroundBlur ? 0.8 : 1,
            boxShadow: `inset 0px 0px 0px 1px rgba(255,255,255, 0.3)`,
          }}
        />

        {value.showTitleBar && (
          <div className="relative h-14">
            {value.showTraficLights && (
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
                value={value.title}
                readOnly={readOnly}
                onChange={(e) => {
                  onChange?.({ ...value, title: e.currentTarget.value });
                }}
              />
            </div>
          </div>
        )}
        <div
          className={cn("p-4", {
            "pt-0": value.showTitleBar,
          })}
        >
          <CodeEditor
            value={value.code}
            onChange={(code) => onChange?.({ ...value, code })}
            language={value.language}
            fontSize={value.fontSize}
            showLineNumbers={value.showLineNumbers}
            theme={value.theme}
            readOnly={readOnly}
          />
        </div>

        {showCopyIcon && (
          <button
            className="absolute right-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-md"
            style={{
              color: theme.options.theme === "dark" ? "#FFFFFF" : "#000000",
              opacity: 0.5,
            }}
            onClick={copyCode}
            disabled={copied}
          >
            {copied ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}