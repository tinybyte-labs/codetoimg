import SettingsGroup from "./settings-group";
import ToolItem from "./tool-item";
import { Switch } from "@/components/ui/switch";
import { useAtom } from "jotai";
import { editorStateAtom } from "@/lib/atoms/editor-state";
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
  const [editorState, setEditorState] = useAtom(editorStateAtom);

  return (
    <SettingsGroup title="Window">
      <ToolItem label="Theme">
        <Select
          value={editorState.widnow.theme}
          onValueChange={(theme) =>
            setEditorState((state) => ({
              ...state,
              widnow: { ...state.widnow, theme },
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
          id="show-trafic-lights"
          checked={editorState.widnow.showTitleBar}
          onCheckedChange={(showTitleBar) =>
            setEditorState((state) => ({
              ...state,
              widnow: { ...state.widnow, showTitleBar },
            }))
          }
        />
      </ToolItem>
      {editorState.widnow.showTitleBar && (
        <>
          <ToolItem label="Trafic Lights">
            <Switch
              id="show-trafic-lights"
              checked={editorState.widnow.showTraficLights}
              onCheckedChange={(showTraficLights) =>
                setEditorState((state) => ({
                  ...state,
                  widnow: { ...state.widnow, showTraficLights },
                }))
              }
            />
          </ToolItem>
        </>
      )}
      <ToolItem label="Roundness">
        <Slider
          value={[editorState.widnow.borderRadius]}
          onValueChange={(values) =>
            setEditorState((state) => ({
              ...state,
              widnow: {
                ...state.widnow,
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
          value={editorState.widnow.shadow}
          onValueChange={(shadow) =>
            setEditorState((state) => ({
              ...state,
              widnow: { ...state.widnow, shadow },
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
