# Lema CE
A Raspberry Pi discovery and implementation tool written in Node.js

### Project Under Development! Please wait for a finalized release before usage!

### Basic Structure
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
1. Become `root` to run the Lema Agent Installer. Lema has only been tested on the following operating systems:
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

### Advanced Setup
Use this method if the installer does not run properly when running.
#### Lema Admin
Install Lema Admin on a computer or server that will display the GUI webpage and run the Lema Engine. This machine is recommended to remain active and on the network; if disconnected, the Lema Console and Engine will not be able to control external devices.
1. Setup a mongodb database (if needed)
    - Use the [tutorials](https://docs.mongodb.com/manual/installation/#tutorials) on the mongodb website
2. Clone the repository from github.com
```
git clone https://github.com/RAK3RMAN/Lema.git
```
3. Setup LEMAEngine
    - Enter the Lema folder
        - `cd Lema`
    - Enter the LEMAEngine folder
        - `cd LEMAEngine`
    - Install all required packages with root-level access (if needed)
        - `sudo npm install`    
    - Start default application using npm
        - `npm start`
    - If using an external database, run on the command line using the following format:
        - `node app.js BROADCAST_PORT MONGODB_URL`
        - For example: `node app.js 3031 mongodb://user:pass@192.168.0.10:27017`
        - Save your modified configuration in the `start.sh` file in that directory
    - If any errors occur, please read the logs and attempt to resolve. If resolution cannot be achieved, post in the issues under this project. 
3. Setup LEMAConsole
    - Enter the Lema folder
        - `cd Lema`
    - Enter the LEMAConsole folder
        - `cd LEMAConsole`
    - Install all required packages with root-level access (if needed)
        - `sudo npm install`    
    - Start default application using npm
        - `npm start`
    - If using an external database or running LEMAEngine on a different machine, run on the command line using the following format:
        - `node app.js BROADCAST_PORT LEMA_ENGINE_URL MONGODB_URL`
        - For example: `node app.js 3000 192.168.0.5:3031 mongodb://user:pass@192.168.0.10:27017`
        - The parameter `LEMA_ENGINE_URL` cannot be `localhost:PORT` or `127.0.0.1:PORT`, must be externally accessable IP.
        - Save your modified configuration in the `start.sh` file in that directory
    - If any errors occur, please read the logs and attempt to resolve. If resolution cannot be achieved, post in the issues under this project. 
4. Setup PM2 to run services on startup
    - Install PM2
        - `npm install pm2 -g`
    - Start PM2
        - `pm2 startup`
    - Enter the LEMAEngine folder
        - `cd LEMAEngine`
    - Start LEMAEngine with root-level access (if needed)
        - `sudo pm2 start start.sh --name LEMAEngine`
    - Return to Lema directory `cd ..`
    - Enter the LEMAConsole folder
        - `cd LEMAConsole`
    - Start LEMAConsole with root-level access (if needed)
        - `sudo pm2 start start.sh --name LEMAConsole` 
    - Save PM2 configuration to allow processes to start on boot
        - `sudo pm2 save`
        - Follow any prompts from pm2 if needed
