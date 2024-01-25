import ThemeToggleButton from "@/components/theme-toggle-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GITHUB_REPO, TWITTER_URL } from "@/constants";
import { Coffee, Github, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container flex items-center gap-8 py-8 max-lg:flex-col max-lg:gap-6">
        <p className="text-muted-foreground max-lg:text-center">
          ©{new Date().getFullYear()} TinyByte Labs LTD
        </p>
        <nav className="flex flex-1 flex-wrap items-center gap-4">
          {/* <Link
            className="font-medium text-muted-foreground underline-offset-4 hover:text-accent-foreground hover:underline max-lg:text-center"
            href="/about"
          >
            About Us
          </Link>
          <Link
            className="font-medium text-muted-foreground underline-offset-4 hover:text-accent-foreground hover:underline max-lg:text-center"
            href="/legal/privacy"
          >
            Privacy Policy
          </Link>
          <Link
            className="font-medium text-muted-foreground underline-offset-4 hover:text-accent-foreground hover:underline max-lg:text-center"
            href="/legal/terms"
          >
            Terms of Service
          </Link> */}
        </nav>
        <div className="flex items-center gap-6">
          <ThemeToggleButton />
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={TWITTER_URL} target="_blank">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-accent-foreground" />
                <p className="sr-only">Twitter</p>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Twitter</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={GITHUB_REPO} target="_blank">
                <Github className="h-6 w-6 text-muted-foreground hover:text-accent-foreground" />
                <p className="sr-only">Github</p>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Github</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
}
