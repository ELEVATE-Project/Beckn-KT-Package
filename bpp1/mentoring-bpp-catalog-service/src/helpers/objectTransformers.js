'use strict'
const { objectTransformer } = require('@utils/objectTransformer')

const { sessionTemplate, sessionHandlers } = require('@constants/objectTemplates/session')
const { fulfillmentTemplate, fulfillmentHandlers } = require('@constants/objectTemplates/fulfillment')
const { providerTemplate } = require('@constants/objectTemplates/provider')
const { agentTemplate } = require('@constants/objectTemplates/agent')

exports.objectTransformers = {
	session: objectTransformer(sessionTemplate, sessionHandlers),
	agent: objectTransformer(agentTemplate),
	provider: objectTransformer(providerTemplate),
	fulfillment: objectTransformer(fulfillmentTemplate, fulfillmentHandlers),
}
