/*******************************************************************************
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
var monitor = function(http) {
    if (!http) return;
    var appmetrics = require('appmetrics').monitor();
    var io = require('socket.io')(http);

    var appmetricsData = {};
    var interval = 3000;

    //When a client connects, start emitting appmetrics data
    io.on('connection', function(socket) {

        appmetrics.on('cpu', function(cpu) {
            appmetricsData.cpu = cpu;
        });
        appmetrics.on('memory', function(memory) {
            appmetricsData.memory = memory;
        });
        appmetrics.on('eventloop', function(eventloop) {
            appmetricsData.eventloop = eventloop;
        });
        appmetrics.on('gc', function(gc) {
            appmetricsData.gc = gc;
        });
        appmetrics.on('http', function(httpevent) {
            appmetricsData.http = httpevent;
        });
        appmetrics.on('mongo', function(mongo) {
            appmetricsData.mongo = mongo;
        });
        appmetrics.on('mysql', function(mysql) {
            appmetricsData.mysql = mysql;
        });
        appmetrics.on('mqtt', function(mqtt) {
            appmetricsData.mqtt = mqtt;
        });
        appmetrics.on('mqlight', function(mqlight) {
            appmetricsData.mqlight = mqlight;
        });
        appmetrics.on('leveldown', function(leveldown) {
            appmetricsData.leveldown = leveldown;
        });
        appmetrics.on('redis', function(redis) {
            appmetricsData.redis = redis;
        });
        appmetrics.on('memcached', function(memcached) {
            appmetricsData.memcached = memcached;
        });
        appmetrics.on('oracledb', function(oracledb) {
            appmetricsData.oracledb = oracledb;
        });
        appmetrics.on('oracle', function(oracle) {
            appmetricsData.oracle = oracle;
        });
        appmetrics.on('strong-oracle', function(strongoracle) {
            appmetricsData.strongoracle = strongoracle;
        });
        appmetrics.on('postgres', function(postgres) {
            appmetricsData.postgres = postgres;
        });
        appmetrics.on('riak', function(riak) {
            appmetricsData.riak = riak;
        });

        //Send appmetrics data over socket io
        setInterval(function() {
            socket.emit('appmetrics-data', appmetricsData);
        },interval);

    });   
    return io;
}
exports.SocketIO = monitor;