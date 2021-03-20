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

This repository has roughly the following directory structure:

```
simple-server
|- node_modules
|- public           // contains the front-end code
|- src              // back-end code
|---- app.js        // entry point into the app
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


## Message Schemas
Here are the message schemas used in this application. It is important that we stick to these schemas as they are not enforced by WebSockets.

### Client to Server Messages
**Message from user**
```json
{ "text" : "sometext" }
```

### Server to Client Messages
**Welcome message**
This message is used by the server to tell the client about the client's assigned username and country
```json
{
    "type": "WELCOME",
    "timestamp" : 1616239800,
    "receiver": {"username": "someuser", "country": "SG"}
}
```

**Update state message**
This message is used by the server to tell the client about the state of the chat room
```json
{
    "type": "UPDATE_STATE",
    "timestamp" : 1616239800,
    "state": {
        "users": [
            {"username": "someuser", "country": "SG"},
            {"username": "anotheruser", "country": "SG"},
            {"username": "someotheruser", "country": "US"}
        ]
    }
}
```

**Error message**
This message is used by the server to tell the client something went wrong
```json
{
    "type": "ERROR",
    "timestamp" : 1616239800,
    "message": "Something went wrong!"
}
```

**Admin message**
This message is used by the server to make announcements to the chatroom as an "admin-bot"
```json
{
    "type": "ADMIN_MESSAGE",
    "timestamp" : 1616239800,
    "message": "A new user has joined the room!"
}
```

**User message**
This message is used by the server to tell the client that another client (user) has sent a message to the chat room
```json
{
    "type": "USER_MESSAGE",
    "timestamp" : 1616239800,
    "message": "Everything I need is on the ground."
}
```


