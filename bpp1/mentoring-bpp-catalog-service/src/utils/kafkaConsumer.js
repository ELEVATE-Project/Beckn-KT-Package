'use strict'
const { consumer } = require('@configs/kafka')
const { messageRouter } = require('@helpers/messageRouter')

exports.initialize = async () => {
	try {
		await consumer.connect()
		await consumer.subscribe({ topics: [process.env.KAFKA_SESSION_TOPIC] })
		await consumer.run({
			eachMessage: async ({ topic, message }) => {
				console.log('CONSUMER KEY: ', message.key)
				const value = JSON.parse(message.value)
				console.log('CONSUMER VALUE: ', value)
				console.log('CONSUMER TOPIC: ', topic)
				messageRouter(topic, value)
			},
		})
	} catch (err) {
		console.log(err)
	}
}
