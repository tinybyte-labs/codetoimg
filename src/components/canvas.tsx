"use client";

import CodeEditor from "@/components/code-editor";
import { themes } from "@/data/themes";
import { activeTabIndexAtom } from "@/lib/atoms/active-tab-index";
import { Editor, EditorState } from "@/lib/atoms/editor-state";
import { cn } from "@/lib/utils";
import { backgroundStyle } from "@/lib/utils/background-style";
import { getRandomId } from "@/lib/utils/getRandomId";
import { useAtom } from "jotai";
import { MinusIcon, PlusIcon, SquareIcon, XIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

export default function Canvas({
  value,
  onChange,
  readOnly,
}: {
  value: EditorState;
  onChange?: (value: EditorState) => void;
  onTitleChange?: (value: string) => void;
  readOnly?: boolean;
  showCopyIcon?: boolean;
}) {
  const [activeTabIndex, setActiveTabIndex] = useAtom(activeTabIndexAtom);
  const theme = useMemo(() => themes[value.widnow.theme], [value.widnow.theme]);

  const setEditors = useCallback(
    (editors: Editor[]) => {
      onChange?.({
        ...value,
        editor: {
          ...value.editor,
          editors,
        },
      });
    },
    [onChange, value],
  );

  const handleNewTab = useCallback(() => {
    setEditors([
      ...value.editor.editors,
      {
        id: getRandomId(),
        code: `console.log("Hello, World!");`,
        tabName: "index.ts",
        language: "typescript",
        weight: 0,
      },
    ]);
    setActiveTabIndex(value.editor.editors.length);
  }, [setActiveTabIndex, setEditors, value.editor.editors]);

  const handleDeleteTab = useCallback(
    (index: number) => {
      setEditors(value.editor.editors.filter((_, i) => i !== index));
      console.log({ activeTabIndex, length: value.editor.editors.length });
      if (activeTabIndex === index) {
        setActiveTabIndex(Math.max(0, index - 1));
      } else if (activeTabIndex >= value.editor.editors.length - 1) {
        setActiveTabIndex(value.editor.editors.length - 2);
      }
    },
    [activeTabIndex, setActiveTabIndex, setEditors, value.editor.editors],
  );

  return (
    <div
      id="canvas"
      style={{
        padding: value.frame.padding,
        width: value.frame.width,
        height: value.frame.height,
      }}
      className="relative flex min-w-fit items-center overflow-hidden"
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
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: value.widnow.borderRadius,
          boxShadow: value.widnow.shadow,
          backgroundColor: theme.options.settings.background,
        }}
      >
        {value.widnow.showTitleBar && (
          <div className="relative pt-3">
            <div className="flex items-center">
              {value.widnow.type === "macOs" && (
                <div className="flex items-center gap-2 pl-6 pr-3">
                  <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                  <div className="h-3 w-3 rounded-full bg-[#28C840]" />
                </div>
              )}

              <div className="flex flex-1 items-center gap-1 px-3">
                {value.editor.editors.map((editor, i) => {
                  const active = i === activeTabIndex;
                  return (
                    <div key={editor.id} className="relative">
                      <button
                        className={cn(
                          "group relative h-8 min-w-[100px] overflow-hidden rounded-md pl-3 text-sm",
                          value.editor.editors.length === 1 ? "pr-3" : "pr-7",
                        )}
                        onClick={() => setActiveTabIndex(i)}
                      >
                        <div
                          className={cn(
                            "absolute inset-0",
                            active
                              ? "opacity-10"
                              : "opacity-0 group-hover:opacity-5",
                          )}
                          style={{
                            backgroundColor:
                              theme.options.theme === "dark"
                                ? "#FFFFFF"
                                : "#000000",
                          }}
                        />
                        <p
                          className={cn(
                            "text-left leading-6",
                            active
                              ? "opacity-80"
                              : "opacity-50 group-hover:opacity-80",
                          )}
                          style={{
                            color:
                              theme.options.theme === "dark"
                                ? "#FFFFFF"
                                : "#000000",
                          }}
                        >
                          {editor.tabName}
                        </p>
                      </button>
                      {value.editor.editors.length > 1 && (
                        <button
                          className="remove-me absolute right-2 top-1/2 z-10 -translate-y-1/2 opacity-50 hover:opacity-100"
                          onClick={() => handleDeleteTab(i)}
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
                <button
                  className="remove-me group relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md"
                  onClick={handleNewTab}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5"
                    style={{
                      backgroundColor:
                        theme.options.theme === "dark" ? "#FFFFFF" : "#000000",
                    }}
                  />
                  <PlusIcon
                    className={cn("h-4 w-4 opacity-50 group-hover:opacity-100")}
                    style={{
                      color:
                        theme.options.theme === "dark" ? "#FFFFFF" : "#000000",
                    }}
                  />
                </button>
              </div>

              {value.widnow.type === "windows" && (
                <div className="flex items-center gap-4 pl-3 pr-6">
                  <MinusIcon className="h-4 w-4" />
                  <SquareIcon className="h-4 w-4" />
                  <XIcon className="h-5 w-5" />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="p-4">
          <CodeEditor
            value={value.editor.editors[activeTabIndex].code}
            onChange={(code) =>
              onChange?.({
                ...value,
                editor: {
                  ...value.editor,
                  editors: value.editor.editors.map((editor, i) => {
                    if (i === activeTabIndex) {
                      return {
                        ...editor,
                        code,
                      };
                    }
                    return editor;
                  }),
                },
              })
            }
            language={value.editor.language}
            fontSize={value.editor.fontSize}
            showLineNumbers={value.editor.showLineNumbers}
            theme={value.widnow.theme}
            readOnly={readOnly}
            lineWrapping={value.frame.width !== "auto"}
          />
        </div>
      </div>
    </div>
  );
}
