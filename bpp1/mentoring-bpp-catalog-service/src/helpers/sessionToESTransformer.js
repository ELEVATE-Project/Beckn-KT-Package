'use strict'
const { objectTransformers } = require('@helpers/objectTransformers')

exports.sessionToESTransformer = async (sessionObject) => {
	const agent = await objectTransformers.agent(sessionObject)
	const fulfillment = await objectTransformers.fulfillment(sessionObject)
	const session = await objectTransformers.session(sessionObject)
	const provider = await objectTransformers.provider(sessionObject)
	return { agent, fulfillment, session, provider }
}
