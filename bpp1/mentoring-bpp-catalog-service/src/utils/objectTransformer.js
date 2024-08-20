'use strict'
const transform = require('json-to-json-transformer').transform
const { emptyFieldSanitizer } = require('@utils/emptyFieldSanitizer')

exports.objectTransformer = (templateObject, handlers) => async (inputObject) => {
	const outputObject = await transform(templateObject, inputObject, handlers)
	return emptyFieldSanitizer(outputObject)
}
