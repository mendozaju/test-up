'use strict'

const execServer = require('child_process').exec;
const execCrone = require('child_process').exec;

const nightWatchCommand = 'node cron/index.js';
const cronCommand = 'node cron/index.js';

/*
console.log('Arranca server ..');

execServer(nightWatchCommand, function (error, stdout, stderr) {
    console.log(stdout);
});
*/


console.log('Arranca cron..');
execCrone(cronCommand, function (error, stdout, stderr) {
    console.log(stdout);
    console.log(error);
    console.log(stderr);
});