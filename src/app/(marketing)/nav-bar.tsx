import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <header>
      <div className="container flex h-20 items-center">
        <Link href="/home" className="flex items-center gap-2">
          <Image
            src="/code-to-img.svg"
            alt="CodeToImg Logo"
            className="h-10 w-10 object-contain"
            width={512}
            height={512}
          />
          <span className="text-lg font-semibold text-foreground">
            CodeToImg
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end">
          {/* <Button asChild variant="link">
            <Link href="/pricing">Pricing</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/blog">Blog</Link>
          </Button> */}
          <Button asChild className="ml-6">
            <Link href="/">Editor</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
