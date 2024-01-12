import { appStateAtom } from "@/lib/atoms/app-state";
import { useAtom, useAtomValue } from "jotai";
import ToolItem from "./tool-item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languageNames } from "@/data/language-names";
import { Switch } from "@/components/ui/switch";
import { activeTabIndexAtom } from "@/lib/atoms/active-tab-index";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fontSizes = [12, 14, 16, 18, 20];

export default function EditorSettings() {
  const [editorState, setEditorState] = useAtom(appStateAtom);
  const activeIndex = useAtomValue(activeTabIndexAtom);

  return (
    <div className="space-y-6 p-4">
      <fieldset className="flex items-center justify-between gap-2">
        <Label htmlFor="show-line-numbers">Line Numbers</Label>
        <Switch
          id="show-line-numbers"
          checked={editorState.editor.showLineNumbers}
          onCheckedChange={(showLineNumbers) =>
            setEditorState((state) => ({
              ...state,
              editor: { ...state.editor, showLineNumbers },
            }))
          }
        />
      </fieldset>

      <fieldset className="space-y-2">
        <Label htmlFor="font-size">Font Size</Label>
        <Select
          value={`${editorState.editor.fontSize}`}
          onValueChange={(value) =>
            setEditorState((state) => ({
              ...state,
              editor: { ...state.editor, fontSize: parseInt(value) },
            }))
          }
        >
          <SelectTrigger id="font-size">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((size) => (
              <SelectItem value={`${size}`} key={size}>
                {size}px
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>

      <fieldset className="space-y-2">
        <Label htmlFor="tab-name">Tab Name</Label>
        <Input
          id="tab-name"
          value={editorState.editor.tabs[activeIndex].tabName}
          onChange={(e) => {
            setEditorState((state) => ({
              ...state,
              editor: {
                ...state.editor,
                tabs: state.editor.tabs.map((item, i) => {
                  if (i === activeIndex) {
                    return {
                      ...item,
                      tabName: e.currentTarget.value,
                    };
                  }
                  return item;
                }),
              },
            }));
          }}
        />
      </fieldset>

      <fieldset className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <Select
          value={editorState.editor.tabs[activeIndex].language}
          onValueChange={(language) =>
            setEditorState((state) => ({
              ...state,
              editor: {
                ...state.editor,
                tabs: state.editor.tabs.map((item, i) => {
                  if (i === activeIndex) {
                    return {
                      ...item,
                      language: language,
                    };
                  }
                  return item;
                }),
              },
            }))
          }
        >
          <SelectTrigger id="language">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(languageNames)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map((item) => (
                <SelectItem key={item[0]} value={item[0]}>
                  {item[1]}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </fieldset>
    </div>
  );
}
