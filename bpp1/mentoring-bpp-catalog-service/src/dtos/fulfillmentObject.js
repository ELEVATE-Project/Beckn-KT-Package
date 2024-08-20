'use strict'

exports.fulfillmentObjectDTO = (fulfillment, agent) => {
	fulfillment.agent = agent
	delete fulfillment.agentId
	return fulfillment
}
