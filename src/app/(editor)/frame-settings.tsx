import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { colors, gradients, images } from "@/constants";
import { Background, appStateAtom } from "@/lib/atoms/app-state";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import ToolItem from "./tool-item";
import SettingsGroup from "./settings-group";
import { backgroundStyle } from "@/lib/utils/background-style";
import { Label } from "@/components/ui/label";

export default function FrameSettings() {
  const [editorState, setEditorState] = useAtom(appStateAtom);

  return (
    <SettingsGroup title="Frame">
      <ToolItem label="Width">
        <Input
          value={editorState.frame.width}
          onChange={(e) => {
            setEditorState((state) => ({
              ...state,
              frame: {
                ...state.frame,
                width: e.currentTarget.value,
              },
            }));
          }}
        />
      </ToolItem>

      <ToolItem label="Height">
        <Input
          value={editorState.frame.height}
          onChange={(e) => {
            setEditorState((state) => ({
              ...state,
              frame: {
                ...state.frame,
                height: e.currentTarget.value,
              },
            }));
          }}
        />
      </ToolItem>

      <ToolItem label="Padding">
        <Slider
          value={[editorState.frame.padding]}
          onValueChange={(values) =>
            setEditorState((state) => ({
              ...state,
              frame: {
                ...state.frame,
                padding: values[0],
              },
            }))
          }
          min={32}
          max={128}
          step={1}
        />
      </ToolItem>

      <ToolItem label="Visible">
        <Switch
          checked={!editorState.frame.hidden}
          onCheckedChange={(value) =>
            setEditorState((editorState) => ({
              ...editorState,
              frame: {
                ...editorState.frame,
                hidden: !value,
              },
            }))
          }
        />
      </ToolItem>

      {!editorState.frame.hidden && (
        <>
          <ToolItem label="Background">
            <BackgroundPicker
              value={editorState.frame.background}
              onValueChange={(background) =>
                setEditorState((state) => ({
                  ...state,
                  frame: {
                    ...state.frame,
                    background,
                  },
                }))
              }
            />
          </ToolItem>

          <ToolItem label="Opacity">
            <Slider
              value={[editorState.frame.opacity]}
              onValueChange={(values) => {
                setEditorState((editorState) => ({
                  ...editorState,
                  frame: {
                    ...editorState.frame,
                    opacity: values[0],
                  },
                }));
              }}
              min={0}
              max={1}
              step={0.05}
            />
          </ToolItem>
        </>
      )}
    </SettingsGroup>
  );
}

const BackgroundPicker = ({
  value,
  onValueChange,
}: {
  value: Background;
  onValueChange?: (value: Background) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="transparent-grid relative flex-1 overflow-hidden p-0"
          variant="outline"
        >
          <div className="absolute inset-0" style={backgroundStyle(value)} />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="w-80">
        <Tabs defaultValue="gradient">
          <TabsList className="w-full">
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="color">
              Color
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="image">
              Image
            </TabsTrigger>
          </TabsList>
          <TabsContent value="color" asChild>
            <ColorPicker value={value} onValueChange={onValueChange} />
          </TabsContent>
          <TabsContent value="gradient" asChild>
            <GradientPicker value={value} onValueChange={onValueChange} />
          </TabsContent>
          <TabsContent value="image" asChild>
            <ImagePicker value={value} onValueChange={onValueChange} />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
const ColorPicker = ({
  value,
  onValueChange,
}: {
  value: Background;
  onValueChange?: (value: Background) => void;
}) => {
  return (
    <div className="pt-4">
      <Input
        placeholder="Enter a valid hex color value"
        value={value.type === "color" ? value.color : ""}
        onChange={(e) => {
          console.log(e);
          onValueChange?.({
            type: "color",
            color: e.currentTarget.value,
          });
        }}
      />
      <div className="grid grid-cols-6 gap-2 pt-4">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() =>
              onValueChange?.({
                type: "color",
                color,
              })
            }
            className={cn("aspect-square rounded-full border", {
              "ring-2 ring-ring ring-offset-2 ring-offset-background":
                value.type === "color" && value.color === color,
            })}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

const GradientPicker = ({
  value,
  onValueChange,
}: {
  value: Background;
  onValueChange?: (value: Background) => void;
}) => {
  return (
    <div className="pt-4">
      <Input
        placeholder="Enter a valid CSS gradient value"
        value={value.type === "gradient" ? value.gradient : ""}
        onChange={(e) => {
          onValueChange?.({
            type: "gradient",
            gradient: e.currentTarget.value,
          });
        }}
      />
      <div className="grid grid-cols-6 gap-2 pt-4">
        {gradients.map((gradient) => (
          <button
            key={gradient}
            onClick={() =>
              onValueChange?.({
                type: "gradient",
                gradient,
              })
            }
            style={{ backgroundImage: gradient }}
            className={cn("aspect-square rounded-full border", {
              "ring-2 ring-ring ring-offset-2 ring-offset-background":
                value.type === "gradient" && value.gradient === gradient,
            })}
          />
        ))}
      </div>
    </div>
  );
};

const ImagePicker = ({
  value,
  onValueChange,
}: {
  value: Background;
  onValueChange?: (value: Background) => void;
}) => {
  return (
    <div className="pt-4">
      <fieldset className="space-y-1">
        <Label htmlFor="image-url">Image URL</Label>
        <Input
          placeholder="Enter a valid image URL"
          value={value.type === "image" ? value.imageUrl : ""}
          onChange={(e) => {
            onValueChange?.({
              ...value,
              type: "image",
              imageUrl: e.currentTarget.value,
            });
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
              onValueChange?.({
                type: "image",
                imageUrl: URL.createObjectURL(files[0]),
              });
            }
          }}
          className="pointer-events-none absolute opacity-0"
        />
      </div>
      <div className="grid grid-cols-3 gap-2 pt-4">
        {images.map((imageUrl, i) => (
          <button
            key={i}
            onClick={() =>
              onValueChange?.({
                type: "image",
                imageUrl,
              })
            }
            className={cn("aspect-[3/2] overflow-hidden rounded-xl border", {
              "ring-2 ring-ring ring-offset-2 ring-offset-background":
                value.type === "image" && value.imageUrl === imageUrl,
            })}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
};
