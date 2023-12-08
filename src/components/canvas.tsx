"use client";

import CodeEditor from "@/components/code-editor";
import { themes } from "@/data/themes";
import { EditorState } from "@/lib/atoms/editor-state";
import { logEvent } from "@/lib/gtag";
import { cn } from "@/lib/utils";
import { backgroundStyle } from "@/lib/utils/background-style";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function Canvas({
  value,
  onChange,
  readOnly,
  showCopyIcon,
}: {
  value: EditorState;
  onChange?: (value: EditorState) => void;
  onTitleChange?: (value: string) => void;
  readOnly?: boolean;
  showCopyIcon?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const theme = useMemo(() => themes[value.widnow.theme], [value.widnow.theme]);

  const copyCode = useCallback(() => {
    if (copied) return;
    navigator.clipboard.writeText(value.code);
    setCopied(true);
    logEvent("copy_code", { code: value.code });
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }, [copied, value.code]);

  return (
    <div
      id="canvas"
      style={{
        padding: value.frame.padding,
        width: value.frame.width,
        height: value.frame.height,
      }}
      className="relative"
    >
      <div
        className="absolute inset-0"
        style={{
          display: value.frame.hidden ? "none" : "block",
          opacity: value.frame.opacity,
          ...backgroundStyle(value.frame.background),
        }}
      />
      <div
        className="relative overflow-hidden backdrop-blur-2xl"
        style={{
          borderRadius: value.widnow.borderRadius,
          boxShadow: value.widnow.shadow,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            borderRadius: value.widnow.borderRadius + 1,
            backgroundImage:
              "linear-gradient(135deg, rgba(0,0,0,0), rgba(0,0,0,.4))",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundColor: theme.options.settings.background,
          }}
        />

        {value.widnow.showTitleBar && (
          <div className="relative h-14">
            {value.widnow.showTraficLights && (
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
                className="flex-1 bg-transparent text-center opacity-60 outline-none"
                style={{
                  color: theme.options.theme === "dark" ? "#FFFFFF" : "#000000",
                }}
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
            "pt-0": value.widnow.showTitleBar,
          })}
        >
          <CodeEditor
            value={value.code}
            onChange={(code) => onChange?.({ ...value, code })}
            language={value.editor.language}
            fontSize={value.editor.fontSize}
            showLineNumbers={value.editor.showLineNumbers}
            theme={value.widnow.theme}
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
