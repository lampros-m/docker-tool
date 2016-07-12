# Docker Management Tool
Docker Management Tool - Deployment and monitoring of a set of web services containers.

# Overview
This project has as a goal to to build a tool for managing the deployment and monitoring of a set of web services containers.   
For this Docker containers are used as also as Docker's Remote API.

The goal of the Project is to Build 3 different images containing each a unique web application  
 1. "Hellow World" (image - app) - A basic "Hello World" app    
 2. "Prime Numbers Generator" - An algorith for generating prime numbers (CPU usage)  
 3. "Memory Stretching" - An algorith for allocationg blocks of memeroy (RAM usage)  

As also as to execute the "Monitor Tool" with the below funcitonalities:  
  1. Create - Stop - Kill a running instance (container)  
  2. Monitor port rooting, parent image, CPU & Memory usage

#Installing
Make sure you have all the necessary files after having deploying the project to `root "/" folder`

    home/build.sh
    home/lampros/Documents/final/monitor_tool/chart.js
    home/lampros/Documents/final/monitor_tool/control.js
    home/lampros/Documents/final/monitor_tool/main.html
    home/lampros/Documents/final/monitor_tool/monitor_server.js
    home/lampros/Documents/final/monitor_tool/package_json
    home/lampros/Documents/final/monitor_tool/style.css
    home/lampros/Documents/memory_test/Dockerfile
    home/lampros/Documents/memory_test/package.json
    home/lampros/Documents/memory_test/server.js
    home/lampros/Documents/nu_node/Dockerfile
    home/lampros/Documents/nu_node/package.json
    home/lampros/Documents/nu_node/server.js
    home/lampros/Documents/prime_node/Dockerfile
    home/lampros/Documents/prime_node/package.json
    home/lampros/Documents/prime_node/server.js

The next step is to build the above 3 images

    cd /home
    ./build.sh
    
If everything is OK, the log should be fine. The throughout intallation logs with its timestamp is stored:

    /home/logs
    ls -ltr *_build_log.txt
    
After having the images build, we start the monitor tool

    cd /home/lampros/Documents/final/monitor_tool
    npm install .
    node monitor_server.js
    
If port 3000 is not available, we "vi" the monitor_server.js, altering:

    app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    });
    
Now, if the images have been built successfully and if the configuration of our tool is OK
we can access its GUI through

    localhost:3000
    
# Testing

Should return three images and three IDs:

    docker images | grep vWrkbl | awk '{print $1}'
    docker images | grep vWrkbl | awk '{print $3}'

Should open the GUI of monitor application:

    localhost:3000
    
The idea is about monitoring Containers who have different behaviour on resource allocating. 

So we create image "Hello World" with few resource demands
    
    Select "Hello World"  -> Create Container
    
We create image "CPU Load" with processing resource demands

    Select "CPU Load"  -> Create Container
    
We create image "Memory Load" with processing resource demands

    Select "Memory Load"  -> Create Container
    

After the creation of containers (as many as we want from any image) we observe the 

    Name of Container (generator from Docker)
    The image from wich is built
    An the IP which value is still NULL
    Status "Created"
    Minutes from its last status

The names of these containers are also accessible for checking typing

    docker ps -a

The Containers have been created but are not running, the status `Created` indicate that are initialized but they are not running.
So in order to start them we press Start

    Start
    
Now we see that there is allocation of a TCP port 

    example: 0.0.0.0:3503
    
This means that the private port of each contaier (8080) which we allocated when we created them is redirected to a public port

So for the specific container, the port from wich is accessible is the 3503

    example: localhost:3503
    
If we make some calls to these containers by their public port, we can recieve the results of the web apps they host as also as to monitor the values of CPU and memory they allocate while processing.

      example: make a call to a "CPU load conainer" and then monitor the CPU metrics
    
Also the tool can

    Stop, Kill, Restart 
    
any of the already existing containers and monitor the change of their values


