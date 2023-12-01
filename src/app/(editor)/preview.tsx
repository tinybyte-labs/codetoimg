"use client";

import CodeBlock from "@/components/code-block";
import { exmapleCodes } from "@/data/example-codes";
import { codeAtom } from "@/lib/atoms/code";
import { languageAtom } from "@/lib/atoms/editor";
import { randomInt } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Preview() {
  const [isLoaded, setIsLoaded] = useState(false);
  const setLanguage = useSetAtom(languageAtom);
  const setCode = useSetAtom(codeAtom);

  useEffect(() => {
    if (isLoaded) return;
    const exmaple = exmapleCodes[randomInt(0, exmapleCodes.length)];
    setLanguage(exmaple.lang);
    setCode(exmaple.code.trim());
    setIsLoaded(true);
  }, [isLoaded, setCode, setLanguage]);

  if (!isLoaded) {
    return <Loader2 size={24} className="animate-spin" />;
  }

  return (
    <div className="transparent-grid relative h-fit w-fit">
      <CodeBlock />
    </div>
  );
}
