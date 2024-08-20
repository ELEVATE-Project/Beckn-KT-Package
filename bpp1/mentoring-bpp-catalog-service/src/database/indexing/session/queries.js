'use strict'
const { client } = require('@configs/elasticsearch')

const search = async (query) => {
	return await client.search({
		index: process.env.ELASTIC_SESSION_INDEX,
		query,
		from: 0,
		size: 20,
	})
}

const findById = async (id) => {
	return await client.get({ index: process.env.ELASTIC_SESSION_INDEX, id })
}

const findByName = async (sessionName) => {
	try {
		return await search({
			match: {
				'descriptor.name': sessionName,
			},
		})
	} catch (err) {
		console.log(err)
	}
}

const findByAgentId = async (agentId) => {
	try {
		return await search({
			match: {
				agentId: agentId,
			},
		})
	} catch (err) {
		console.log(err)
	}
}

const sessionQueries = { findById, findByName, findByAgentId }

module.exports = sessionQueries
