"use client";

import Canvas from "@/components/canvas";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EditorState, editorStateAtom } from "@/lib/atoms/editor-state";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export default function Preview({ initState }: { initState: EditorState }) {
  const [settings, setSettings] = useAtom(editorStateAtom);
  const [containerHeight, setContainerHeight] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const calculateHeight = () => {
      if (!scrollRef.current) return;
      setContainerHeight(scrollRef.current?.clientHeight ?? 0);
    };

    calculateHeight();

    window.addEventListener("resize", calculateHeight);
    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  return (
    <ScrollArea ref={scrollRef} className="flex flex-1">
      <div
        className="flex items-center justify-center p-16 md:py-32"
        style={{ minHeight: containerHeight }}
      >
        <div className="transparent-grid relative h-fit w-fit">
          <Canvas onChange={setSettings} value={settings} />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
