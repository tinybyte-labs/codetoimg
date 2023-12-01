import { GRADIENTS } from "@/data/gradients";
import { LanguageName } from "@uiw/codemirror-extensions-langs";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

export type SolidBackground = {
  type: "color";
  color: string;
};

export type GradientBackground = {
  type: "gradient";
  color: string;
  image: string;
};
export type ImageBackground = {
  type: "image";
  url: string;
  scale: number;
};

export type Background = SolidBackground | GradientBackground | ImageBackground;

export type EditorState = {
  background: Background | null;
  backgroundBlur: boolean;
  width: number | "auto";
  height: number | "auto";
  theme: string;
  language: LanguageName;
  showLineNumbers: boolean;
  padding: number;
  borderRadius: number;
  fontSize: number;
  showTitleBar: boolean;
  showTraficLights: boolean;
  shadow: {
    opacity: number;
    x: number;
    y: number;
    blur: number;
    spread: number;
  };
};

export const initEditorState: EditorState = {
  background: GRADIENTS[0],
  backgroundBlur: false,
  width: "auto",
  height: "auto",
  theme: "tokyoNightStorm",
  language: "jsx",
  showLineNumbers: false,
  padding: 64,
  borderRadius: 16,
  fontSize: 16,
  showTitleBar: false,
  showTraficLights: true,
  shadow: {
    opacity: 0.5,
    x: 0,
    y: 24,
    blur: 32,
    spread: -8,
  },
};

export const editorAtom = atom<EditorState>(initEditorState);

export const backgroundAtom = focusAtom(editorAtom, (optic) =>
  optic.prop("background"),
);
export const themeAtom = focusAtom(editorAtom, (optic) => optic.prop("theme"));
export const languageAtom = focusAtom(editorAtom, (optic) =>
  optic.prop("language"),
);
export const showLineNumbersAtom = focusAtom(editorAtom, (optic) =>
  optic.prop("showLineNumbers"),
);
export const paddingAtom = focusAtom(editorAtom, (optic) =>
  optic.prop("padding"),
);
export const fontSizeAtom = focusAtom(editorAtom, (optic) =>
  optic.prop("fontSize"),
);
export const backgroundBlurAtom = focusAtom(editorAtom, (optic) =>
  optic.prop("backgroundBlur"),
);
export const shadowAtom = focusAtom(editorAtom, (optic) =>
  optic.prop("shadow"),
);
export const borderRadiusAtom = focusAtom(editorAtom, (optic) =>
  optic.prop("borderRadius"),
);
export const showTraficLightsAtom = focusAtom(editorAtom, (optic) =>
  optic.prop("showTraficLights"),
);
export const showTitleBarAtom = focusAtom(editorAtom, (optic) =>
  optic.prop("showTitleBar"),
);

export const isExportingAtom = atom(false);
