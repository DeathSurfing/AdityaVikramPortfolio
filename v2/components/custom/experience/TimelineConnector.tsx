'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TimelineConnectorProps {
  height: number;
}

export default function TimelineConnector({ height }: TimelineConnectorProps) {
  return (
    <motion.div
      className="absolute left-8 lg:left-1/2 top-0 w-[6px] bg-border -translate-x-1/2 z-10"
      initial={{ height: 0 }}
      animate={{ height }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  );
}
