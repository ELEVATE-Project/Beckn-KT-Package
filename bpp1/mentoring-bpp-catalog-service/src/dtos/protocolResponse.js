'use strict'

const rfdc = require('rfdc')()
const { fulfillmentObjectDTO } = require('@dtos/fulfillmentObject')

exports.protocolResponseDTO = async (protocolObjects) => {
	const catalog = {}
	catalog.providers = []
	const addedCategories = new Set()
	protocolObjects.map(async (protocolObject) => {
		const fulfillment = await fulfillmentObjectDTO(protocolObject.fulfillment, protocolObject.agent)
		const session = protocolObject.session
		const categories = rfdc(session.categories)
		delete session.categories
		delete session.providerId
		delete session.agentId
		const selectedProvider = catalog.providers.find((provider) => provider.id === protocolObject.provider.id)
		if (!selectedProvider) {
			catalog.providers.push({
				categories,
				...protocolObject.provider,
				items: [{ ...session }],
				fulfillments: [{ ...fulfillment }],
			})
			categories.map((category) => {
				addedCategories.add(category.id)
			})
		} else {
			categories.map((category) => {
				if (!addedCategories.has(category.id)) {
					selectedProvider.categories.push(category)
				}
			})
			selectedProvider.items.push(session)
			selectedProvider.fulfillments.push(fulfillment)
		}
	})
	return catalog
}
