#!/usr/bin/env bash
#Lema Agent Install Script
echo ""
echo "=================================================="
echo "==|| LEMAgent Install Manager - RAk3rman 2019 ||=="
echo "=================================================="
echo "Detected OS: Raspbian"
echo ""
echo "LEMAgent - Install required setup packages?"
echo "(y)es or (N)o"
read nodejsinstall
if [ "$nodejsinstall" = "y" ] || [ "$nodejsinstall" = "Y" ]; then
    apt-get update
    apt-get upgrade -y
    apt install git
else
    echo "Exiting install manager..."
    exit 0
fi