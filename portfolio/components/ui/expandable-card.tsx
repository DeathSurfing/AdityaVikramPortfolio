"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function ExpandableCardDemo({
  cards,
}: {
  cards: {
    id: number;
    name: string;
    designation: string;
    image: string;
    link?: string;
    technologies?: string[];
  }[];
}) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{
                borderRadius: 12,
              }}
              className="p-4 flex flex-col md:flex-row justify-between items-start h-full md:h-fit w-full max-w-[500px] bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <div className="flex justify-between items-center w-full">
                <div className="">
                  <motion.h3
                    layoutId={`title-${active.name}-${id}`}
                    className="font-bold text-neutral-700 dark:text-neutral-200 text-base"
                  >
                    {active.name}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.designation}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-base"
                  >
                    {active.designation}
                  </motion.p>
                </div>

                <motion.a
                  layoutId={`button-${active.name}-${id}`}
                  href={active.link}
                  target="_blank"
                  className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white mt-4 md:mt-0"
                >
                  {active.link?.includes('github') ? 'View Code' : 'Visit Site'}
                </motion.a>
              </div>

              <div className="pt-4 relative px-4">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                >
                  <Image
                    width={200}
                    height={200}
                    src={active.image}
                    alt={active.name}
                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  />
                  {active.technologies && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {active.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.button>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.name}-${id}`}
            key={`card-${card.name}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.name}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.image}
                  alt={card.name}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.name}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.name}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.designation}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.designation}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.name}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.link?.includes('github') ? 'View Code' : 'Visit Site'}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}
