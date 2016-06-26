#!/bin/bash
#Variables
hellopath="/home/lampros/Documents/nu_node"
primenumber="/home/lampros/Documents/prime_node"
memtest="/home/lampros/Documents/memory_test"
logpath="/home/logs"
logfile="build_log.txt"
DATE=`date +%Y%m%d%H%M%S`

echo "$DATE --->"																			| tee -a ${logpath}/${DATE}_${logfile}
sleep 1;
echo "*********************************************************"							| tee -a ${logpath}/${DATE}_${logfile}
echo "Script for building 3 Docker Images containing 3 web apps"							| tee -a ${logpath}/${DATE}_${logfile}
echo "*********************************************************"							| tee -a ${logpath}/${DATE}_${logfile}
sleep 1;		
echo "Image 1: Hello World"																	| tee -a ${logpath}/${DATE}_${logfile}		
echo "Image 2: Prime Numbers Generator"														| tee -a ${logpath}/${DATE}_${logfile}		
echo "Image 3: Memory Stretching"															| tee -a ${logpath}/${DATE}_${logfile}		
echo "---------------------------------------------------------"							| tee -a ${logpath}/${DATE}_${logfile}
sleep 1;		
		
while true; do		
    read -p "Do you want to proceed...? " yn		
    case $yn in		
        [Yy]* ) break;;		
        [Nn]* ) exit;;		
        * ) echo "Please answer y or n";;		
    esac		
done		
		
#Builidng up a Hello World image		
echo "Trying to build the Hello World image..."												| tee -a ${logpath}/${DATE}_${logfile}
sleep 1;
cd $hellopath		
if [ -f "./Dockerfile" ] 		
	then 		
	echo "The docker file for Building Hello World image has been found" 					| tee -a ${logpath}/${DATE}_${logfile}
else		
	echo "The docker file for Building Hello World image is missing"						| tee -a ${logpath}/${DATE}_${logfile}
	echo "Please investigate"																| tee -a ${logpath}/${DATE}_${logfile}
	exit 1		
fi		
echo "Building up the image..."																| tee -a ${logpath}/${DATE}_${logfile}
sleep 1;
docker build -t lampros/node-web-app:vWrkbl .												| tee -a ${logpath}/${DATE}_${logfile}
		
if [ $? -ne 0 ]		
then		
	echo "****************************************************************"					| tee -a ${logpath}/${DATE}_${logfile}
	echo "The image lampros/node-web-app:vWrkbl couldn't be built"							| tee -a ${logpath}/${DATE}_${logfile}
	echo "****************************************************************"					| tee -a ${logpath}/${DATE}_${logfile}
	exit 1		
else		
	echo "****************************************************************"					| tee -a ${logpath}/${DATE}_${logfile}
	echo "The image lampros/node-web-app:vWrkbl has been built sucessfully"					| tee -a ${logpath}/${DATE}_${logfile}
	echo "****************************************************************"					| tee -a ${logpath}/${DATE}_${logfile}
fi		
		
		
		
#Builidng up a Prime Number Generator image		
echo "Trying to build the Prime Numbers Generator image..."									| tee -a ${logpath}/${DATE}_${logfile}
sleep 1;
cd $primenumber		
if [ -f "./Dockerfile" ] 		
	then 		
	echo "The docker file for Building Prime Number Generator image has been found" 		| tee -a ${logpath}/${DATE}_${logfile}
else		
	echo "The docker file for Building Prime Number Generator image is missing"				| tee -a ${logpath}/${DATE}_${logfile}
	echo "Please investigate"																| tee -a ${logpath}/${DATE}_${logfile}
	exit 1		
fi		
echo "Building up the image..."																| tee -a ${logpath}/${DATE}_${logfile}
sleep 1;
docker build -t lampros/primenumbers:vWrkbl .												| tee -a ${logpath}/${DATE}_${logfile}
		
