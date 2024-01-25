import {
  BUY_ME_A_COFFEE_URL,
  GITHUB_REPO,
  TINYBYTE_LABS_URL,
  TWITTER_URL,
} from "@/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-6 p-4 text-sm text-muted-foreground">
      <p className="text-center text-muted-foreground">
        Made by{" "}
        <Link
          href={TINYBYTE_LABS_URL}
          target="_blank"
          className="font-medium text-foreground underline-offset-2 hover:underline"
        >
          TinyByte Labs
        </Link>
      </p>
      <Link
        href={BUY_ME_A_COFFEE_URL}
        target="_blank"
        className="font-medium text-muted-foreground underline-offset-2 hover:text-accent-foreground hover:underline"
      >
        Buy me a Coffee
      </Link>
      <Link
        href={GITHUB_REPO}
        target="_blank"
        className="font-medium text-muted-foreground underline-offset-2 hover:text-accent-foreground hover:underline"
      >
        Github
      </Link>
      <Link
        href={TWITTER_URL}
        target="_blank"
        className="font-medium text-muted-foreground underline-offset-2 hover:text-accent-foreground hover:underline"
      >
        Twitter
      </Link>
      <Link
        href="https://v1.codetoimg.com"
        target="_blank"
        className="font-medium text-muted-foreground underline-offset-2 hover:text-accent-foreground hover:underline"
      >
        CodeToImg v1
      </Link>
    </footer>
  );
}
