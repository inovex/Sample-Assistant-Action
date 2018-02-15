const {DialogflowApp} = require('actions-on-google');
const actionMap = new Map();
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//http://www.aberwitzig.com/
const jokes = ["Was sagt ein Hai, nachdem es einen Surfer gefressen hat? Nett serviert, so mit Frühstücksbrettchen.",
    "Geht eine schwangere Frau in eine Bäckerei und sagt: Ich krieg ein Brot. Darauf der Bäcker: Sachen gibt's!",
    "Wie bringt man ein Walross dazu Selbstmord zu begehen? Man zeigt auf seine Brust und sagt 'Schau mal, du hast da was!'"];

exports.index = functions.https.onRequest(function (request, response) {
    const app = new DialogflowApp({request: request, response: response});
    actionMap.set('input.welcome', welcomeIntent);
    actionMap.set('input.anotherjoke', anotherJoke);
    app.handleRequest(actionMap);
});

function welcomeIntent(app) {
    app.ask("Willkommen zu Witze-Test! Hier ist dein erster Witz: " + getRandomJoke());
}

function anotherJoke(app) {
    let answer = app.getArgument("YesNoEntity");

    if (answer === "yes") {
        app.ask(getRandomJoke());
    } else {
        app.tell("Ich arbeite noch an meinem Humor. Bis Bald!");
    }
}

function getRandomJoke() {
    let joke = jokes[Math.floor((Math.random() * jokes.length))];
    return joke + " Möchtest du einen weiteren Witz hören?";
}