if [ $? -ne 0 ]		
then		
	echo "****************************************************************"					| tee -a ${logpath}/${DATE}_${logfile}
	echo "The image lampros/primenumbers:vWrkbl couldn't be built"							| tee -a ${logpath}/${DATE}_${logfile}
	echo "****************************************************************"					| tee -a ${logpath}/${DATE}_${logfile}
	exit 1		
else		
	echo "****************************************************************"					| tee -a ${logpath}/${DATE}_${logfile}
	echo "The image lampros/primenumbers:vWrkbl has been built sucessfully"					| tee -a ${logpath}/${DATE}_${logfile}
	echo "****************************************************************"					| tee -a ${logpath}/${DATE}_${logfile}
fi		
		
		
		
#Builidng up a Memory Stretching image		
echo "Trying to build the Memory Stretching image..."										| tee -a ${logpath}/${DATE}_${logfile}
sleep 1;
cd $memtest		
if [ -f "./Dockerfile" ] 		
	then 		
	echo "The docker file for Building Memory Stretching image has been found" 				| tee -a ${logpath}/${DATE}_${logfile}
else		
	echo "The docker file for Building Memory Stretching image is missing"					| tee -a ${logpath}/${DATE}_${logfile}
	echo "Please investigate"																| tee -a ${logpath}/${DATE}_${logfile}
	exit 1			
fi		
echo "Building up the image..."																| tee -a ${logpath}/${DATE}_${logfile}
sleep 1;
docker build -t lampros/mem:vWrkbl .														| tee -a ${logpath}/${DATE}_${logfile}
		
if [ $? -ne 0 ]		
then		
	echo "****************************************************************"					| tee -a ${logpath}/${DATE}_${logfile}
	echo "The image lampros/mem:vWrkbl couldn't be built"									| tee -a ${logpath}/${DATE}_${logfile}
	echo "****************************************************************"					| tee -a ${logpath}/${DATE}_${logfile}
	exit 1		
else		
	echo "****************************************************************"					| tee -a ${logpath}/${DATE}_${logfile}
	echo "The image lampros/mem:vWrkbl has been built sucessfully"							| tee -a ${logpath}/${DATE}_${logfile}
	echo "****************************************************************"					| tee -a ${logpath}/${DATE}_${logfile}
fi



#Checking
echo "-----------------------------------------"											| tee -a ${logpath}/${DATE}_${logfile}
echo "Checking if the built was successfull..."												| tee -a ${logpath}/${DATE}_${logfile}
echo "-----------------------------------------"											| tee -a ${logpath}/${DATE}_${logfile}
sleep 1;
flag_grep=`docker images | grep vWrkbl | awk '{print $1}' | grep lampros/`
if [ $? -eq 0 ] 
	then
	echo "-----------------------------------------"										| tee -a ${logpath}/${DATE}_${logfile}
	echo "The build of three images was successfull"										| tee -a ${logpath}/${DATE}_${logfile}
	echo "-----------------------------------------"										| tee -a ${logpath}/${DATE}_${logfile}
	sleep 1;
	echo "**********************"															| tee -a ${logpath}/${DATE}_${logfile}
	echo "Their names:"																		| tee -a ${logpath}/${DATE}_${logfile}
	echo "`docker images | grep vWrkbl | awk '{print $1}'`"									| tee -a ${logpath}/${DATE}_${logfile}
	sleep 1;		
	echo "Their IDs:"																		| tee -a ${logpath}/${DATE}_${logfile}
	echo "`docker images | grep vWrkbl | awk '{print $3}'`"									| tee -a ${logpath}/${DATE}_${logfile}
	echo "**********************"															| tee -a ${logpath}/${DATE}_${logfile}
else
	echo "The images seem not to have been built"											| tee -a ${logpath}/${DATE}_${logfile}
	echo "Please investigate..."															| tee -a ${logpath}/${DATE}_${logfile}
	exit 1
fi

sleep 1;
echo "The log of the procedure is under ${logpath}/${DATE}_${logfile}"						| tee -a ${logpath}/${DATE}_${logfile}
echo "Exiting... `date +%Y%m%d%H%M%S`"														| tee -a ${logpath}/${DATE}_${logfile}

exit 0
