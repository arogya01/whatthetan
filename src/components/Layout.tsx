
import { useIsMobile } from "@/hooks/use-mobile";
import * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className="p-4">{children}</div>;
  }

  return <div className="h-screen p-4">{children}</div>;
}
