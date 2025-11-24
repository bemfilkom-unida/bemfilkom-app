import { PropsWithChildren } from "react";
import SiteFooter from "./SiteFooter";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
