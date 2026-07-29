'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { FadeUp, SectionHeading } from './motion-primitives';

type Day = { date: string; count: number; level: string; color: string };
type Month = { name: string; weekIndex: number };

const FH = (i: number) => ({
  opacity: 1,
  y: 0,
  transition: { delay: i * 0.003, duration: 0.25 },
});

const fmt = (s: string) =>
  new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const GH_COLORS: Record<string, string> = {
  '0': '#161b22',
  '1': '#0e4429',
  '2': '#006d32',
  '3': '#26a641',
  '4': '#39d353',
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
            color: GH_COLORS[d.intensity] || GH_COLORS['0'],
          }));

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

  const handleMove = useCallback((e: React.MouseEvent, day: Day) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const ranges = ['0', '1–9', '10–19', '20–29', '30+'];
    const label = `${ranges[day.count] || '0'} contribution${day.count === 0 ? '' : 's'} on ${fmt(day.date)}`;
    setTooltip({
      show: true,
      content: label,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  }, []);

  useEffect(() => {
    if (scrollRef.current && weeks.length) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [weeks]);

  return (
    <section className="flex flex-col gap-5">
      <SectionHeading>// contributions</SectionHeading>
      {weeks.length === 0 ? null : (<>

      <FadeUp>
        <div ref={scrollRef} className="relative overflow-x-auto pb-1">
          {/* Month labels */}
          <div className="relative flex h-5 mb-1">
            {months.map((m, i) => {
              const nextIndex = months[i + 1]?.weekIndex ?? weeks.length;
              const w = (nextIndex - m.weekIndex) * 13;
              const l = m.weekIndex * 13;
              return (
                <div
                  key={m.name + i}
                  className="absolute font-mono text-[0.6rem] text-muted-foreground"
                  style={{ left: `${l}px`, width: `${w}px` }}
                >
                  {m.name}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <motion.div
                    key={di}
                    className="size-2.5 rounded-[2px] cursor-pointer"
                    style={{ backgroundColor: day.color }}
                    onMouseMove={(e) => handleMove(e, day)}
                    onMouseLeave={() => setTooltip((p) => ({ ...p, show: false }))}
                    initial={{ opacity: 0 }}
                    animate={FH(wi * 7 + di)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 font-mono text-[0.65rem] text-muted-foreground">
          <span>Less</span>
          {['0', '1', '2', '3', '4'].map((l) => (
            <span key={l} className="size-2.5 rounded-[2px]" style={{ backgroundColor: GH_COLORS[l] }} />
          ))}
          <span>More</span>
        </div>
      </FadeUp>

      {tooltip.show && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-sm border border-border bg-card px-2.5 py-1.5 font-mono text-xs text-muted-foreground shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
        </div>
      )}
      </>)}
    </section>
  );
}
