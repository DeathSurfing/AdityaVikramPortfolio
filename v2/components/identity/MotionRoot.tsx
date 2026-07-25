'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/** Page-level motion config — respects the user's reduced-motion preference. */
export default function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
