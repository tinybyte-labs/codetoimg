"use client";

import Canvas from "@/components/canvas";
import { Settings, settingsAtom } from "@/lib/atoms/settings";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Preview({ initState }: { initState: Settings }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [settings, setSettings] = useAtom(settingsAtom);

  useEffect(() => {
    if (isLoaded) return;
    setSettings(initState);
    setIsLoaded(true);
  }, [initState, isLoaded, setSettings]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="transparent-grid relative h-fit w-fit">
      <Canvas onChange={setSettings} value={settings} />
    </div>
  );
}
