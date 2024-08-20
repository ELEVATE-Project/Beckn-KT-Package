'use strict'
const sessionQueries = require('@database/indexing/session/queries')
const agentQueries = require('@database/indexing/agent/queries')
const { getprotocolObjectsFromSessions, getStatusObjectsFromSession } = require('@helpers/sessionsToProtocolObjects')
const { getFulfillmentAndAgentObjects } = require('@helpers/fulfillmentAndAgentObjects')
const { protocolResponseDTO } = require('@dtos/protocolResponse')
const { fulfillmentObjectDTO } = require('@dtos/fulfillmentObject')
const { getCount, getDocs, getSourceObject, flattenArrayOfArrays } = require('@utils/generic')

const searchByPersonName = async (requestBody) => {
	const personName = requestBody.intent.agent.person.name
	const result = await agentQueries.findByName(personName)
	if (!getCount(result)) return null
	const agentDocs = getDocs(result)
	const sessionsArray = await Promise.all(
		agentDocs.map(async (agentDoc) => {
			const agent = getSourceObject(agentDoc)
			const sessionsResult = await sessionQueries.findByAgentId(agent.person.id)
			if (!getCount(sessionsResult)) return []
			else return getDocs(sessionsResult)
		})
	)
	return await flattenArrayOfArrays(sessionsArray)
}

exports.search = async (requestBody) => {
	let sessionDocs
	if (requestBody.intent.item?.descriptor?.name) {
		const sessionName = requestBody.intent.item.descriptor.name
		const result = await sessionQueries.findByName(sessionName)
		if (!getCount(result)) return null
		sessionDocs = getDocs(result)
	} else if (requestBody.intent.agent?.person?.name) {
		sessionDocs = await searchByPersonName(requestBody)
	}
	const protocolObjects = sessionDocs ? await getprotocolObjectsFromSessions(sessionDocs) : null
	//Handle these cases where any of the elasticsearch results can turn up empty.
	return await protocolResponseDTO(protocolObjects)
}

exports.getFulfillment = async (fulfillmentId) => {
	const { fulfillment, agent } = await getFulfillmentAndAgentObjects(fulfillmentId)
	return await fulfillmentObjectDTO(fulfillment, agent)
}

exports.getSession = async (sessionId, getAllProtocolObjects) => {
	const sessionDoc = await sessionQueries.findById(sessionId)
	if (!sessionDoc.found) return null
	if (!getAllProtocolObjects) return getSourceObject(sessionDoc)
	const protocolObjects = await getprotocolObjectsFromSessions([sessionDoc])
	console.log(protocolObjects)
	return await protocolResponseDTO(protocolObjects)
}

exports.getStatusBody = async (sessionId, fulfillmentId) => {
	try {
		const sessionDoc = await sessionQueries.findById(sessionId)
		if (!sessionDoc.found) return null
		const statusObjects = await getStatusObjectsFromSession(sessionDoc, fulfillmentId)
		return await protocolResponseDTO([statusObjects])
	} catch (err) {
		console.log(err)
	}
}
