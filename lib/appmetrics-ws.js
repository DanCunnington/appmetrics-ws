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

    //When a client connects, start emitting appmetrics data
    io.on('connection', function(socket) {

        appmetrics.on('cpu', function(cpu) {
            socket.emit('cpu',cpu);
        });
        appmetrics.on('memory', function(memory) {
            socket.emit('memory',memory);
        });
        appmetrics.on('eventloop', function(eventloop) {
            socket.emit('eventloop',eventloop);
        });
        appmetrics.on('gc', function(gc) {
            socket.emit('gc',gc);
        });
        appmetrics.on('http', function(httpevent) {
            socket.emit('http',httpevent);
        });
        appmetrics.on('socketio', function(socketio) {
            socket.emit('socketio',socketio);
        });
        appmetrics.on('mongo', function(mongo) {
            socket.emit('mongo',mongo);
        });
        appmetrics.on('mysql', function(mysql) {
            socket.emit('mysql',mysql);
        });
        appmetrics.on('mqtt', function(mqtt) {
            socket.emit('mqtt',mqtt);
        });
        appmetrics.on('mqlight', function(mqlight) {
            socket.emit('mqlight',mqlight);
        });
        appmetrics.on('leveldown', function(leveldown) {
            socket.emit('leveldown',leveldown);
        });
        appmetrics.on('redis', function(redis) {
            socket.emit('redis',redis);
        });
        appmetrics.on('memcached', function(memcached) {
            socket.emit('memcached',memcached);
        });
        appmetrics.on('oracledb', function(oracledb) {
            socket.emit('oracledb',oracledb);
        });
        appmetrics.on('oracle', function(oracle) {
            socket.emit('oracle',oracle);
        });
        appmetrics.on('strong-oracle', function(strongoracle) {
            socket.emit('strong-oracle',strongoracle);
        });
        appmetrics.on('postgres', function(postgres) {
            socket.emit('postgres',postgres);
        });
        appmetrics.on('riak', function(riak) {
            socket.emit('riak',riak);
        });
    });   
    return io;
}
exports.SocketIO = monitor;