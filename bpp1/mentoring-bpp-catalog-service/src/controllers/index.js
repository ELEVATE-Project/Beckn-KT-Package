'use strict'
const searchService = require('@services/search')

exports.search = async (req, res) => {
	try {
		console.debug(JSON.stringify(req.body, null, '\t'))
		const catalog = await searchService.search(req.body)
		await res.status(200).send({ catalog })
	} catch (err) {
		console.log(err)
	}
}

exports.getFulfillment = async (req, res) => {
	try {
		const fulfillmentId = req.params.fulfillmentId
		console.log('fulfillment ID: ', fulfillmentId)
		const fulfillment = await searchService.getFulfillment(fulfillmentId)
		await res.status(200).send({ fulfillment })
	} catch (err) {
		console.log(err)
	}
}

exports.getSession = async (req, res) => {
	try {
		const sessionId = req.params.sessionId
		const getAllProtocolObjects = req.query.getAllComponents === 'true' ? true : false
		const session = await searchService.getSession(sessionId, getAllProtocolObjects)
		await res.status(200).send({ session })
	} catch (err) {
		console.log(err)
	}
}

exports.getStatusBody = async (req, res) => {
	try {
		const sessionId = req.params.sessionId
		const fulfillmentId = req.params.fulfillmentId
		if (!fulfillmentId || !sessionId) return res.status(400).send({ message: 'Missing Parameters' })
		let statusBody = await searchService.getStatusBody(sessionId, fulfillmentId)
		await res.status(200).send({ statusBody })
	} catch (err) {
		console.log(err)
	}
}
