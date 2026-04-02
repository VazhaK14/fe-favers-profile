"use client";

import { motion, type Variants } from "framer-motion";

export const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1, duration: 0.8, ease: "easeOut" },
    },
  };

  const titleText = "FAVES".split("");

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 overflow-hidden bg-transparent">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex overflow-hidden"
      >
        {titleText.map((char, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="text-7xl md:text-9xl font-black tracking-tighter text-foreground inline-block"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
      <motion.p
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 text-xl md:text-2xl text-foreground/70 font-light tracking-wide text-center"
      >
        Crafting digital excellence.
      </motion.p>
    </section>
  );
};
