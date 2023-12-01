import { useEffect, useMemo, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Computer, Moon, Sun } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const themes = [
  { value: "system", label: "System", icon: <Computer size={24} /> },
  { value: "light", label: "Light", icon: <Sun size={24} /> },
  { value: "dark", label: "Dark", icon: <Moon size={24} /> },
];

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const selectedTheme = useMemo(
    () => themes.find((t) => t.value === theme),
    [theme],
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <Skeleton className="h-10 w-10" />;
  }

  return (
    <Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline">
              {selectedTheme?.icon}
              <p className="sr-only">Change Theme</p>
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            {themes.map((item) => (
              <DropdownMenuRadioItem key={item.value} value={item.value}>
                {item.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent>Change Theme</TooltipContent>
    </Tooltip>
  );
}
