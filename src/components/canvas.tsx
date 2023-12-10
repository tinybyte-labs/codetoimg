"use client";

import CodeEditor from "@/components/code-editor";
import { themes } from "@/data/themes";
import { activeTabIndexAtom } from "@/lib/atoms/active-tab-index";
import { AppState, Tab } from "@/lib/atoms/app-state";
import { cn } from "@/lib/utils";
import { backgroundStyle } from "@/lib/utils/background-style";
import { getRandomId } from "@/lib/utils/getRandomId";
import { useAtom } from "jotai";
import { MinusIcon, PlusIcon, SquareIcon, XIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { LanguageName } from "@uiw/codemirror-extensions-langs";

export default function Canvas({
  value,
  onChange,
  readOnly,
}: {
  value: AppState;
  onChange?: (value: AppState) => void;
  onTitleChange?: (value: string) => void;
  readOnly?: boolean;
  showCopyIcon?: boolean;
}) {
  const [activeTabIndex, setActiveTabIndex] = useAtom(activeTabIndexAtom);
  const theme = useMemo(() => themes[value.window.theme], [value.window.theme]);

  const setTabs = useCallback(
    (tabs: Tab[]) => {
      onChange?.({
        ...value,
        editor: {
          ...value.editor,
          tabs,
        },
      });
    },
    [onChange, value],
  );

  const handleNewTab = useCallback(() => {
    setTabs([
      ...value.editor.tabs,
      {
        id: getRandomId(),
        code: `console.log("Hello, World!");`,
        tabName: "index.ts",
        language: "typescript",
      },
    ]);
    setActiveTabIndex(value.editor.tabs.length);
  }, [setActiveTabIndex, setTabs, value.editor.tabs]);

  const handleCloseTab = useCallback(
    (index: number) => {
      setTabs(value.editor.tabs.filter((_, i) => i !== index));
      console.log({ activeTabIndex, length: value.editor.tabs.length });
      if (activeTabIndex === index) {
        setActiveTabIndex(Math.max(0, index - 1));
      } else if (activeTabIndex >= value.editor.tabs.length - 1) {
        setActiveTabIndex(value.editor.tabs.length - 2);
      }
    },
    [activeTabIndex, setActiveTabIndex, setTabs, value.editor.tabs],
  );

  const handleMoveTab = useCallback(
    (index: number, targetIndex: number) => {
      const tabs = [...value.editor.tabs];
      tabs[targetIndex] = value.editor.tabs[index];
      tabs[index] = value.editor.tabs[targetIndex];
      setTabs(tabs);
      if (activeTabIndex === index) {
        setActiveTabIndex(targetIndex);
      } else if (activeTabIndex === targetIndex) {
        setActiveTabIndex(index);
      }
    },
    [activeTabIndex, setActiveTabIndex, setTabs, value.editor.tabs],
  );

  const duplicateTab = useCallback(
    (index: number) => {
      let newTab: Tab = { ...value.editor.tabs[index] };
      newTab.tabName = `${newTab.tabName} Copy`;
      setTabs([...value.editor.tabs, newTab]);
    },
    [setTabs, value.editor.tabs],
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
          borderRadius: value.window.borderRadius,
          boxShadow: value.window.shadow,
          backgroundColor: theme.options.settings.background,
        }}
      >
        {value.window.showTitleBar && (
          <div className="relative pt-3">
            <div className="flex items-center">
              {value.window.type === "macOs" && (
                <div className="flex items-center gap-2 pl-6 pr-3">
                  <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                  <div className="h-3 w-3 rounded-full bg-[#28C840]" />
                </div>
              )}

              <div className="flex h-8 flex-1 items-stretch gap-1 px-3">
                {value.window.showTabs && (
                  <>
                    {value.editor.tabs.map((editor, i) => {
                      const active = i === activeTabIndex;
                      return (
                        <div key={editor.id} className="relative">
                          <ContextMenu>
                            <ContextMenuTrigger asChild>
                              <button
                                className={cn(
                                  "group relative h-full min-w-[100px] overflow-hidden rounded-md pl-3 text-sm",
                                  value.editor.tabs.length === 1
                                    ? "pr-3"
                                    : "pr-7",
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
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                              {value.editor.tabs.length > 1 && (
                                <ContextMenuItem
                                  onClick={() => handleCloseTab(i)}
                                >
                                  Close
                                </ContextMenuItem>
                              )}
                              {i > 0 && (
                                <ContextMenuItem
                                  onClick={() => handleMoveTab(i, i - 1)}
                                >
                                  Move Left
                                </ContextMenuItem>
                              )}
                              {i < value.editor.tabs.length - 1 && (
                                <ContextMenuItem
                                  onClick={() => handleMoveTab(i, i + 1)}
                                >
                                  Move Right
                                </ContextMenuItem>
                              )}
                              <ContextMenuItem onClick={() => duplicateTab(i)}>
                                Duplicate
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>

                          {value.editor.tabs.length > 1 && (
                            <button
                              className="remove-me absolute right-2 top-1/2 z-10 -translate-y-1/2 opacity-50 hover:opacity-100"
                              onClick={() => handleCloseTab(i)}
                            >
                              <XIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                    <button
                      className="remove-me group relative flex w-8 items-center justify-center overflow-hidden rounded-md"
                      onClick={handleNewTab}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-5"
                        style={{
                          backgroundColor:
                            theme.options.theme === "dark"
                              ? "#FFFFFF"
                              : "#000000",
                        }}
                      />
                      <PlusIcon
                        className={cn(
                          "h-4 w-4 opacity-50 group-hover:opacity-100",
                        )}
                        style={{
                          color:
                            theme.options.theme === "dark"
                              ? "#FFFFFF"
                              : "#000000",
                        }}
                      />
                    </button>
                  </>
                )}
              </div>

              {value.window.type === "windows" && (
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
            value={value.editor.tabs[activeTabIndex].code}
            onChange={(code) =>
              onChange?.({
                ...value,
                editor: {
                  ...value.editor,
                  tabs: value.editor.tabs.map((editor, i) => {
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
            language={
              value.editor.tabs[activeTabIndex].language as LanguageName
            }
            fontSize={value.editor.fontSize}
            showLineNumbers={value.editor.showLineNumbers}
            theme={value.window.theme}
            readOnly={readOnly}
            lineWrapping={value.frame.width !== "auto"}
          />
        </div>
      </div>
    </div>
  );
}
