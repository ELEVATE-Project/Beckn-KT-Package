'use strict'
const { client } = require('@configs/elasticsearch')

const search = async (query) => {
	return await client.search({
		index: process.env.ELASTIC_AGENT_INDEX,
		query,
	})
}

const findById = async (id) => {
	return await client.get({ index: process.env.ELASTIC_AGENT_INDEX, id })
}

const findByName = async (agentName) => {
	try {
		const result = await search({
			match: {
				'person.name': agentName,
			},
		})
		return result
	} catch (err) {
		console.log(err)
	}
}

const agentQueries = { findById, findByName }

module.exports = agentQueries
