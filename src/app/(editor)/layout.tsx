import { ReactNode } from "react";
import SideBar from "./side-bar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function EditorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="polka flex h-screen w-screen flex-col overflow-hidden bg-background md:flex-row">
      <div className="flex h-full w-80 flex-shrink-0 border-r bg-card max-md:hidden">
        <SideBar />
      </div>
      <div className="flex p-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex w-80 p-0">
            <SideBar />
          </SheetContent>
        </Sheet>
      </div>

      {children}
    </div>
  );
}
