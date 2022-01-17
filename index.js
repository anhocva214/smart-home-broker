const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = 1883;
const wsPort = 3883;
const httpServer = require('http').createServer();
const ws = require('websocket-stream')
ws.createServer({server: httpServer}, aedes.handle)

// constants
const topicAuthorize = [
    '/nodejs/mqtt'
]

server.listen(port, function () {
    console.log(`MQTT Broker running on port: ${port}`);
});

httpServer.listen(wsPort, function () {
    console.log(`MQTT Broker WS running on port: ${wsPort}`);
})

// authenticate the connecting client
aedes.authenticate = (client, username, password, callback) => {
    password = Buffer.from(password, 'base64').toString();
    if (username === 'username' && password === 'password') {
        return callback(null, true);
    }
    const error = new Error('Authentication Failed!! Invalid user credentials.');
    console.log('Error ! Authentication failed.')
    return callback(error, false)
}

// authorizing client to publish on a message topic
aedes.authorizePublish = (client, packet, callback) => {
    if (topicAuthorize.indexOf(packet.topic) >= 0) {
        return callback(null);
    }
    console.log('Error ! Unauthorized publish to a topic.')
    return callback(new Error('You are not authorized to publish on this message topic.'));
}

// emitted when a client connects to the broker
aedes.on('client', function (client) {
    console.log(`[CLIENT_CONNECTED] Client ${(client ? client.id : client)} connected to broker ${aedes.id}`)
})

// emitted when a client subscribes to a message topic
aedes.on('subscribe', function (subscriptions, client) {
    console.log(`[TOPIC_SUBSCRIBED] Client ${(client ? client.id : client)} subscribed to topics: ${subscriptions.map(s => s.topic).join(',')} on broker ${aedes.id}`)
})
