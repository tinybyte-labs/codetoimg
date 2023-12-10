import { Switch } from "@/components/ui/switch";
import SettingsGroup from "./settings-group";
import ToolItem from "./tool-item";
import { useAtom } from "jotai";
import { appStateAtom } from "@/lib/atoms/app-state";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function BrandingSettings() {
  const [appState, setAppState] = useAtom(appStateAtom);

  return (
    <SettingsGroup title="Branding">
      <ToolItem label="Visible">
        <Switch
          checked={appState.branding.visible}
          onCheckedChange={(visible) =>
            setAppState((state) => ({
              ...state,
              branding: { ...state.branding, visible },
            }))
          }
        />
      </ToolItem>
      <ToolItem label="Avatar">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              style={{
                backgroundImage: `url(${appState.branding.avatarUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </PopoverTrigger>
          <PopoverContent side="right" align="start">
            <fieldset className="space-y-1">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                placeholder="Enter a valid image URL"
                value={appState.branding.avatarUrl}
                onChange={(e) => {
                  setAppState((state) => ({
                    ...state,
                    branding: {
                      ...state.branding,
                      avatarUrl: e.currentTarget.value,
                    },
                  }));
                }}
                className="flex-1"
              />
            </fieldset>
            <p className="my-2 text-center text-sm text-muted-foreground">OR</p>
            <div className="relative">
              <Button asChild className="w-full" variant="outline">
                <label htmlFor="image-picker" className=" cursor-pointer">
                  Upload Image
                </label>
              </Button>
              <input
                id="image-picker"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const files = e.currentTarget.files;
                  if (files && files.length > 0) {
                    setAppState((state) => ({
                      ...state,
                      branding: {
                        ...state.branding,
                        avatarUrl: URL.createObjectURL(files[0]),
                      },
                    }));
                  }
                }}
                className="pointer-events-none absolute opacity-0"
              />
            </div>
          </PopoverContent>
        </Popover>
      </ToolItem>

      <ToolItem label="Name">
        <Input
          value={appState.branding.name}
          onChange={(e) => {
            setAppState((state) => ({
              ...state,
              branding: { ...state.branding, name: e.currentTarget.value },
            }));
          }}
        />
      </ToolItem>

      <ToolItem label="Twitter Handle">
        <Input
          value={appState.branding.twitterHandle}
          onChange={(e) => {
            setAppState((state) => ({
              ...state,
              branding: {
                ...state.branding,
                twitterHandle: e.currentTarget.value,
              },
            }));
          }}
        />
      </ToolItem>
    </SettingsGroup>
  );
}
