'use strict'
const { client } = require('@configs/elasticsearch')

const findById = async (id) => {
	return await client.get({ index: process.env.ELASTIC_FULFILLMENT_INDEX, id })
}

const fulfillmentQueries = { findById }

module.exports = fulfillmentQueries
