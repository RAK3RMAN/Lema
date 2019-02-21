/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/config/checkConnect.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let mongodb = process.env.MONGODB || process.argv[3];
let ping = require('ping');
let cronJob = require('cron').CronJob;

//Devices will be monitored through Websockets

// Check Connections every 10 seconds
new cronJob('*/10 * * * * *', function() {
    var hosts = [mongodb];
    hosts.forEach(function(host) {
        ping.sys.probe(host, function(isAlive) {
            var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
            console.log(msg);
        });
    });
}, null, true, 'America/Chicago');