"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Download, Menu } from "lucide-react";
import React, { useState } from "react";
import SideBar from "./side-bar";
import Link from "next/link";
import Image from "next/image";
import ThemeToggleButton from "@/components/theme-toggle-button";
import ExportDialog from "@/components/export-dialog";

export default function NavBar() {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  return (
    <div className="flex h-16 flex-shrink-0 items-center border-b bg-card px-6">
      <div className="flex flex-1 items-center gap-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex w-fit p-0 sm:max-w-none">
            <SideBar />
          </SheetContent>
        </Sheet>
        <ThemeToggleButton />
      </div>

      <Link href="/">
        <Image
          src="/code-to-img.svg"
          alt="CodeToImg Logo"
          className="h-10 w-10 object-contain"
          width={512}
          height={512}
        />
      </Link>

      <div className="flex flex-1 items-center justify-end gap-4">
        <ThemeToggleButton className="max-md:hidden" />
        <Button onClick={() => setExportDialogOpen(true)}>
          Export
          <Download size={20} className="-mr-1 ml-2" />
        </Button>
      </div>

      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
      />
    </div>
  );
}
