/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/sys_funct/checkConnect.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
var cronJob = require('cron').CronJob;
var MongoClient = require('mongodb').MongoClient;
var dataStore = require('data-store');
var storage = new dataStore({ path: './config/sysConfig.json' });

//Devices will be monitored through Websockets

// Check Connections every 10 seconds
// new cronJob('*/10 * * * * *', function() {
//     MongoClient.connect(storage.get('mongodb_url'), function(err, db) {
//         if (err) {
//             //return console.dir(err);
//             //console.log('We are disconnected');
//         } else {
//         	//console.log('We are connected');
//         }
//     });
// }, null, true, 'America/Chicago');