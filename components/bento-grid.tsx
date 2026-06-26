"use client";

import { motion } from "motion/react";
import { containerVariants } from "./bento-card";

export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(11rem,auto)]"
    >
      {children}
    </motion.div>
  );
}
