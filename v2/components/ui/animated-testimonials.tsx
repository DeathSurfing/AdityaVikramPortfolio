"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  // Generate consistent rotation values that won't change between renders
  const rotationValues = useMemo(() => {
    // Use index-based deterministic "random" values instead of Math.random()
    return testimonials.map((_, index) => {
      // Create pseudo-random but deterministic rotation based on index
      const seed = index * 123.456; // Any consistent multiplier
      const rotation = ((seed % 21) - 10); // Range: -10 to 10
      return Math.floor(rotation);
    });
  }, [testimonials]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset active index if testimonials array changes or becomes smaller
  useEffect(() => {
    if (active >= testimonials.length) {
      setActive(0);
    }
  }, [testimonials.length, active]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  // Drag and touch handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragDistance(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const distance = clientX - startX;
    setDragDistance(distance);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50; // Minimum drag distance to trigger change
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setDragDistance(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Wheel event
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const threshold = 50;
    if (Math.abs(e.deltaY) > threshold || Math.abs(e.deltaX) > threshold) {
      if (e.deltaY > 0 || e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  // Add global mouse event listeners for drag
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleDragMove(e.clientX);
      };
      const handleGlobalMouseUp = () => {
        handleDragEnd();
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, startX, dragDistance]);

  // Handle empty testimonials array (loading state)
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
          <div>
            <div className="relative h-80 w-full">
              <div className="absolute inset-0 origin-bottom bg-gray-200 dark:bg-neutral-800 rounded-3xl animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col justify-between py-4">
            <div>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Loading...
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                Please wait
              </p>
              <p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
                Loading testimonials...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render animations until client hydration is complete
  if (!isClient) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
          <div>
            <div className="relative h-80 w-full">
              <div className="absolute inset-0 origin-bottom">
                <img
                  src={testimonials[0]?.src}
                  alt={testimonials[0]?.name}
                  width={500}
                  height={500}
                  draggable={false}
                  className="h-full w-full rounded-3xl object-cover object-center"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between py-4">
            <div>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                {testimonials[0]?.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {testimonials[0]?.designation}
              </p>
              <p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
                {testimonials[0]?.quote}
              </p>
            </div>
            <div className="flex gap-4 pt-12 md:pt-0">
              <button className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
              </button>
              <button className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div 
        ref={containerRef}
        className="relative grid grid-cols-1 gap-20 md:grid-cols-2 select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotationValues[index], // Use consistent rotation
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotationValues[index], // Use consistent rotation
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotationValues[index], // Use consistent rotation
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
