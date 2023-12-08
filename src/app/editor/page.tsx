import Preview from "./preview";
import { getSettings } from "@/lib/utils";

export default function EditorPage({ searchParams }: { searchParams: any }) {
  const state = getSettings(searchParams);
  return (
    <div className="relative flex flex-1 flex-col overflow-auto">
      <Preview initState={state} />
    </div>
  );
}
