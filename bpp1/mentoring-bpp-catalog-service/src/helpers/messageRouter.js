'use strict'
const messageHandlers = require('@services/messageHandlers')

exports.messageRouter = (topic, value) => {
	try {
		if (topic === process.env.KAFKA_SESSION_TOPIC) messageHandlers.sessionCreation(value)
	} catch (err) {
		console.log('Error At ConsumerMessageRouter: ', err)
	}
}
