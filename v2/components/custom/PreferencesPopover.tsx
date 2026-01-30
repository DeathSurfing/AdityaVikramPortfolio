"use client";

import * as React from "react";
import {
  SunIcon,
  MoonIcon,
  LaptopIcon,
  GearIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

import { useTheme } from "next-themes";

import { Popover } from "@/components/retroui/Popover";
import { Command } from "@/components/retroui/Command";
import { Button } from "@/components/retroui/Button";

/* =======================
   Types & Data
======================= */

type ThemeOption = "light" | "dark" | "system";

const THEMES: {
  value: ThemeOption;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "light", label: "Light", icon: <SunIcon /> },
  { value: "dark", label: "Dark", icon: <MoonIcon /> },
  { value: "system", label: "System", icon: <LaptopIcon /> },
];

/* =======================
   Component
======================= */

export function PreferencesPopover() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Popover>
      {/* SETTINGS BUTTON */}
      <Popover.Trigger asChild>
        <Button
          size="icon"
          variant="outline"
          aria-label="Preferences"
          className="
            border-3 border-border
            shadow-[3px_3px_0_hsl(var(--border))]
            hover:-translate-x-px
            hover:-translate-y-px
            hover:shadow-[5px_5px_0_hsl(var(--border))]
            transition-all
          "
        >
          <GearIcon className="h-5 w-5" />
        </Button>
      </Popover.Trigger>

      {/* IMPORTANT: high z-index so mobile menu never blocks it */}
      <Popover.Content
        align="end"
        sideOffset={8}
        className="z-200 w-80 p-0 border-4 border-border bg-background shadow-[6px_6px_0_hsl(var(--border))]"
      >
        {/* COMMAND LIST */}
        <Command className="border-0">
          <Command.List>
            <Command.Group>
              {THEMES.map((t) => (
                <Command.Item
                  key={t.value}
                  value={t.value}
                  onSelect={(v) => {
                    if (v === "light" || v === "dark" || v === "system") {
                      setTheme(v);
                    }
                  }}
                  className="
                    flex items-center justify-between
                    px-3 py-2
                    font-black
                  "
                >
                  <span className="flex items-center gap-3">
                    {t.icon}
                    {t.label}
                  </span>
                  {theme === t.value && <CheckIcon />}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover>
  );
}
