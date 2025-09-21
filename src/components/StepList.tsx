import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";

interface Step {
  title: string;
  description?: string;
  commands?: string[];
}

interface StepListProps {
  steps: Step[];
}

export function StepList({ steps }: StepListProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200"
        >
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white mb-1">{step.title}</h4>
            {step.description && (
              <p className="text-slate-300 text-sm mb-2">{step.description}</p>
            )}
            {step.commands && (
              <div className="space-y-2">
                {step.commands.map((command, cmdIndex) => (
                  <div key={cmdIndex} className="bg-slate-900/50 rounded p-2 font-mono text-sm text-green-400">
                    {command}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}