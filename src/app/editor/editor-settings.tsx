import { appStateAtom } from "@/lib/atoms/app-state";
import { useAtom, useAtomValue } from "jotai";
import SettingsGroup from "./settings-group";
import ToolItem from "./tool-item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languageExtensions, languageNames } from "@/data/language-names";
import { Switch } from "@/components/ui/switch";
import { activeTabIndexAtom } from "@/lib/atoms/active-tab-index";
import { Input } from "@/components/ui/input";

const fontSizes = [12, 14, 16, 18, 20];

export default function EditorSettings() {
  const [editorState, setEditorState] = useAtom(appStateAtom);
  const activeIndex = useAtomValue(activeTabIndexAtom);

  return (
    <SettingsGroup title="Editor">
      <ToolItem label="Line Numbers">
        <Switch
          checked={editorState.editor.showLineNumbers}
          onCheckedChange={(showLineNumbers) =>
            setEditorState((state) => ({
              ...state,
              editor: { ...state.editor, showLineNumbers },
            }))
          }
        />
      </ToolItem>

      <ToolItem label="Font Size">
        <Select
          value={`${editorState.editor.fontSize}`}
          onValueChange={(value) =>
            setEditorState((state) => ({
              ...state,
              editor: { ...state.editor, fontSize: parseInt(value) },
            }))
          }
        >
          <SelectTrigger>
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
      </ToolItem>

      <ToolItem label="Tab Name">
        <Input
          value={editorState.editor.tabs[activeIndex].tabName}
          onChange={(e) => {
            const tabName = e.currentTarget.value;

            const language = Object.entries(languageExtensions).find(
              (extensions) =>
                extensions[1].findIndex((ext) => tabName.endsWith(ext)) !== -1,
            );

            setEditorState((state) => ({
              ...state,
              editor: {
                ...state.editor,
                tabs: state.editor.tabs.map((item, i) => {
                  if (i === activeIndex) {
                    return {
                      ...item,
                      tabName,
                      language: language?.[0] ?? item.language,
                    };
                  }
                  return item;
                }),
              },
            }));
          }}
        />
      </ToolItem>

      <ToolItem label="Language">
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
          <SelectTrigger>
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
      </ToolItem>
    </SettingsGroup>
  );
}
