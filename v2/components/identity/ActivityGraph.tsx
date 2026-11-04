'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

import { Section } from './Section';

type Day = { date: string; count: number; level: string };
type Month = { name: string; weekIndex: number };

const fmt = (s: string) =>
  new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const LEVEL_COLORS: Record<string, string> = {
  '0': 'var(--surface)',
  '1': 'color-mix(in srgb, var(--signal) 14%, var(--background))',
  '2': 'color-mix(in srgb, var(--signal) 34%, var(--background))',
  '3': 'color-mix(in srgb, var(--signal) 62%, var(--background))',
  '4': 'var(--signal)',
};

interface ApiDay {
  date: string;
  count: number;
  color: string;
  intensity: string;
}

interface ApiResponse {
  contributions: ApiDay[];
}

export default function ActivityGraph() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [weeks, setWeeks] = useState<Day[][]>([]);
  const [months, setMonths] = useState<Month[]>([]);
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });

  useEffect(() => {
    fetch(`/api/contributions`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json: ApiResponse) => {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 1);
        const days: Day[] = json.contributions
          .slice()
          .reverse()
          .filter((d) => new Date(d.date) >= cutoff)
          .map((d) => ({
            date: d.date,
            count: Number(d.intensity),
            level: d.intensity,
          }));

        if (days.length === 0) {
          setWeeks([]);
          return;
        }

        const w: Day[][] = [];
        for (let i = 0; i < days.length; i += 7) {
          w.push(days.slice(i, i + 7));
        }
        setWeeks(w);

        const startDate = new Date(days[0].date);
        const m: Month[] = [];
        let lastMonth = -1;
        days.forEach((d) => {
          const date = new Date(d.date);
          const month = date.getMonth();
          if (month !== lastMonth) {
            lastMonth = month;
            const weekIndex = Math.round(
              (date.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
            );
            m.push({
              name: date.toLocaleString('default', { month: 'short' }),
              weekIndex,
            });
          }
        });
        setMonths(m);
      })
      .catch(() => setWeeks([]));
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>, day: Day) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const content =
      day.count === 0
        ? `No contributions on ${fmt(day.date)}`
        : `Contribution level ${day.level} on ${fmt(day.date)}`;
    const x = Math.min(Math.max(rect.left + rect.width / 2, 16), window.innerWidth - 16);
    setTooltip({
      show: true,
      content,
      x,
      y: rect.top - 8,
    });
  }, []);

  useEffect(() => {
    if (scrollRef.current && weeks.length) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [weeks]);

  const activeDays = weeks.flat().filter((day) => day.count > 0).length;

  return (
    <Section label="// contributions">
      {weeks.length === 0 ? null : (
        <div className="flex flex-col gap-4">
          <div
            ref={scrollRef}
            className="relative overflow-x-auto pb-1"
            role="img"
            aria-label={`GitHub contribution graph for the last year. ${activeDays} active days.`}
            tabIndex={0}
            onMouseLeave={() => setTooltip((p) => ({ ...p, show: false }))}
          >
            <div className="relative mb-1 flex h-5">
              {months.map((m, i) => {
                const nextIndex = months[i + 1]?.weekIndex ?? weeks.length;
                const w = (nextIndex - m.weekIndex) * 13;
                const l = m.weekIndex * 13;
                return (
                  <div
                    key={m.name + i}
                    className="absolute font-mono text-micro text-muted-foreground"
                    style={{ left: `${l}px`, width: `${w}px` }}
                    aria-hidden
                  >
                    {m.name}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-cell" aria-hidden>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-cell">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="size-2.5 cursor-default rounded-cell"
                      style={{ backgroundColor: LEVEL_COLORS[day.level] ?? LEVEL_COLORS['0'] }}
                      onMouseMove={(e) => handleMove(e, day)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-label text-muted-foreground">
            <span>{activeDays} active days in the last year</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              {['0', '1', '2', '3', '4'].map((level) => (
                <span
                  key={level}
                  className="size-2.5 rounded-cell"
                  style={{ backgroundColor: LEVEL_COLORS[level] }}
                  aria-hidden
                />
              ))}
              <span>More</span>
            </div>
          </div>

          {tooltip.show && (
            <div
              className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full border border-line-strong bg-card px-2.5 py-1.5 font-mono text-xs text-foreground"
              style={{ left: tooltip.x, top: tooltip.y }}
              role="status"
            >
              {tooltip.content}
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
