import SettingsGroup from "./settings-group";
import ToolItem from "./tool-item";
import { Switch } from "@/components/ui/switch";
import { useAtom } from "jotai";
import { appStateAtom } from "@/lib/atoms/app-state";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { shadows } from "@/constants";
import { themes } from "@/data/themes";

export default function WindowSettings() {
  const [editorState, setEditorState] = useAtom(appStateAtom);

  return (
    <SettingsGroup title="Window">
      <ToolItem label="Theme">
        <Select
          value={editorState.window.theme}
          onValueChange={(theme) =>
            setEditorState((state) => ({
              ...state,
              window: { ...state.window, theme },
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

      <ToolItem label="Title Bar">
        <Switch
          checked={editorState.window.showTitleBar}
          onCheckedChange={(showTitleBar) =>
            setEditorState((state) => ({
              ...state,
              window: { ...state.window, showTitleBar },
            }))
          }
        />
      </ToolItem>
      {editorState.window.showTitleBar && (
        <>
          <ToolItem label="Tabs">
            <Switch
              checked={editorState.window.showTabs}
              onCheckedChange={(showTabs) =>
                setEditorState((state) => ({
                  ...state,
                  window: { ...state.window, showTabs },
                }))
              }
            />
          </ToolItem>

          <ToolItem label="OS">
            <Select
              value={editorState.window.type}
              onValueChange={(value) =>
                setEditorState((state) => ({
                  ...state,
                  window: {
                    ...state.window,
                    type: value as any,
                  },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="macOs">Mac OS</SelectItem>
                <SelectItem value="windows">Windows</SelectItem>
              </SelectContent>
            </Select>
          </ToolItem>
        </>
      )}
      <ToolItem label="Roundness">
        <Slider
          value={[editorState.window.borderRadius]}
          onValueChange={(values) =>
            setEditorState((state) => ({
              ...state,
              window: {
                ...state.window,
                borderRadius: values[0],
              },
            }))
          }
          min={0}
          max={48}
          step={1}
        />
      </ToolItem>
      <ToolItem label="Shadow">
        <Select
          value={editorState.window.shadow}
          onValueChange={(shadow) =>
            setEditorState((state) => ({
              ...state,
              window: { ...state.window, shadow },
            }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {shadows.map((shadow) => (
              <SelectItem value={shadow.value} key={shadow.value}>
                {shadow.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ToolItem>
    </SettingsGroup>
  );
}
