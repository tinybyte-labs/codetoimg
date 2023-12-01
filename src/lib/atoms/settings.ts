import { GRADIENTS } from "@/data/gradients";
import { LanguageName } from "@uiw/codemirror-extensions-langs";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

export type Settings = {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundBlur: boolean;
  width: number | "auto";
  height: number | "auto";
  theme: string;
  language: LanguageName;
  showLineNumbers: boolean;
  padding: number;
  borderRadius: number;
  fontSize: number;
  title: string;
  code: string;
  showTitleBar: boolean;
  showTraficLights: boolean;
  shadowOpacity: number;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
};

export const EXAMPLE_CODE = `import { useState } from "react"

const Component = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count+1)}>
        Click Me
      </button>
    </div>
  )
}`;

export const initSettings: Settings = {
  backgroundImage: GRADIENTS[0],
  width: "auto",
  height: "auto",
  theme: "tokyoNightStorm",
  language: "jsx",
  padding: 64,
  borderRadius: 16,
  fontSize: 16,
  showTitleBar: true,
  backgroundBlur: false,
  showLineNumbers: false,
  showTraficLights: true,
  code: EXAMPLE_CODE,
  title: "Untitled-01",
  shadowOpacity: 0.5,
  shadowBlur: 32,
  shadowSpread: -8,
  shadowX: 0,
  shadowY: 24,
};

export const settingsAtom = atom<Settings>(initSettings);

export const themeAtom = focusAtom(settingsAtom, (optic) =>
  optic.prop("theme"),
);
export const languageAtom = focusAtom(settingsAtom, (optic) =>
  optic.prop("language"),
);
export const showLineNumbersAtom = focusAtom(settingsAtom, (optic) =>
  optic.prop("showLineNumbers"),
);
export const paddingAtom = focusAtom(settingsAtom, (optic) =>
  optic.prop("padding"),
);
export const fontSizeAtom = focusAtom(settingsAtom, (optic) =>
  optic.prop("fontSize"),
);
export const backgroundBlurAtom = focusAtom(settingsAtom, (optic) =>
  optic.prop("backgroundBlur"),
);
export const borderRadiusAtom = focusAtom(settingsAtom, (optic) =>
  optic.prop("borderRadius"),
);
export const showTraficLightsAtom = focusAtom(settingsAtom, (optic) =>
  optic.prop("showTraficLights"),
);
export const showTitleBarAtom = focusAtom(settingsAtom, (optic) =>
  optic.prop("showTitleBar"),
);
export const codeAtom = focusAtom(settingsAtom, (optic) => optic.prop("code"));
export const titleAtom = focusAtom(settingsAtom, (optic) =>
  optic.prop("title"),
);

export const isExportingAtom = atom(false);
