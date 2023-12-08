import { gradients, shadows } from "@/constants";
import { LanguageName } from "@uiw/codemirror-extensions-langs";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

export type BackgroundGradient = {
  type: "gradient";
  gradient: string;
};
export type BackgroundColor = {
  type: "color";
  color: string;
};
export type BackgroundImage = {
  type: "image";
  imageUrl: string;
};
export type Background = BackgroundColor | BackgroundGradient | BackgroundImage;
export type EditorState = {
  frame: {
    background: Background;
    width: number | "auto";
    height: number | "auto";
    hidden: boolean;
    opacity: number;
    padding: number;
  };
  widnow: {
    showTitleBar: boolean;
    showTraficLights: boolean;
    borderRadius: number;
    shadow: string;
    theme: string;
  };
  editor: {
    fontSize: number;
    language: LanguageName;
    showLineNumbers: boolean;
  };
  title: string;
  code: string;
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

export const initEditorState: EditorState = {
  frame: {
    hidden: false,
    opacity: 1,
    height: "auto",
    width: "auto",
    padding: 64,
    background: {
      type: "gradient",
      gradient: gradients[0],
    },
  },
  widnow: {
    borderRadius: 16,
    showTitleBar: true,
    showTraficLights: true,
    shadow: shadows[1].value,
    theme: "tokyoNight",
  },
  editor: {
    fontSize: 16,
    language: "jsx",
    showLineNumbers: false,
  },
  code: EXAMPLE_CODE,
  title: "Untitled-01",
};

export const editorStateAtom = atom<EditorState>(initEditorState);

export const codeAtom = focusAtom(editorStateAtom, (optic) =>
  optic.prop("code"),
);
export const titleAtom = focusAtom(editorStateAtom, (optic) =>
  optic.prop("title"),
);

export const isExportingAtom = atom(false);
