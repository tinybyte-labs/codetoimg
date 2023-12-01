import Preview from "./preview";
import Footer from "./footer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function EditorPage() {
  return (
    <div className="relative flex flex-1 flex-col overflow-auto">
      <ScrollArea className="flex flex-1">
        <div className="flex justify-center p-16 md:py-32">
          <Preview />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Footer />
    </div>
  );
}
