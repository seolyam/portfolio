"use client";

import { motion } from "motion/react";
import { cardVariants } from "./bento-card";

export function SectionHeader({ title }: { title: string }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      className="flex items-center pt-4 pb-2"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
        {title}
      </h2>
    </motion.div>
  );
}
