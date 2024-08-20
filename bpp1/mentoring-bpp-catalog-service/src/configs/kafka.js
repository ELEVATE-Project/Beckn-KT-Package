'use strict'
const { Kafka } = require('kafkajs')
const kafkaClient = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: process.env.KAFKA_BROKERS.split(','),
	connectionTimeout: 60000,
	retry: {
		initialRetryTime: 1000,
		retries: 8,
	},
})

const consumer = kafkaClient.consumer({ groupId: process.env.KAFKA_CLIENT_ID })
consumer.on('consumer.connect', () => console.log('Kafka Consumer Connected'))
consumer.on('consumer.disconnect', () => console.log('Kafka Consumer Disconnected'))
//consumer.on('consumer.network.request', (request) => console.log('Kafka Consumer Request: ', request))

const producer = kafkaClient.producer()

producer.on('producer.connect', () => console.log('Kafka Producer Connected'))
producer.on('producer.disconnect', () => console.log('Kafka Producer Disconnected'))

module.exports = { consumer, producer }
