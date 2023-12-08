import { settingsAtom } from "@/lib/atoms/settings";
import { useAtom } from "jotai";
import SettingsGroup from "./settings-group";
import ToolItem from "./tool-item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageName } from "@uiw/codemirror-extensions-langs";
import { languageNames } from "@/data/language-names";
import { themes } from "@/data/themes";
import { Switch } from "@/components/ui/switch";

const fontSizes = [12, 14, 16, 18, 20];

export default function EditorSettings() {
  const [editorState, setEditorState] = useAtom(settingsAtom);
  return (
    <SettingsGroup title="Editor">
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

      <ToolItem label="Language">
        <Select
          value={editorState.editor.language}
          onValueChange={(language: LanguageName) =>
            setEditorState((state) => ({
              ...state,
              editor: { ...state.editor, language },
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

      <ToolItem label="Theme">
        <Select
          value={editorState.editor.theme}
          onValueChange={(theme) =>
            setEditorState((state) => ({
              ...state,
              editor: { ...state.editor, theme },
            }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(themes)
              .sort()
              .map((option) => (
                <SelectItem key={option[0]} value={option[0]}>
                  {option[1].name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </ToolItem>

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
    </SettingsGroup>
  );
}
