# Embedded Security Cam
This project implements a security camera with motion detection recording via Motion. It includes the ability to move the camera with servos and livestream video directly to a phone using Blynk (for security purposes, the streaming is toggleable). It can also send email notifications through ifttt, which can also be toggled via Blynk.

## Requirements
The installation of this project uses npm, so that must be installed. Additionally, node.js version 8.10 or greater is required (this may not be the earliest version that works, but it's the earliest that's been tested).

## Installation
To install, run install.sh to install the requisite libraries.

## Getting Started
Next you'll need to create a Blynk app and set up an ifttt application. There are tutorials for each online, and both are free (you'll need to make an account). Ifttt is used for notifications, and uses webhooks as the trigger for the event (I used it to trigger emails with gmail). The Blynk app is used to control the program. For full functionality, you will need to add the following widgets: Video Streaming, Joystick, and 4 buttons (don't worry, you shouldn't have to buy more energy).  
The first button turns on and off Motion, and should be connected to virtual pin 0.  
The second button turns on and off video streaming, and is connected to virtual pin 1.  
The third button turns on ifttt notifications, and is connected to virtual pin 2.
The fourth button filters the events that cause ifttt notifications (usually one movement caused multiple triggers), and is connected to virtual pin 3.  
All 4 buttons should be set to be switches.  
The video streaming widget should be set to the system's IP address, port 8081 (format: xxx.xxx.xxx.xxx:8081)  
Finally, the Joystick should be set to virtual pins 4 and 5.  

Next, the program has to be authorized for Blynk and ifttt. The Blynk authentification key (sent via email) should be copied into the 'AUTH' variable. The ifttt key (found in settings) should be copied into the 'key' variable.

Now it should be ready to go, just make sure the system is connected to the internet, run the code with './security.js' (without the quotes), and you should see the device go online in the blynk app.

One known bug is that the video streaming widget might not refresh when video streaming is turned on, but you can force it to refresh by stopping the blynk project (in the app) and starting it again.
