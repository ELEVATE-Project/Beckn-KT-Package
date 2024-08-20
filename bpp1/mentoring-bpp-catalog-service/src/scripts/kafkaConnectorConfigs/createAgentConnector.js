'use strict'
const axios = require('axios')
require('dotenv').config({ path: '../../.env' })

const data = JSON.stringify({
	'connector.class': 'io.confluent.connect.elasticsearch.ElasticsearchSinkConnector',
	'connection.url': process.env.ELASTIC_NODE,
	'key.ignore': false,
	'schema.ignore': 'true',
	'write.method': 'UPSERT',
	topics: process.env.KAFKA_AGENT_ELASTIC_TOPIC,
	'type.name': 'doc',
	'value.converter.schemas.enable': 'false',
	'key.converter': 'org.apache.kafka.connect.storage.StringConverter',
	'value.converter': 'org.apache.kafka.connect.json.JsonConverter',
	index: process.env.ELASTIC_AGENT_INDEX,
})

const config = {
	method: 'put',
	url: `${process.env.KAFKA_CONNECT_URI}/connectors/${process.env.KAFKA_CONNECT_AGENT_CONNECTOR}/config`,
	headers: {
		'Content-Type': 'application/json',
	},
	data: data,
}

axios(config)
	.then(function (response) {
		console.log(JSON.stringify(response.data, null, 2))
	})
	.catch(function (error) {
		console.log(error)
	})
