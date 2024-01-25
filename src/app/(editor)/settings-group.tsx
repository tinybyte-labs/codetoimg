import { ReactNode } from "react";

export default function SettingsGroup({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="space-y-2">
      <div className="px-4">
        <p className="font-semibold">{title}</p>
      </div>
      {children}
    </div>
  );
}
