# chat
chat client using node and socket.io

#Prerequisites
1. "npm install" && "bower install"
2. run "node app.js" in your terminal

#Steps:
1. 2 Successful auth via facebook (2 different users)
2. Click on any user from the users list on the right
3. Break the ice!

#Events:
1. "Connect" on init connection
2. "New User" after user signs in
3. "New message" sent to a user from a user

#Why did i choose:

1.Angular:  No particular reason but it eased many things:
  a. I am currently using it on day to day basis
  b. Two way binding will help if events like : "Message read", "Message state", user "Login/Logout" are fired.

2. Node: I had previously made a similar app in JAVA(Spring) and the configuration was very tough for the apps running on legacy servers and the support for WS was available beyond JAVA 7

3. SOCKET.io: nicely integrated with Node

4. Inline CSS and Extracting a few components in main.css : tried reusing as much as i could a keep the dom clean. still some css is there in it.


#Other enhancements that can be done:
1. Other meaningful events
2. Better UI.
3. Transfer of files
4. Group chat

