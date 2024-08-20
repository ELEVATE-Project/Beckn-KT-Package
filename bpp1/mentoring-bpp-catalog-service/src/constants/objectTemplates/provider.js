'use strict'

exports.providerTemplate = {
	id: '{{organization._id}}',
	descriptor: {
		name: '{{organization.name}}',
		code: '{{organization.code}}',
		short_desc: '{{organization.description}}',
	},
	rateable: false,
}
