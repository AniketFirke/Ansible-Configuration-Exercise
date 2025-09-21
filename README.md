
# 🚀 Ansible Configuration on AWS EC2

This guide walks through the process of setting up **Ansible** on AWS EC2 instances. We will configure one **master node** and two **worker nodes** to run Ansible automation tasks.
---
This project demonstrates the setup of Ansible on AWS EC2 instances for automated configuration management. Three Ubuntu servers were provisioned: 1 Master and 2 Workers. The master node was configured with Ansible, while workers were prepared with hostname updates, SSH access, and user privileges. Passwordless SSH was enabled using key-based authentication. Inventory files were updated with private IPs, and Ansible connectivity was verified using the ping module. There are executed across all nodes, showcasing centralized automation with Ansible.
---
## 📌 Summary

* Configured **1 master** and **2 workers** on AWS EC2.
* Enabled **passwordless SSH** with key authentication.
* Tested **Ansible ping** and executed remote commands.

---

  ## Running the code
```
  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
```
