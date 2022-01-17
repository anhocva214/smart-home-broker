const mqtt = require('mqtt')


const host = '113.161.225.11'
const port = '3883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`


const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'username',
  password: 'password',
  reconnectPeriod: 1000,
})


const topic = '/nodejs/mqtt'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
  client.publish(topic, 'hello my friend', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})
client.on('message', (topic, payload) => {
  console.log('Received Message - client 2:', topic, payload.toString())
})