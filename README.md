
# 🚀 Ansible Configuration on AWS EC2

This guide walks through the process of setting up **Ansible** on AWS EC2 instances. We will configure one **master node** and two **worker nodes** to run Ansible automation tasks.

---

## 🖥️ Infrastructure Setup

* **EC2 Instances:** 3 servers (Ubuntu, Free Tier)
* **Security Group:** Use default (allow SSH)
* **Naming Convention:**

  * `master-server`
  * `worker-server1`
  * `worker-server2`

---

## ⚙️ Master Node Configuration

### 1️⃣ Connect via SSH (Putty / Terminal)

```bash
sudo su
sudo apt update
sudo apt install software-properties-common -y
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install ansible -y
ansible --version
```

### 2️⃣ Configure Ansible Inventory

Edit hosts file:

```bash
sudo nano /etc/ansible/hosts
```

Add worker private IPs:

```ini
[all]
worker1 ansible_host=<PRIVATE_IP>
worker2 ansible_host=<PRIVATE_IP>
```

### 3️⃣ Enable SSH Access

```bash
sudo nano /etc/ssh/sshd_config
```

Uncomment and edit:

```
PermitRootLogin yes
PasswordAuthentication yes
KbdInteractiveAuthentication yes
```

Restart SSH:

```bash
sudo systemctl restart ssh
sudo systemctl enable ssh
```

### 4️⃣ Add Ansible User with Sudo Access

```bash
sudo adduser ansible
sudo visudo
```

Add to sudoers:

```
ansible ALL=(ALL:ALL) NOPASSWD:ALL
```

### 5️⃣ Generate and Copy SSH Keys

```bash
ssh-keygen
ssh-copy-id ansible@<WORKER_IP>
```

### 6️⃣ Test Connectivity

```bash
ansible all -m ping
```

### 7️⃣ Run Basic Commands

```bash
ansible all -a "sudo apt update"
ansible all -a "sudo apt install tree -y"
ansible all -m ping
```

---

## ⚙️ Worker Node 1 Configuration

### Connect and Configure Hostname

```bash
sudo hostname worker1
sudo su
```

### Update SSH Config

```bash
nano /etc/ssh/sshd_config
```

Set:

```
PermitRootLogin yes
PasswordAuthentication yes
KbdInteractiveAuthentication yes
```

Restart SSH:

```bash
sudo systemctl restart ssh
sudo systemctl enable ssh
```

### Configure User and Permissions

```bash
sudo passwd root
sudo adduser ansible
sudo visudo
```

Add to sudoers:

```
ansible ALL=(ALL:ALL) NOPASSWD:ALL
```

---

## ⚙️ Worker Node 2 Configuration

### Connect and Configure Hostname

```bash
sudo hostname worker2
sudo su
```

### Update SSH Config

```bash
nano /etc/ssh/sshd_config
```

Set:

```
PermitRootLogin yes
PasswordAuthentication yes
KbdInteractiveAuthentication yes
```

Restart SSH:

```bash
sudo systemctl restart ssh
sudo systemctl enable ssh
```

### Configure User and Permissions

```bash
sudo adduser ansible
sudo visudo
```

Add to sudoers:

```
ansible ALL=(ALL:ALL) NOPASSWD:ALL
```

---

## ✅ Verification

From the **master node**:

```bash
ansible all -m ping
ansible all -a "hostname"
ansible all -a "uptime"
```

If successful, you now have a **working Ansible setup** with a master node controlling multiple worker nodes. 🎉

---

## 📌 Summary

* Configured **1 master** and **2 workers** on AWS EC2.
* Enabled **passwordless SSH** with key authentication.
* Tested **Ansible ping** and executed remote commands.

---
```
  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
```