#!/usr/bin/env bash
#Lema Admin Install Script

#TODO Need to install evilscan on install

function manageMenu () {
	echo ""
	echo "===================================================="
	echo "==|| LEMA Admin Install Manager - RAk3rman 2019 ||=="
	echo "===================================================="
	echo ""
	echo "What would you like to do?"
	echo "   1) Re-Install Lema Admin"
	echo "   2) Remove Lema Admin"
	echo "   3) Exit"
	echo ""
	until [[ "$MENU_OPTION" =~ ^[1-4]$ ]]; do
		read -rp "Select an option [1-3]: " MENU_OPTION
	done

	case $MENU_OPTION in
		1)
			reinstallLema
		;;
		2)
			removeLema
		;;
		3)
			exit 0
		;;
	esac
}

#Check for Install Status
function checkInstall () {
    manageMenu
}
#Run checkInstall Function
checkInstall