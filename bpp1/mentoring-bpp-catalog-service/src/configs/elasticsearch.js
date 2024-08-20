'use strict'

const { Client } = require('@elastic/elasticsearch')

exports.client = new Client({
	node: process.env.ELASTIC_NODE,
})
