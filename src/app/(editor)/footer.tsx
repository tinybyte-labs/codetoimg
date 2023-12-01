import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" flex flex-wrap items-center justify-center gap-4 p-4 text-sm text-muted-foreground">
      <p className="text-center text-muted-foreground">
        Made by{" "}
        <Link
          href="https://tinybytelabs.com"
          target="_blank"
          className="font-medium text-foreground underline-offset-2 hover:underline"
        >
          TinyByte Labs
        </Link>
      </p>
      {" • "}
      <Link
        href="https://github.com/tinybyte-labs/codetoimg"
        target="_blank"
        className="font-medium text-muted-foreground underline-offset-2 hover:text-accent-foreground hover:underline"
      >
        Source Code
      </Link>
    </footer>
  );
}
