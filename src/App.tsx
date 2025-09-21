import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Cloud } from "lucide-react";
import { Navigation } from "./components/Navigation";
import { MasterServerPage } from "./components/MasterServerPage";
import { WorkerServer1Page } from "./components/WorkerServer1Page";
import { WorkerServer2Page } from "./components/WorkerServer2Page";
import { SectionCard } from "./components/SectionCard";
import { StepList } from "./components/StepList";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const ec2Setup = [
    {
      title: "Create EC2 Instances",
      description: "Launch 3 Ubuntu instances in free tier with default security settings",
      commands: [
        "Instance 1: master-server",
        "Instance 2: worker-server1", 
        "Instance 3: worker-server2"
      ]
    }
  ];

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return <MasterServerPage />;
      case 2:
        return <WorkerServer1Page />;
      case 3:
        return <WorkerServer2Page />;
      default:
        return <MasterServerPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -25, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" 
        />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-12 pb-8 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-6"
        >
          <Settings className="w-16 h-16 text-blue-400 mx-auto" />
        </motion.div>
        <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Ansible Configuration Exercise
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Exercise No: 06 - Complete Ansible setup with Aniket Firke
        </p>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pb-12">
        {/* EC2 Setup Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <SectionCard 
            title="EC2 Instance Overview" 
            icon={<Cloud className="w-8 h-8 text-blue-400" />}
            delay={0.1}
          >
            <StepList steps={ec2Setup} />
            <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-blue-300 text-sm">
                💡 <strong>Note:</strong> Ensure all instances are in the same VPC and security group allows SSH access on port 22
              </p>
            </div>
          </SectionCard>
        </motion.div>

        {/* Navigation */}
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page Indicator */}
      <motion.div
        className="fixed bottom-8 left-8 z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex space-x-2">
            {[1, 2, 3].map((page) => (
              <motion.div
                key={page}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentPage === page ? 'bg-blue-400' : 'bg-slate-600'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentPage(currentPage === 3 ? 1 : currentPage + 1)}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-blue-500/25 transition-shadow duration-300"
        >
          <Settings className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}