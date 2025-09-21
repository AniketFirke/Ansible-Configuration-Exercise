import { motion } from "motion/react";
import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  delay?: number;
}

export function SectionCard({ title, children, icon, delay = 0 }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform perspective-1000 hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </motion.div>
  );
}