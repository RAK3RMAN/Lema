# Lema CE
### Project Under Development!
A Raspberry Pi discovery and implementation tool written in Node.js

## Basic Structure & Key Features
Lema aims to provide a cohesive and powerful solution to interacting with Raspberry Pi's GPIO capabilities. The Lema Agent runs on the Raspberry Pi and communicates with the Lema Engine, which provides a GUI webpage (Lema Console) and API pathways for external integration.

### Key Features
- Automated Capabilites
	- Install and Setup
	- Raspberry Pi discovery
- Beautiful webpage GUI (Lema Console)
- User Authentication
- Fast response time with Websockets
- API Integrations
	- Setup Raspberry Pi's waiting for integration
	- Get/Configure Raspberry Pi GPIO setup
	- Send GPIO commands to Raspberry Pi
- More features coming soon!

## Install and Setup
### Lema Admin Install
Install Lema Admin on a computer or server that will display the GUI webpage and run the Lema Engine. This machine is recommended to remain active and on the network; if disconnected, the Lema Console and Engine will not be able to control external devices.
1. Become `root` to run the Lema Agent Installer.
    - Ubuntu 17.04+
        - `sudo su`
    - MacOS 10.7+
        - `su`
    - Raspbian
        - `sudo su -`
2. Download and run the installer.
```
bash <(curl -s https://github.com/RAK3RMAN/Lema/lemadmin-install.sh)
```

### Lema Agent Install
Install Lema Agent on a Raspberry Pi for the Lema Engine to be able to control the GPIO pins on the board. 
1. Become `root` to run the Lema Agent Installer.
```
sudo su -
```
2. Download and run the installer.
```
bash <(curl -s https://github.com/RAK3RMAN/Lema/lemagent-install.sh)
```
