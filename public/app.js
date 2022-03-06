const firebaseConfig = {
    apiKey: "AIzaSyB5HblIigjoIywArF3NGLwl_2P-vFJptI4",
    authDomain: "zum-pr0ject.firebaseapp.com",
    databaseURL: "https://zum-pr0ject-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "zum-pr0ject",
    storageBucket: "zum-pr0ject.appspot.com",
    messagingSenderId: "69901613837",
    appId: "1:69901613837:web:0e388a6ea02542d1864e44",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const username = prompt("Please Tell Us Your Name");

document.getElementById("message-form").addEventListener("submit", sendMessage);

function sendMessage(e) {
    e.preventDefault();

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // clear the input box
    messageInput.value = "";

    //auto scroll to bottom
    document
        .getElementById("messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
        username,
        message,
    });
}


const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${username === messages.username ? "sent" : "receive"
        }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
});