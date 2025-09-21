import { motion } from "motion/react";
import { Server, Terminal, Shield, Key, Network, CheckCircle } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { StepList } from "./StepList";
import { CodeBlock } from "./CodeBlock";

export function MasterServerPage() {
  const connectionSteps = [
    {
      title: "Connect to PuTTY",
      description: "Establish SSH connection to your master-server EC2 instance",
      commands: ["Connect using PuTTY with your private key"]
    }
  ];

  const ansibleInstallSteps = [
    {
      title: "Switch to Root User",
      commands: ["sudo su"]
    },
    {
      title: "Update Package Repository",
      commands: ["sudo apt update"]
    },
    {
      title: "Install Software Properties Common",
      commands: ["sudo apt install software-properties-common -y"]
    },
    {
      title: "Add Ansible Repository",
      commands: ["sudo add-apt-repository --yes --update ppa:ansible/ansible"]
    },
    {
      title: "Install Ansible",
      commands: ["sudo apt install ansible -y"]
    },
    {
      title: "Verify Installation",
      commands: ["ansible --version"]
    }
  ];

  const inventorySteps = [
    {
      title: "Edit Inventory File",
      commands: ["sudo nano /etc/ansible/hosts"]
    },
    {
      title: "Add Worker Nodes",
      description: "Add these entries to the hosts file:",
      commands: [
        "worker1 Private=<IP_ADDRESS_1>",
        "worker2 Private=<IP_ADDRESS_2>"
      ]
    },
    {
      title: "List All Hosts",
      commands: ["ansible all --list"]
    },
    {
      title: "Test Initial SSH Connection",
      commands: ["ssh <WORKER_1_IP> → yes"]
    },
    {
      title: "Set Hostname",
      commands: [
        "sudo hostname master",
        "bash"
      ]
    }
  ];

  const sshSetupSteps = [
    {
      title: "Edit SSH Configuration",
      commands: ["sudo nano /etc/ssh/sshd_config"]
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
    },
    {
      title: "Verify Configuration",
      commands: [
        "ansible all --list",
        "ssh <WORKER_1_IP> → enter password"
      ]
    }
  ];

  const userManagementSteps = [
    {
      title: "Add Ansible User",
      commands: ["sudo adduser ansible → y"]
    },
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
    }
  ];

  const connectivitySteps = [
    {
      title: "Test SSH Connectivity",
      commands: [
        "ansible all --list",
        "su - ansible",
        "ssh <WORKER_1_IP> → enter password",
        "ansible all --list",
        "ssh <WORKER_2_IP> → enter password"
      ]
    }
  ];

  const keySetupSteps = [
    {
      title: "Generate SSH Key",
      commands: [
        "sudo su",
        "ssh-keygen"
      ]
    },
    {
      title: "Copy SSH Key to Workers",
      commands: [
        "ansible all --list",
        "ssh-copy-id ansible@<WORKER_IP>"
      ]
    }
  ];

  const testingSteps = [
    {
      title: "Test Ansible Connectivity",
      commands: ["ansible all -m ping"]
    },
    {
      title: "Run System Updates",
      commands: ["ansible all -a \"sudo apt update\""]
    },
    {
      title: "Install Packages",
      commands: ["ansible all -a \"sudo apt install tree -y\""]
    },
    {
      title: "Final Connectivity Test",
      commands: ["ansible all -m ping"]
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
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <Server className="w-12 h-12 text-blue-400" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Master Server Configuration
        </h2>
        <p className="text-slate-300">
          Configure the Ansible master node with complete setup and worker connectivity
        </p>
      </div>

      {/* Connection */}
      <SectionCard 
        title="Initial Connection" 
        icon={<Terminal className="w-8 h-8 text-blue-400" />}
        delay={0.1}
      >
        <StepList steps={connectionSteps} />
      </SectionCard>

      {/* Ansible Installation */}
      <SectionCard 
        title="Ansible Installation" 
        icon={<Server className="w-8 h-8 text-green-400" />}
        delay={0.2}
      >
        <StepList steps={ansibleInstallSteps} />
      </SectionCard>

      {/* Inventory Configuration */}
      <SectionCard 
        title="Inventory Configuration" 
        icon={<Network className="w-8 h-8 text-purple-400" />}
        delay={0.3}
      >
        <StepList steps={inventorySteps} />
        <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <p className="text-purple-300 text-sm">
            📝 <strong>Important:</strong> Replace &lt;IP_ADDRESS_1&gt; and &lt;IP_ADDRESS_2&gt; with actual private IPs of your worker instances
          </p>
        </div>
      </SectionCard>

      {/* SSH Configuration */}
      <SectionCard 
        title="SSH Access Configuration" 
        icon={<Shield className="w-8 h-8 text-yellow-400" />}
        delay={0.4}
      >
        <StepList steps={sshSetupSteps} />
      </SectionCard>

      {/* User Management */}
      <SectionCard 
        title="User Management" 
        icon={<Shield className="w-8 h-8 text-orange-400" />}
        delay={0.5}
      >
        <StepList steps={userManagementSteps} />
      </SectionCard>

      {/* SSH Connectivity Test */}
      <SectionCard 
        title="SSH Connectivity Test" 
        icon={<Network className="w-8 h-8 text-cyan-400" />}
        delay={0.6}
      >
        <StepList steps={connectivitySteps} />
      </SectionCard>

      {/* SSH Key Setup */}
      <SectionCard 
        title="SSH Key Generation & Distribution" 
        icon={<Key className="w-8 h-8 text-pink-400" />}
        delay={0.7}
      >
        <StepList steps={keySetupSteps} />
      </SectionCard>

      {/* Testing */}
      <SectionCard 
        title="Ansible Testing & Verification" 
        icon={<CheckCircle className="w-8 h-8 text-emerald-400" />}
        delay={0.8}
      >
        <StepList steps={testingSteps} />
        <div className="mt-6 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <p className="text-emerald-300 text-sm">
            ✅ <strong>Success Indicators:</strong> All ping commands should return "SUCCESS" and package installations should complete without errors
          </p>
        </div>
      </SectionCard>

      {/* Quick Reference */}
      <SectionCard 
        title="Master Server Quick Commands" 
        icon={<Terminal className="w-8 h-8 text-slate-400" />}
        delay={0.9}
      >
        <CodeBlock 
          code={`# Essential Master Commands
ansible --version          # Check Ansible version
ansible all --list         # List all managed hosts
ansible all -m ping         # Test connectivity to all hosts
ssh-keygen                  # Generate SSH key pair
ssh-copy-id ansible@&lt;IP&gt;    # Copy SSH key to worker
sudo hostname master        # Set hostname
su - ansible               # Switch to ansible user`}
          language="bash"
        />
      </SectionCard>
    </motion.div>
  );
}