import Canvas from "../../components/canvas";
import { getSettings } from "@/lib/utils";

export default function EmbedPage({ searchParams }: { searchParams: any }) {
  const state = getSettings(searchParams);

  return (
    <div className="w-fit">
      <Canvas value={state} readOnly showCopyIcon />
    </div>
  );
}
