'use strict'
const { produce } = require('@utils/kafkaProducer')

exports.kafkaProducers = {
	session: produce(process.env.KAFKA_SESSION_ELASTIC_TOPIC),
	provider: produce(process.env.KAFKA_PROVIDER_ELASTIC_TOPIC),
	fulfillment: produce(process.env.KAFKA_FULFILLMENT_ELASTIC_TOPIC),
	agent: produce(process.env.KAFKA_AGENT_ELASTIC_TOPIC),
}
