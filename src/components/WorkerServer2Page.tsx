import { motion } from "motion/react";
import { Users, Terminal, Shield, Settings, Network, CheckCircle, TreePine } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { StepList } from "./StepList";
import { CodeBlock } from "./CodeBlock";

export function WorkerServer2Page() {
  const connectionSteps = [
    {
      title: "Connect to PuTTY",
      description: "Establish SSH connection to your worker-server2 EC2 instance",
      commands: ["Connect using PuTTY with your private key"]
    }
  ];

  const hostnameSteps = [
    {
      title: "Set Hostname",
      commands: ["sudo hostname worker2"]
    },
    {
      title: "Switch to Root User",
      commands: ["sudo su"]
    }
  ];

  const sshConfigSteps = [
    {
      title: "Edit SSH Configuration",
      commands: ["nano /etc/ssh/sshd_config"]
    },
    {
      title: "Enable SSH Settings",
      description: "Modify these lines in sshd_config:",
      commands: [
        "Remove # before PermitRootLogin ",
        "Remove # before PasswordAuthentication and set yes",
        "KbdInteractiveAuthentication yes"
      ]
    },
    {
      title: "Restart SSH Services",
      commands: [
        "sudo systemctl restart ssh",
        "sudo systemctl enable ssh"
      ]
    }
  ];

  const userManagementSteps = [
    {
      title: "Configure Sudo Access",
      commands: ["sudo visudo"]
    },
    {
      title: "Add Sudo Rules",
      description: "Add these lines to sudoers file:",
      commands: [
        "root    ALL=(ALL:ALL) ALL",
        "ansible ALL=(ALL:ALL) NOPASSWD:ALL"
      ]
    },
    {
      title: "Add Ansible User",
      commands: ["sudo adduser ansible"]
    }
  ];

  const userSwitchSteps = [
    {
      title: "Switch to Root",
      commands: ["sudo su"]
    },
    {
      title: "Switch to Ansible User",
      commands: ["ansible"]
    },
    {
      title: "Switch to Ansible with Login Shell",
      commands: ["sudo su – ansible"]
    }
  ];

  const verificationSteps = [
    {
      title: "List Directory Contents",
      commands: ["ls"]
    },
    {
      title: "Use Tree Command",
      commands: ["tree"]
    },
    {
      title: "List Again",
      commands: ["ls"]
    },
    {
      title: "Tree Command Again",
      commands: ["tree"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <Users className="w-12 h-12 text-purple-400" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Worker Server 2 Configuration
        </h2>
        <p className="text-slate-300">
          Configure the second worker node for Ansible management
        </p>
      </div>

      {/* Connection */}
      <SectionCard 
        title="Initial Connection" 
        icon={<Terminal className="w-8 h-8 text-purple-400" />}
        delay={0.1}
      >
        <StepList steps={connectionSteps} />
      </SectionCard>

      {/* Hostname Configuration */}
      <SectionCard 
        title="Hostname Configuration" 
        icon={<Settings className="w-8 h-8 text-blue-400" />}
        delay={0.2}
      >
        <StepList steps={hostnameSteps} />
        <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-blue-300 text-sm">
            🏷️ <strong>Note:</strong> Setting hostname to "worker2" completes the cluster identification setup
          </p>
        </div>
      </SectionCard>

      {/* SSH Configuration */}
      <SectionCard 
        title="SSH Configuration" 
        icon={<Shield className="w-8 h-8 text-yellow-400" />}
        delay={0.3}
      >
        <StepList steps={sshConfigSteps} />
        <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <p className="text-yellow-300 text-sm">
            🔐 <strong>Consistency:</strong> Same SSH configuration as Worker 1 ensures uniform access across all worker nodes
          </p>
        </div>
      </SectionCard>

      {/* User Management */}
      <SectionCard 
        title="User Management & Sudo Configuration" 
        icon={<Shield className="w-8 h-8 text-orange-400" />}
        delay={0.4}
      >
        <StepList steps={userManagementSteps} />
      </SectionCard>

      {/* User Switching */}
      <SectionCard 
        title="User Switching" 
        icon={<Network className="w-8 h-8 text-cyan-400" />}
        delay={0.5}
      >
        <StepList steps={userSwitchSteps} />
      </SectionCard>

      {/* Verification Commands */}
      <SectionCard 
        title="System Verification" 
        icon={<TreePine className="w-8 h-8 text-green-400" />}
        delay={0.6}
      >
        <StepList steps={verificationSteps} />
        <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <p className="text-green-300 text-sm">
            🌳 <strong>Tree Command:</strong> The tree command helps visualize directory structure and confirms package installation capabilities
          </p>
        </div>
      </SectionCard>

      {/* Quick Reference */}
      <SectionCard 
        title="Worker 2 Quick Commands" 
        icon={<Terminal className="w-8 h-8 text-slate-400" />}
        delay={0.7}
      >
        <CodeBlock 
          code={`# Worker 2 Essential Commands
sudo hostname worker2       # Set hostname to worker2
sudo adduser ansible      # Create ansible user
sudo su                    # Switch to root
su - ansible              # Switch to ansible user with login shell
ls                        # List directory contents
tree                      # Display directory tree structure
nano /etc/ssh/sshd_config # Edit SSH configuration

# Verification Commands
ls && tree                # Quick directory listing and tree view`}
          language="bash"
        />
      </SectionCard>

      {/* Cluster Status */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
          <Settings className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <p className="text-blue-300 font-medium text-sm">Master Server</p>
          <p className="text-slate-400 text-xs">Configured ✓</p>
        </div>
        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
          <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <p className="text-green-300 font-medium text-sm">Worker Server 1</p>
          <p className="text-slate-400 text-xs">Configured ✓</p>
        </div>
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
          <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-purple-300 font-medium text-sm">Worker Server 2</p>
          <p className="text-slate-400 text-xs">Configured ✓</p>
        </div>
      </motion.div>

      {/* Final Status */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="flex justify-center"
      >
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6 text-center">
          <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <p className="text-purple-300 font-medium">Ansible Cluster Complete!</p>
          <p className="text-slate-300 text-sm">All servers configured and ready for management</p>
        </div>
      </motion.div>
    </motion.div>
  );
}