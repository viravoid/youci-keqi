import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  useRouterState({ select: (s) => s.location.pathname });
  return <>{children}</>;
}
