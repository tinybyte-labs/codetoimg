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
import { Label } from "@/components/ui/label";

export default function WindowSettings() {
  const [editorState, setEditorState] = useAtom(appStateAtom);

  return (
    <div className="space-y-6 p-4">
      <fieldset className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="border-radius">Roundness</Label>
          <p className="text-sm text-muted-foreground">
            {editorState.window.borderRadius}px
          </p>
        </div>
        <Slider
          id="border-radius"
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
      </fieldset>

      <fieldset className="space-y-2">
        <Label htmlFor="shadow">Shadow</Label>
        <Select
          value={editorState.window.shadow}
          onValueChange={(shadow) =>
            setEditorState((state) => ({
              ...state,
              window: { ...state.window, shadow },
            }))
          }
        >
          <SelectTrigger id="shadow">
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
      </fieldset>

      <fieldset className="flex items-center justify-between gap-2">
        <Label htmlFor="show-title-bar">Title Bar</Label>
        <Switch
          id="show-title-bar"
          checked={editorState.window.showTitleBar}
          onCheckedChange={(showTitleBar) =>
            setEditorState((state) => ({
              ...state,
              window: { ...state.window, showTitleBar },
            }))
          }
        />
      </fieldset>
      {editorState.window.showTitleBar && (
        <>
          <fieldset className="flex items-center justify-between gap-2">
            <Label htmlFor="show-tabs">Tabs</Label>
            <Switch
              id="show-tabs"
              checked={editorState.window.showTabs}
              onCheckedChange={(showTabs) =>
                setEditorState((state) => ({
                  ...state,
                  window: { ...state.window, showTabs },
                }))
              }
            />
          </fieldset>

          <fieldset className="space-y-2">
            <Label htmlFor="os">OS</Label>
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
              <SelectTrigger id="os">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="macOs">Mac OS</SelectItem>
                <SelectItem value="windows">Windows</SelectItem>
              </SelectContent>
            </Select>
          </fieldset>
        </>
      )}

      <fieldset className="space-y-2">
        <Label htmlFor="theme">Theme</Label>
        <Select
          value={editorState.window.theme}
          onValueChange={(theme) =>
            setEditorState((state) => ({
              ...state,
              window: { ...state.window, theme },
            }))
          }
        >
          <SelectTrigger id="theme">
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
      </fieldset>
    </div>
  );
}
