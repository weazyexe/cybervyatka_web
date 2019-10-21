const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firestore = require('@google-cloud/firestore');
const client = new firestore.v1.FirestoreAdminClient();
const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailer-config');
const qrcode = require('qrcode');

let transporter = nodemailer.createTransport(nodemailerConfig.config);

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


exports.sendQrCodeEmail = functions.firestore
    .document('viewers/{viewerId}')
    .onCreate(async (snapshot, context) => {

        let img = await qrcode.toDataURL(snapshot.data().uid, { color: {
                dark: '#fff',
                light: '#212121'
            },
            width: 800
        });

        const dest = snapshot.data().email;

        console.log(snapshot.data());

        const mailOptions = {
            from: `${nodemailerConfig.config.auth.name} <${nodemailerConfig.config.auth.user}>`,
            to: dest,
            attachments: [
                {
                    filename: 'qr-code.jpg',
                    content: img.toString().split("base64,")[1],
                    encoding: 'base64'
                }
            ],
            subject: 'Подтверждение',
            html: `<div style="background-color: #212121; font-family: 'Roboto', sans-serif; font-size: 1.3em;">

                
                <div style="margin-left: 20%; margin-right: 20%">
                    <div style="text-align: center">
                        <img src="https://cybervyatka.ru/img/logo_clear.2edc8846.png" alt="Cybervyatka Logo" style="width: 8em; height: 8em; margin-left: auto; margin-right: auto; display: inline-block; margin-top: 5em"/>
                    </div>
                        
                    <div style="color: #FAFAFA">
                        <p style="font-size: 1.5em"><b>Здравствуйте, ${snapshot.data().name}!</b></p>
                        
                        <p style="color: #fafafa">Поздравляем! Ваша заявка зрителя <strong style="color: #71de6f">подтверждена</strong>! Если у Вас остались какие-либо вопросы - пишите в сообщения <a href="https://vk.com/cybervyatka" style="text-decoration: none; color: #D68956; font-weight: bold">нашего сообщества ВКонтакте.</a></p>
                        <p style="color: #fafafa">Ваш QR-код прикреплён к письму файлом.</p>
                        
                        
                        <p style="margin-top: 4em; color: #fafafa">С уважением,</p>
                        <p style="margin-top: -2em; padding-bottom: 5em; color: #fafafa">команда турнира <b style="color: #D68956">CYBERVYATKA</b>.</p>
                        
                    </div>
                </div>

                
            </div>`
        };

        // returning result
        await transporter.sendMail(mailOptions);
        qrcode.toDataURL
        console.log(`message to ${dest} sent`);
    });
