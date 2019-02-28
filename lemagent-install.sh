#!/usr/bin/env bash
#Lema Agent Install Script
clear
echo ""
echo "=================================================="
echo "==|| LEMAgent Install Manager - RAk3rman 2019 ||=="
echo "=================================================="
detect_os=$(uname -m)
if [ "$detect_os" = "armv7l" ]; then
    echo "Detected OS: Raspbian ($detect_os)"
else
    echo "The detected OS is not Raspbian, this agent is designed to run on a Raspberry Pi."
    echo "LEMAgent - Would you like to override this check?"
    echo "(y)es or (N)o: (n)"
    read overrideOS
    if [ "$overrideOS" = "y" ] || [ "$overrideOS" = "Y" ]; then
        echo "OVERRIDING OS REQUIREMENT - Proceeding with script..."
    else
        echo "Exiting install manager..."
        echo "Follow advanced setup in README if script failed."
        exit 0
    fi
fi
echo ""
if [ "$EUID" -ne 0 ]; then
  echo "This script must be run with root-level access."
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
        echo "What would you like to do?"
	    echo "   1) Re-Install LEMAgent"
	    echo "   2) Update LEMAgent"
	    echo "   3) Remove LEMAgent"
	    echo "   4) Exit"
	    echo ""
	    until [[ "$MENU_OPTION" =~ ^[1-4]$ ]]; do
		    read -rp "Select an option [1-3]: " MENU_OPTION
	    done
	    case $MENU_OPTION in
		    1)
		    	echo ""
		    	echo "LEMAgent - Are you sure you want to reinstall the repository?"
                echo "WARNING: This will DELETE all existing files in the Lema directory!"
                echo "(y)es or (N)o:"
                read replaceLema
                if [ "$replaceLema" = "y" ] || [ "$replaceLema" = "" ]; then
                    rm -rf Lema
                    echo "Installing LEMAgent:"
                    else
                        echo ""
                        echo "Exiting install manager..."
                        echo "Follow advanced setup in README if script failed."
                        exit 0
                fi
		    ;;
		    2)
			    cd Lema
			    git pull
			    cd ..
			    pm2 restart LEMAgent
			    echo ""
                echo "LEMA repository updated successfully!"
                echo ""
                echo "Exiting install manager..."
                echo "Follow advanced setup in README if script failed."
                exit 0
		    ;;
		    3)
			    echo ""
		    	echo "LEMAgent - Are you sure you want to REMOVE LEMAgent?"
                echo "WARNING: This will DELETE all existing files in the Lema directory!"
                echo "(y)es or (N)o:"
                read removeLema
                if [ "$removeLema" = "y" ] || [ "$removeLema" = "" ]; then
                    rm -rf Lema
                    pm2 delete LEMAgent
                    pm2 save
                    echo "LEMAgent Successfully Removed!"
                    echo "Run the install script to re-install LEMAgent"
                    echo ""
                    echo "Exiting install manager..."
                    echo "Follow advanced setup in README if script failed."
                    exit 0
                fi
		    ;;
		    4)
			    echo ""
                echo "Exiting install manager..."
                echo "Follow advanced setup in README if script failed."
                exit 0
		    ;;
	    esac
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
    pm2 start start.sh --name LEMAgent
    pm2 save
    echo ""
    echo "LEMAgent Setup is now complete!"
    echo "Use 'pm2 status LEMAgent' to see status of application."
    echo "Use 'pm2 logs LEMAgent' to see logs of application."
    echo "See other pm2 commands using 'pm2 --help'"
    echo "Thank you for using LEMA! - Interface with LEMA Console"
    echo ""
else
    echo ""
    echo "Exiting install manager..."
    echo "Follow advanced setup in README if script failed."
    exit 0
fi