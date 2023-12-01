import { ReactNode } from "react";
import SideBar from "./side-bar";

export default function EditorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="polka flex h-screen w-screen flex-row overflow-hidden bg-background">
      <div className="flex h-full w-80 flex-shrink-0 border-r bg-card">
        <SideBar />
      </div>
      {children}
    </div>
  );
}
