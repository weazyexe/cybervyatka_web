const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firestore = require('@google-cloud/firestore');
const client = new firestore.v1.FirestoreAdminClient();

admin.initializeApp();
const bucket = 'gs://cybervyatka.appspot.com';

exports.logTeamCreate = functions.firestore
    .document('teams/{teamUid}')
    .onCreate((snapshot, event) => {
        console.log(`team created [${snapshot.data().uid} | ${snapshot.data().title}]`);
    });

exports.logTeamUpdate = functions.firestore
    .document('teams/{teamUid}')
    .onUpdate((change, context) => {
        console.log(`team [${change.before.data().uid} | ${change.before.data().title}] updated:`);
        console.log(`before:`);
        console.log(change.before.data());
        console.log(`after:`);
        console.log(change.after.data());
    });

exports.logTeamDelete = functions.firestore
    .document('teams/{teamUid}')
    .onDelete((snapshot, context) => {
        console.log(`team deleted [${snapshot.data().uid} | ${snapshot.data().title}]`);
    });




exports.logGameCreate = functions.firestore
    .document('games/{gameUid}')
    .onCreate((snapshot, event) => {
        // eslint-disable-next-line promise/always-return
        snapshot.data().team_first.get().then(teamFirstResponse => {
            let firstTeamTitle = teamFirstResponse.data().title;

            // eslint-disable-next-line promise/always-return
            snapshot.data().team_second.get().then(teamSecondResponse => {
                let secondTeamTitle = teamSecondResponse.data().title;

                console.log(`game created [${snapshot.data().uid} | ${firstTeamTitle} VS ${secondTeamTitle} | ${snapshot.data().datetime.toDate().toString()}]`);
            }).catch((err) => {
                console.log(`error getting second team ${err}`);
            });
        }).catch((err) => {
            console.log(`error getting first team ${err}`);
        });
    });

exports.logGameUpdate = functions.firestore
    .document('games/{gameUid}')
    .onUpdate((change, context) => {
        // eslint-disable-next-line promise/always-return
        change.before.data().team_first.get().then(teamFirstResponse => {
            let firstTeamTitle = teamFirstResponse.data().title;

            // eslint-disable-next-line promise/always-return
            change.before.data().team_second.get().then(teamSecondResponse => {
                let secondTeamTitle = teamSecondResponse.data().title;

                console.log(`game created [${snapshot.data().uid} | ${firstTeamTitle} VS ${secondTeamTitle} | ${snapshot.data().datetime.toDate().toString()}]`);
            }).catch(err => {
                console.log(`error to take team second BEFORE here: ${err}`);
            });
        }).catch(err => {
            console.log(`error to take team first BEFORE here: ${err}`);
        });

        // eslint-disable-next-line promise/always-return
        change.after.data().team_first.get().then(teamFirstResponse => {
            let firstTeamTitle = teamFirstResponse.data().title;

            // eslint-disable-next-line promise/always-return
            change.after.data().team_second.get().then(teamSecondResponse => {
                let secondTeamTitle = teamSecondResponse.data().title;

                console.log(`game created [${snapshot.data().uid} | ${firstTeamTitle} VS ${secondTeamTitle} | ${snapshot.data().datetime.toDate().toString()}]`);
            }).catch(err => {
                console.log(`error to take team second AFTER here: ${err}`);
            });
        }).catch(err => {
            console.log(`error to take team first AFTER here: ${err}`);
        });
    });

exports.logGameDelete = functions.firestore
    .document('games/{gameUid}')
    .onDelete((snapshot, context) => {
        // eslint-disable-next-line promise/always-return
        snapshot.data().team_first.get().then(teamFirstResponse => {
            let firstTeamTitle = teamFirstResponse.data().title;

            // eslint-disable-next-line promise/always-return
            snapshot.data().team_second.get().then(teamSecondResponse => {
                let secondTeamTitle = teamSecondResponse.data().title;

                console.log(`game deleted [${snapshot.data().uid} | ${firstTeamTitle} VS ${secondTeamTitle} | ${snapshot.data().datetime.toDate().toString()}]`);
            }).catch((err) => {
                console.log(`error getting deleted game second team ${err}`);
            });
        }).catch((err) => {
            console.log(`error getting deleted game first team ${err}`);
        });
    });




exports.scheduledFirestoreExport = functions.pubsub
    .schedule('every 24 hours')
    .onRun((context) => {
        const databaseName =
            client.databasePath(process.env.GCP_PROJECT, '(default)');

        return client.exportDocuments({
            name: databaseName,
            outputUriPrefix: bucket,
            // Leave collectionIds empty to export all collections
            // or set to a list of collection IDs to export,
            // collectionIds: ['users', 'posts']
            collectionIds: ['groups','playoff','teams','games','tournament','users']
        })
            .then(responses => {
                const response = responses[0];
                console.log(`Operation Name: ${response['name']}`);
                return response;
            })
            .catch(err => {
                console.error(err);
                throw new Error('Export operation failed');
            });
    });
