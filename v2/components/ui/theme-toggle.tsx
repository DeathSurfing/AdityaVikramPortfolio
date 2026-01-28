"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/retroui/Button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-xs"
      aria-label="Toggle theme"
    >
      {isDark ? "Light mode" : "Dark mode"}
    </Button>
  );
}
