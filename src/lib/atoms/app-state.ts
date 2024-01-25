import { BASE_URL, gradients, shadows } from "@/constants";
import { atom } from "jotai";
import { getRandomId } from "../utils/getRandomId";
import { z } from "zod";

export const backgroundSchema = z.union([
  z.object({
    type: z.literal("color"),
    color: z.string(),
  }),
  z.object({
    type: z.literal("gradient"),
    gradient: z.string(),
  }),
  z.object({
    type: z.literal("image"),
    imageUrl: z.string(),
  }),
]);

export type Background = z.infer<typeof backgroundSchema>;

export const tabSchema = z.object({
  id: z.string(),
  code: z.string(),
  tabName: z.string(),
  language: z.string(),
});

export type Tab = z.infer<typeof tabSchema>;

export const frameSchema = z.object({
  background: backgroundSchema,
  width: z.string().default("auto"),
  height: z.string().default("auto"),
  hidden: z.boolean().default(true),
  opacity: z.number().min(0).max(1).default(1),
  padding: z.number().min(0).default(32),
});

export type Frame = z.infer<typeof frameSchema>;

export const windowSchema = z.object({
  showTitleBar: z.boolean().default(true),
  showTabs: z.boolean().default(true),
  borderRadius: z.number().default(16),
  shadow: z.string(),
  theme: z.string().default("vsCode"),
  type: z.enum(["none", "macOs", "windows"]).default("macOs"),
});

export type Window = z.infer<typeof windowSchema>;

export const brandingSchema = z.object({
  visible: z.boolean().default(false),
  avatarUrl: z.string().default(""),
  name: z.string().default("CodeToImg"),
  twitterHandle: z.string().default("codetoimg"),
});

export const editorSchema = z.object({
  fontSize: z.number().min(12).max(32).default(16),
  showLineNumbers: z.boolean().default(false),
  tabs: z.array(tabSchema),
});

export const appStateSchema = z.object({
  frame: frameSchema,
  window: windowSchema,
  editor: editorSchema,
  branding: brandingSchema,
});

export type AppState = z.infer<typeof appStateSchema>;

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

export const initEditorState: AppState = {
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
  window: {
    borderRadius: 16,
    showTitleBar: true,
    showTabs: true,
    shadow: shadows[1].id,
    theme: "vsCode",
    type: "macOs",
  },
  editor: {
    fontSize: 16,
    showLineNumbers: false,
    tabs: [
      {
        id: getRandomId(),
        code: EXAMPLE_CODE,
        tabName: "Counter.tsx",
        language: "tsx",
      },
    ],
  },
  branding: {
    visible: false,
    avatarUrl: `${BASE_URL}/images/codetoimg-avatar.png`,
    name: "CodeToImg",
    twitterHandle: "codetoimg",
  },
};

export const appStateAtom = atom<AppState>(initEditorState);

export const isExportingAtom = atom(false);
