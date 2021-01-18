# Group Chat Application Starter Code

## Description
This is the starter code for a group chat application built using node.js and websockets.

The completed code can be found [here](https://github.com/realtime-apps-iap/chat-app)

A live demo of the working app can be found [here](https://rtwa-iap-chat-app.herokuapp.com/)

## Objectives
We want to build a group chat room with the following behaviour:

when a user enters the room:

- user is assigned a random username
- admin-bot sends a message to the everyone in group to welcome the user
- user is added to display of online users

when a user sends a message:

- run a profanity check on the sent message (think about the kids that might see it!)
- if there is no profanity, send the message to the group
- if there is profanity, admin-bot sends a message to the user notifying that the message was not sent.

when a user leaves the room (disconnection):

- admin-bot sends a message to the everyone in group to indicate that the user has left the room
- user is removed from display of online users

In addition, in the users display and the chat messages we also want:

- to display the user's origin country (which we find out by checking the IP addresses) alongside their username.
- to update the number of active users currently in the chat

## Instructions

This repository has the roughly following directory structure:

```
simple-server
|- node_modules
|- public // contains the front-end code
|- src // back-end code
|---- app.js // entry point into the app
|---- package.json
|---- readme.md
|---- ...
```

Most of the code has already been implemented for you, but do look around the repository to understand how the application works.

In particular, you will only need to modify the following 2 files to get a working app:
-   `public/js/index.js` for the front-end
-   `src/messaging.js` for the back-end

Before you start, remember to install the dependencies using `npm install` or `yarn`.

You can start the server using `node app.js`

Alternatively, to speed up development you can install `nodemon` globally, which will hot-reload the server whenever a change is detected in the source files.

You can install `nodemon` globalling using `npm install -g nodemon` or `yarn global add nodemon`

And then start the server using `nodemon app.js`


