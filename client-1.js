const mqtt = require('mqtt')


// const host = '113.161.225.11'
const host = 'localhost'
// const port = '3883'
const port =  '1883'
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
const dataSample = {
  "devID": "0",
  "status1": "OFF",
  "status2": "ON",
  "current1": "999.81",
  "current2": "28.81",
  "voltage1": "28.81",
  "voltage2": "28.81",
  "relay_warning1": "OFF",
  "relay_warning2": "OFF",
  "temperature_warning": "OFF",
  "temperature": "28.81",
  "dynamo_status": "ON",
  "wifi_status": "ON"
}
client.on('connect', () => {
  console.log('Connected')
  client.subscribe(['/get/type_data'], () => {
    console.log(`Subscribe to topic '/get/type_data'`)
  })
  // client.publish(topic, JSON.stringify(dataSample), { qos: 0, retain: false }, (error) => {
  //   if (error) {
  //     console.error(error)
  //   }
  // })
})
client.on('message', (topic, payload) => {
  console.log('Received Message', topic, payload.toString())
})