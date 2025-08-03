'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Much faster spring animation for the cursor
  const springX = useSpring(mouseX, {
    damping: 15,    // Reduced from 25
    stiffness: 800, // Increased from 700
    mass: 0.3,      // Reduced from 0.5
  });

  const springY = useSpring(mouseY, {
    damping: 15,    // Reduced from 25
    stiffness: 800, // Increased from 700
    mass: 0.3,      // Reduced from 0.5
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Check for hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverableElement =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        getComputedStyle(target).cursor === 'pointer';

      setIsHovering(isHoverableElement);
    };

    // Hide the default cursor
    document.body.style.cursor = 'none';

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      // Restore default cursor on cleanup
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on mobile devices
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      setIsVisible(false);
      document.body.style.cursor = 'auto'; // Restore cursor on mobile
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.15, ease: 'easeOut' }, // Slightly faster
          opacity: { duration: 0.15 },
        }}
      >
        <div className="w-6 h-6 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Trailing glow effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1.2,
          opacity: isVisible ? 0.2 : 0,
        }}
        transition={{
          scale: { duration: 0.2, ease: 'easeOut' },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Outer ring for hover state */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 0.4 : 0,
        }}
        transition={{
          duration: 0.15, // Faster hover response
          ease: 'easeOut',
        }}
      >
        <div className="w-16 h-16 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>


    </>
  );
}
