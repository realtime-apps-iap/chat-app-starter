// this script depends on utils.js
// import utils.js in the html file before this script.
const HOST = window.location.host;
const WS_URL = window.location.protocol == "https:" ? `wss://${HOST}/` : `ws://${HOST}/`;

const ws = new WebSocket(WS_URL);

// create a myUser object for convenience
let myUser = { username: "", country: "" };

// messageHandler is an event handler that is called
// when the WebSocket client fires a "message" event, and takes a MessageEvent as a parameter.
const messageHandler = function (e) {
    // STEP 4: write the message handler to modify the DOM
    // utility functions have already been provided for you 
    // in /public/js/utils.js and already loaded into the global scope in /public/index.html
    // - update myUser when the user first connects to the server, like in STEP 1.
    // - update the list of users whenever the server updates, as implemented in STEP 1 and STEP 3.
    // - display messages from other users
    // - display messages from admin-bot

    // the content of the message is in MessageEvent.data
    const msg = JSON.parse(e.data);

    // if (msg.type == "WELCOME") {
    //     myUser = msg.receiver;
    // }

    // if (msg.type == "UPDATE_STATE") {
    //     const users = msg.state.users;
    //     $('#user-count').html(users.length);
    //     clearUsers();
    //     users.forEach((user) => {
    //         if (user.username == myUser.username) {
    //             addUser({
    //                 username: `${myUser.username} (you)`,
    //                 country: myUser.country
    //             });
    //         }
    //         else {
    //             addUser(user);
    //         }
    //     })
    // }

    // if (msg.type == "ERROR" || msg.type == "ADMIN_MESSAGE") {
    //     addAdminMessage(msg);
    // }

    // if (msg.type == "USER_MESSAGE") {
    //     addUserMessage({
    //         username: msg.sender.username,
    //         country: msg.sender.country,
    //         text: msg.text,
    //         isUser: false,
    //     });
    // }
};

ws.addEventListener("message", messageHandler);

// listen to submit event on the form
$('form').submit(function (e) {
    // event.prevenDefault() prevents the page from reloading on form submission
    e.preventDefault();

    // get the text value from the input field, and clear it
    const text = $('form input').val();
    $('form')[0].reset();

    // do nothing if the text value is empty.
    if (!text) { return }


    // STEP 5: send the message with the text value to the server
    // ws.send(JSON.stringify({ text }));

    // STEP 6: display the message on the client side
    // addUserMessage({
    //     username: `${myUser.username} (you)`,
    //     country: myUser.country,
    //     text,
    //     isUser: true,
    // });
})
