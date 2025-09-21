import { motion } from "motion/react";
import { Server, Users, ChevronRight } from "lucide-react";

interface NavigationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const pages = [
    { id: 1, title: "Master Server", icon: <Server className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
    { id: 2, title: "Worker Server 1", icon: <Users className="w-5 h-5" />, color: "from-green-500 to-emerald-500" },
    { id: 3, title: "Worker Server 2", icon: <Users className="w-5 h-5" />, color: "from-purple-500 to-pink-500" }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-20 mb-8"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-center space-x-4">
          {pages.map((page, index) => (
            <div key={page.id} className="flex items-center">
              <motion.button
                onClick={() => onPageChange(page.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentPage === page.id 
                    ? 'text-white shadow-lg' 
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {currentPage === page.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${page.color} rounded-xl`}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <div className="relative flex items-center gap-2">
                  {page.icon}
                  <span>{page.title}</span>
                </div>
              </motion.button>
              
              {index < pages.length - 1 && (
                <ChevronRight className="w-5 h-5 text-slate-400 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}