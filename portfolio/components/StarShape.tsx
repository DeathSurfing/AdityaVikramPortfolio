"use client";

import React from "react";

type Props = { size?: number; gradient?: string };

export default function StarShape({ size = 80, gradient = "from-white/10" }: Props) {
  const path = `
    M${size / 2},${size * 0.12}
    L${size * 0.63},${size * 0.36}
    L${size * 0.95},${size * 0.36}
    L${size * 0.69},${size * 0.58}
    L${size * 0.79},${size * 0.90}
    L${size / 2},${size * 0.70}
    L${size * 0.21},${size * 0.90}
    L${size * 0.31},${size * 0.58}
    L${size * 0.05},${size * 0.36}
    L${size * 0.37},${size * 0.36}
    Z
  `;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* STAR */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={`g-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
          </linearGradient>
        </defs>

        <path
          d={path}
          fill={`url(#g-${size})`}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.2"
        />

        {/* inner pulse */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.06}
          fill="rgba(255,255,255,0.7)"
          className="animate-pulse-slow"
        />
      </svg>

      {/* GPU-ACCELERATED GLOW */}
      <div
        className={`absolute inset-0 rounded-full pointer-events-none blur-2xl opacity-60 bg-gradient-to-r ${gradient}`}
        style={{ transform: "scale(1.4)" }}
      />

      {/* soft secondary glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none blur-xl opacity-30 bg-white"
        style={{ transform: "scale(1.1)" }}
      />
    </div>
  );
}
