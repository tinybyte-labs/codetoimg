import React, { ReactNode } from "react";

export default function ToolItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="grid grid-cols-[120px,1fr] items-center gap-2 px-4">
      <div className="flex items-center">
        <p className="truncate text-sm text-muted-foreground">{label}</p>
      </div>
      <div className="flex min-h-[40px] items-center justify-end">
        {children}
      </div>
    </div>
  );
}
