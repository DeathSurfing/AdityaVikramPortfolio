'use client';

import { motion } from 'framer-motion';

export default function WhoAmIAbout() {
  return (
    <section className="min-h-screen flex items-center px-6 lg:px-20 py-20 relative bg-background">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12">
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as any }}
        >
          <div className="border-4 border-border bg-background p-8 shadow-[8px_8px_0px_0px_var(--border)]">
            <div className="inline-block px-4 py-2 bg-primary border-4 border-border mb-6 font-black text-2xl text-background">
              THE STORY
            </div>

            <div className="space-y-6">
              <p className="font-bold border-l-4 border-border pl-6">
                I'm a passionate developer who believes in building experiences
                that matter. My journey started with curiosity and evolved into
                dedication.
              </p>

              <div className="h-1 bg-border w-full" />

              <p className="font-bold border-l-4 border-primary pl-6">
                Every line of code I write is an opportunity to solve problems,
                create beauty, and push the web forward.
              </p>
            </div>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as any }}
        >
          <div className="relative">
            <div className="border-8 border-border bg-primary p-3 shadow-[16px_16px_0px_0px_var(--border)] rotate-2">
              <div className="w-72 h-72 md:w-96 md:h-96 border-4 border-background overflow-hidden">
                <img
                  src="/AdityaVikram.webp"
                  alt="Aditya Vikram"
                  width={384}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-4 border-border bg-background -rotate-12" />
            <div className="absolute -top-4 -right-4 w-16 h-16 border-4 border-border bg-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
