const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.logTeamCreate = functions.firestore
    .document('teams/{teamUid}')
    .onCreate((snapshot, event) => {
        console.log(snapshot);
        console.log(event);

        console.log(event.params);
        console.log(event);
        console.log(event.eventType);


        /*if (true) {
            console.log(`${context.auth.uid} creates ${snapshot.data().uid} | ${snapshot.data().title} team`);
        } else {
            console.log(`some user creates ${snapshot.data().uid} | ${snapshot.data().title} team`);
        }*/
    });

exports.logTeamUpdate = functions.firestore
    .document('teams/{teamUid}')
    .onUpdate((change, context) => {
        console.log(`${context.auth.uid} updates team:`);
        console.log(`before:`);
        console.log(change.before);
        console.log(`after:`);
        console.log(change.after);
    });

exports.logTeamDelete = functions.firestore
    .document('teams/{teamUid}')
    .onDelete((snapshot, context) => {
        console.log(`${context.auth.uid} deletes ${snapshot.data().uid} | ${snapshot.data().title} team`);
    });


