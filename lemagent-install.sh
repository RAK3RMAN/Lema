#!/usr/bin/env bash
#Lema Agent Install Script
clear
echo ""
echo "=================================================="
echo "==|| LEMAgent Install Manager - RAk3rman 2019 ||=="
echo "=================================================="
echo "Detected OS: Raspbian"
echo ""
echo "LEMAgent - Start auto install?"
echo "(y)es or (N)o:"
read nodejsinstall
if [ "$nodejsinstall" = "y" ] || [ "$nodejsinstall" = "Y" ]; then
#!/bin/bash
    if [ -e Lema ]; then
        echo ""
        echo "LEMAgent is already installed..."
        echo ""
        echo "Exiting install manager..."
        echo "Follow advanced setup in README if script failed."
        exit 0
    else
        echo "Installing LEMAgent:"
    fi
    apt-get update
    apt-get upgrade -y
    apt-get install git -y
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    apt-get install nodejs -y
    git clone https://github.com/RAK3RMAN/Lema.git
    cd Lema
    cd LEMAgent
    npm install
    npm install pm2 -g
#    pm2 startup
#    pm2 start start.sh --name LEMAgent
#    pm2 save
    echo ""
    echo "LEMAgent Setup is now complete!"
    echo ""
else
    echo "Exiting install manager..."
    echo "Follow advanced setup in README if script failed."
    exit 0
fi