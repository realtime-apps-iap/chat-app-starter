// import external dependencies
const niceware = require('niceware');   // library generating random passphrases
const moment = require('moment');       // library for dealing with dates and times
// import internal modules
const utils = require('./utils');
const classes = require('./classes');

const bind = function (wss) {
    // we'll create a users object to manage all the users currently on the ws server
    // the keys should be their unique usernames, and the values are the corresponding classes.User objects.
    const users = {};

    wss.on('connection', async function (ws, req) {
        // generate a unique 2-word passphrase, like interpretation-magnifying
        const username = niceware.generatePassphrase(4).join('-');

        // gets the IP address of the client device
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // get the country code of the client device from the ip address
        const country = await utils.getCountryCode(ip);

        // get the current unix time in seconds
        const timestamp = moment().unix();

        const user = new classes.User(ws, username, ip, country);
        users[username] = user;

        // STEP 1: When user client first connects to the websocket server:
        // -    Send user their user details (username and country code)
        // -    Update all users with the list of currently active users
        // -    Have send the welcome message to all active users with admin-bot as the sender.

        ws.on('message', async function (payload) {
            const timestamp = moment().unix();

            // STEP 2: When user client sends a message
            // -    Check the message for profanity (hint: look at utils.js)
            // -    If there is no profanity, have admin bot notify the user that the message was not sent
            // -    Else, send the welcome message to all active users with the user as the sender.

        });
    });


    // the disconnection event is fired when a user closes the websocket connection,
    // or when a users client does not respond to ping messages
    wss.on('disconnection', async function (ws) {

        // get the current unix time in seconds
        const timestamp = moment().unix();

        // get the user object corresponding to the disconnected websocket connection
        // and delete the user from the users object
        const user = Object.values(users).find((user) => user.ws == ws);
        delete users[user.username];


        // STEP 3: When user client disconnects from the websocket server:
        // -    Update all users with the list of currently active users
        // -    Have send the a message to all active users with admin-bot as the sender notifying the user has left the chat.
        // -    After this, proceed to STEP 4 in /public/js/index.js


        broadcast(null, JSON.stringify({
            type: "UPDATE_STATE",
            time: timestamp,
            state: { users: Object.values(users).map(user => user.visible) },
        }))

        broadcast(null, JSON.stringify({
            type: "ADMIN_MESSAGE",
            time: timestamp,
            text: `${user.username} has left the chat.`,
        }))
    });


    /**
     * Utility Function - Broadcasts text to all users except the sender
     * @param {classes.User} sender classes.Users object. null if message sent from admin.
     * @param {String} text message text.
     */
    const broadcast = function (sender, message) {
        Object.values(users).forEach((user) => {
            if (!sender || sender.ws != user.ws) {
                user.ws.send(message);
            }
        });
    }
};

module.exports = {
    bind,
}