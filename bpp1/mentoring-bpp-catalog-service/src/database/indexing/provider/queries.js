'use strict'
const { client } = require('@configs/elasticsearch')

const findById = async (id) => {
	return await client.get({ index: process.env.ELASTIC_PROVIDER_INDEX, id })
}

const providerQueries = { findById }

module.exports = providerQueries
