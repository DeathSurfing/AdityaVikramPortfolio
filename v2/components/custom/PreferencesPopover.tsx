"use client";

import * as React from "react";
import {
  GearIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

import { useTheme } from "next-themes";

import { Popover } from "@/components/retroui/Popover";
import { Command } from "@/components/retroui/Command";
import { Button } from "@/components/retroui/Button";
import { themes } from "@/data/themes";

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
      {/* SETTINGS BUTTON - Clean Icon Only */}
      <Popover.Trigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Preferences"
          className="
            relative
            h-10 w-10
            p-0
            bg-transparent
            hover:bg-transparent
            hover:opacity-70
            active:opacity-50
            transition-opacity
            group
          "
        >
          <GearIcon className="h-6 w-6 transition-transform group-hover:rotate-90" />
        </Button>
      </Popover.Trigger>

      {/* POPOVER CONTENT - Ultra Brutalist */}
      <Popover.Content
        align="end"
        sideOffset={12}
        className="z-[200] w-80 border-[5px] border-border bg-background shadow-[8px_8px_0_hsl(var(--border))] p-0 overflow-hidden"
      >
        {/* Decorative Top Strip */}
        <div className="h-3 w-full flex">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-background" />
          <div className="flex-1 bg-foreground" />
        </div>

        {/* Header */}
        <div className="px-4 py-3 border-b-[4px] border-border bg-muted">
          <div className="flex items-center gap-3">
            <GearIcon className="h-6 w-6 text-foreground" />
            <div>
              <h3 className="font-black text-lg tracking-wider uppercase">
                Settings
              </h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Customize your experience
              </p>
            </div>
          </div>
        </div>

        {/* Theme Options */}
        <Command className="border-0">
          <Command.List className="p-2">
            <Command.Group>
              <div className="px-2 py-2 mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Theme
                </span>
              </div>
              {themes.map((t) => {
                const IconComponent = t.icon;
                return (
                  <Command.Item
                    key={t.value}
                    value={t.value}
                    onSelect={(v) => {
                      if (v === "light" || v === "dark" || v === "system") {
                        setTheme(v);
                      }
                    }}
                    className="
                      group
                      flex items-center justify-between
                      px-3 py-3 mb-2
                      border-[3px] border-border
                      bg-background
                      cursor-pointer
                      transition-all
                      hover:bg-muted
                      hover:shadow-[3px_3px_0_hsl(var(--border))]
                      hover:-translate-x-[1px]
                      hover:-translate-y-[1px]
                      data-[selected=true]:border-primary
                      data-[selected=true]:bg-primary
                      data-[selected=true]:text-primary-foreground
                      data-[selected=true]:shadow-[3px_3px_0_hsl(var(--border))]
                    "
                    data-selected={theme === t.value}
                  >
                    <span className="flex items-center gap-3">
                      <div className={`
                        w-8 h-8 
                        border-[3px] border-border 
                        ${t.color}
                        ${t.iconColor}
                        flex items-center justify-center
                        shadow-[2px_2px_0_hsl(var(--border))]
                      `}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="font-black text-sm tracking-wider">
                        {t.label}
                      </span>
                    </span>
                    
                    {theme === t.value && (
                      <div className="w-6 h-6 border-[3px] border-primary bg-primary flex items-center justify-center shadow-[2px_2px_0_hsl(var(--border))]">
                        <CheckIcon className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </Command.Item>
                );
              })}
            </Command.Group>
          </Command.List>
        </Command>

        {/* Footer Accent */}
        <div className="border-t-[3px] border-border bg-muted px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              v2.0.0
            </span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary" />
              <div className="w-2 h-2 bg-foreground" />
              <div className="w-2 h-2 bg-border" />
            </div>
          </div>
        </div>

        {/* Bottom Decorative Bar */}
        <div className="h-2 w-full flex">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-foreground" />
        </div>
      </Popover.Content>
    </Popover>
  );
}
