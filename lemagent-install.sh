#!/usr/bin/env bash
#Lema Agent Install Script
clear
echo ""
echo "=================================================="
echo "==|| LEMAgent Install Manager - RAk3rman 2019 ||=="
echo "=================================================="
echo "Detected OS: Raspbian"
echo ""
if [ "$EUID" -ne 0 ]
  then echo "This script must be run with root-level access."
  echo ""
  echo "Exiting install manager..."
  echo "Follow advanced setup in README if script failed."
  exit 0
fi
echo "LEMAgent - Start auto install?"
echo "(y)es or (N)o: (y)"
read autoInstall
if [ "$autoInstall" = "y" ] || [ "$autoInstall" = "" ]; then
    if [ -e Lema ]; then
        echo ""
        echo "LEMAgent is already installed..."
        echo ""
        echo "LEMAgent - Would you like to replace the repository?"
        echo "WARNING: This will replace all previous files in the Lema directory!"
        echo "(y)es or (N)o:"
        read replaceLema
        if [ "$replaceLema" = "y" ] || [ "$replaceLema" = "Y" ]; then
            rm -rf Lema
            echo "Installing LEMAgent:"
            else
                echo ""
                echo "Exiting install manager..."
                echo "Follow advanced setup in README if script failed."
                exit 0
        fi
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
    pm2 startup
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