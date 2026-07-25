'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '@/data/site';
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

const YEAR_COLORS: Record<string, string> = {
  NONE: '#161b22',
  FIRST_QUARTILE: '#0e4429',
  SECOND_QUARTILE: '#006d32',
  THIRD_QUARTILE: '#26a641',
  FOURTH_QUARTILE: '#39d353',
};

export default function ActivityGraph() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [years, setYears] = useState<number[]>([currentYear]);
  const [weeks, setWeeks] = useState<Day[][]>([]);
  const [months, setMonths] = useState<Month[]>([]);
  const [total, setTotal] = useState(0);
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });

  const fetchYear = useCallback(async (year: number) => {
    try {
      const res = await fetch(`/api/contributions?username=${siteConfig.github.username}&year=${year}`);
      if (!res.ok) throw new Error('Failed');
      const json = await res.json();
      return json as { contributions: Day[][]; totalContributions: number };
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    // Fetch current year first, then discover available years
    fetchYear(currentYear).then((data) => {
      if (!data) return;
      setWeeks(data.contributions);
      setTotal(data.totalContributions);

      const seen = new Set<string>();
      const m: Month[] = [];
      const flat = data.contributions.flat();
      flat.forEach((d, i) => {
        const name = new Date(d.date).toLocaleString('default', { month: 'short' });
        if (!seen.has(name)) {
          seen.add(name);
          m.push({ name, weekIndex: Math.floor(i / 7) });
        }
      });
      setMonths(m);
      setYears([currentYear]);

      // Try previous year(s) to build the year selector
      const tryYears = async () => {
        const found = [currentYear];
        for (let y = currentYear - 1; y >= 2020; y--) {
          const d = await fetchYear(y);
          if (d && d.totalContributions > 0) found.unshift(y);
          else break;
        }
        setYears(found);
      };
      tryYears();
    });
  }, [currentYear, fetchYear]);

  useEffect(() => {
    if (selectedYear === currentYear) return; // already loaded on mount
    fetchYear(selectedYear).then((data) => {
      if (!data) return;
      setWeeks(data.contributions);
      setTotal(data.totalContributions);

      const seen = new Set<string>();
      const m: Month[] = [];
      const flat = data.contributions.flat();
      flat.forEach((d, i) => {
        const name = new Date(d.date).toLocaleString('default', { month: 'short' });
        if (!seen.has(name)) {
          seen.add(name);
          m.push({ name, weekIndex: Math.floor(i / 7) });
        }
      });
      setMonths(m);
    });
  }, [selectedYear, currentYear, fetchYear]);

  const handleMove = useCallback((e: React.MouseEvent, day: Day) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      show: true,
      content: `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${fmt(day.date)}`,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  }, []);

  if (weeks.length === 0) return null;

  return (
    <section className="flex flex-col gap-5">
      <SectionHeading>// contributions</SectionHeading>

      <FadeUp>
        {/* Year selector + total */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {years.map((y) => (
              <motion.button
                key={y}
                type="button"
                onClick={() => setSelectedYear(y)}
                whileTap={{ scale: 0.94 }}
                className={`font-mono text-xs px-2.5 py-1 rounded-sm border transition-colors ${
                  selectedYear === y
                    ? 'border-[#e5e5e5] bg-[#e5e5e5] text-[#0a0a0a]'
                    : 'border-[#262626] text-[#8a8a8a] hover:text-[#e5e5e5] hover:border-[#666]'
                }`}
              >
                {y}
              </motion.button>
            ))}
          </div>
          <span className="font-mono text-xs text-[#666]">
            {total} total
          </span>
        </div>

        {/* Month labels */}
        <div className="relative flex h-5 mb-1">
          {months.map((m, i) => {
            const nextIndex = months[i + 1]?.weekIndex ?? weeks.length;
            const w = (nextIndex - m.weekIndex) * 12;
            const l = m.weekIndex * 12;
            return (
              <div
                key={m.name + i}
                className="absolute font-mono text-[0.6rem] text-[#666]"
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
                  style={{ backgroundColor: YEAR_COLORS[day.level] || YEAR_COLORS.NONE }}
                  onMouseMove={(e) => handleMove(e, day)}
                  onMouseLeave={() => setTooltip((p) => ({ ...p, show: false }))}
                  initial={{ opacity: 0 }}
                  animate={FH(wi * 7 + di)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-2 font-mono text-[0.65rem] text-[#8a8a8a]">
          <span>Less</span>
          {['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'].map((l) => (
            <span key={l} className="size-2.5 rounded-[2px]" style={{ backgroundColor: YEAR_COLORS[l] }} />
          ))}
          <span>More</span>
        </div>
      </FadeUp>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-sm border border-[#262626] bg-[#141414] px-2.5 py-1.5 font-mono text-xs text-[#b0b0b0] shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
        </div>
      )}
    </section>
  );
}
