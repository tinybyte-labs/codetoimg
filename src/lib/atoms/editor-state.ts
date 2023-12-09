import { gradients, shadows } from "@/constants";
import { LanguageName } from "@uiw/codemirror-extensions-langs";
import { atom } from "jotai";
import { getRandomId } from "../utils/getRandomId";

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

export type Editor = {
  id: string;
  code: string;
  language: string;
  tabName: string;
  weight: number;
};

export type EditorState = {
  frame: {
    background: Background;
    width: string;
    height: string;
    hidden: boolean;
    opacity: number;
    padding: number;
  };
  widnow: {
    showTitleBar: boolean;
    borderRadius: number;
    shadow: string;
    theme: string;
    type: "none" | "macOs" | "windows";
  };
  editor: {
    fontSize: number;
    language: LanguageName;
    showLineNumbers: boolean;
    editors: Editor[];
  };
};

export const EXAMPLE_CODE = `import { useState } from "react"

const Counter = () => {
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
    shadow: shadows[1].value,
    theme: "tokyoNight",
    type: "macOs",
  },
  editor: {
    fontSize: 16,
    language: "tsx",
    showLineNumbers: false,
    editors: [
      {
        id: getRandomId(),
        code: EXAMPLE_CODE,
        tabName: "Counter.tsx",
        weight: 0,
        language: "tsx",
      },
    ],
  },
};

export const editorStateAtom = atom<EditorState>(initEditorState);

export const isExportingAtom = atom(false);
