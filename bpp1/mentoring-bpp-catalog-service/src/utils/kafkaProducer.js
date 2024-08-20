'use strict'
const { producer } = require('@configs/kafka')

//producer.on('producer.network.request', (request) => console.log('Producer Request: ', request))

exports.produce = (topic) => async (key, value) => {
	try {
		console.log('PRODUCER KEY: ', key)
		console.log('PRODUCER TOPIC: ', topic)
		console.log('PRODUCER DATA: ', JSON.stringify(value, null, 4))
		const res = await producer.send({
			topic,
			messages: [
				{
					key: key,
					value: JSON.stringify(value),
				},
			],
		})
		console.log(`${topic.toUpperCase()} Enqueued`)
		return res
	} catch (err) {
		console.error(err)
	}
}

exports.initialize = () =>
	producer.connect().catch((error) => console.log('Kafka Producer Initialization Error: ', error))
