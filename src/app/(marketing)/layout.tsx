import { ReactNode } from "react";
import NavBar from "./nav-bar";
import Footer from "./footer";
import ThemeProvider from "@/components/theme-provider";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
