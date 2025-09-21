import { motion } from "motion/react";
import { Users, Terminal, Shield, Settings, Network, CheckCircle } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { StepList } from "./StepList";
import { CodeBlock } from "./CodeBlock";

export function WorkerServer1Page() {
  const connectionSteps = [
    {
      title: "Connect to PuTTY",
      description: "Establish SSH connection to your worker-server1 EC2 instance",
      commands: ["Connect using PuTTY with your private key"]
    }
  ];

  const hostnameSteps = [
    {
      title: "Set Hostname",
      commands: ["sudo hostname worker1"]
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

  const networkSteps = [
    {
      title: "Check IP Address",
      commands: ["hostname -i"]
    },
    {
      title: "Set Root Password",
      commands: ["sudo passwd root"]
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
    },
    {
      title: "List Directory Contents",
      commands: [
        "ls",
        "ls"
      ]
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
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <Users className="w-12 h-12 text-green-400" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Worker Server 1 Configuration
        </h2>
        <p className="text-slate-300">
          Configure the first worker node for Ansible management
        </p>
      </div>

      {/* Connection */}
      <SectionCard 
        title="Initial Connection" 
        icon={<Terminal className="w-8 h-8 text-green-400" />}
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
            🏷️ <strong>Note:</strong> Setting hostname to "worker1" helps identify this node in the Ansible cluster
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
            🔐 <strong>Security Note:</strong> These settings enable password authentication for initial setup. Consider key-based auth for production.
          </p>
        </div>
      </SectionCard>

      {/* Network Configuration */}
      <SectionCard 
        title="Network & Password Setup" 
        icon={<Network className="w-8 h-8 text-purple-400" />}
        delay={0.4}
      >
        <StepList steps={networkSteps} />
      </SectionCard>

      {/* User Management */}
      <SectionCard 
        title="User Management & Sudo Configuration" 
        icon={<Shield className="w-8 h-8 text-orange-400" />}
        delay={0.5}
      >
        <StepList steps={userManagementSteps} />
      </SectionCard>

      {/* User Switching */}
      <SectionCard 
        title="User Switching & Verification" 
        icon={<CheckCircle className="w-8 h-8 text-cyan-400" />}
        delay={0.6}
      >
        <StepList steps={userSwitchSteps} />
        <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
          <p className="text-cyan-300 text-sm">
            ✅ <strong>Verification:</strong> Successfully listing directories confirms proper user setup and permissions
          </p>
        </div>
      </SectionCard>

      {/* Quick Reference */}
      <SectionCard 
        title="Worker 1 Quick Commands" 
        icon={<Terminal className="w-8 h-8 text-slate-400" />}
        delay={0.7}
      >
        <CodeBlock 
          code={`# Worker 1 Essential Commands
sudo hostname worker1       # Set hostname to worker1
hostname -i                 # Check IP address
sudo passwd root           # Set root password
sudo adduser ansible      # Create ansible user
sudo su                    # Switch to root
su - ansible              # Switch to ansible user with login shell
ls                        # List directory contents
nano /etc/ssh/sshd_config # Edit SSH configuration`}
          language="bash"
        />
      </SectionCard>

      {/* Status Indicator */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        className="flex justify-center"
      >
        <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6 text-center">
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-green-300 font-medium">Worker Server 1 Ready</p>
          <p className="text-slate-300 text-sm">Ready for Ansible management from master server</p>
        </div>
      </motion.div>
    </motion.div>
  );
}