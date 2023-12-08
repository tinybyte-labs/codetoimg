"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { logEvent } from "@/lib/gtag";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Welcome() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const welcomeShowed = localStorage.getItem("welcome-showed") === "true";
    if (!welcomeShowed) {
      localStorage.setItem("welcome-showed", "true");
      setShowWelcome(true);
    }
  }, []);

  const logVisitV1 = () => {
    logEvent("visiting_to_v1");
  };

  return (
    <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to CodeToImg V2</DialogTitle>
          <DialogDescription>
            Hello there! Welcome to the latest version of CodeToImg. We&apos;ve
            completely rebuilt it from the ground up, redesigning the entire app
            and incorporating numerous useful features. If you prefer the old
            version, you can access it at{" "}
            <Link
              href="https://v1.codetoimg.com"
              target="_blank"
              className="font-medium hover:text-foreground hover:underline"
              onClick={logVisitV1}
            >
              v1.codetoimg.com
            </Link>
            . We hope you enjoy this new version and kindly ask you to star the
            new repository on GitHub, as it&apos;s open source.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button asChild variant="secondary">
            <Link
              href="https://v1.codetoimg.com"
              target="_blank"
              onClick={logVisitV1}
            >
              Visit Old CodeToImg
            </Link>
          </Button>
          <DialogClose asChild>
            <Button>Let&apos;s Go</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
