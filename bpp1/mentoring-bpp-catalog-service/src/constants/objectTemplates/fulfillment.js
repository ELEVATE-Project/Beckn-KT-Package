'use strict'

const languageExtractor = (medium) => medium.map((language) => language.label)

exports.fulfillmentHandlers = {
	languageExtractor,
}

exports.fulfillmentTemplate = {
	id: '{{fulfillmentId}}',
	type: 'ONLINE',
	language: '=> languageExtractor(medium)',
	agentId: '{{mentor._id}}',
	tags: [
		{
			display: false,
			descriptor: {
				code: 'status',
				name: 'status',
			},
			list: [
				{
					descriptor: {
						code: 'live',
						name: 'Live',
					},
				},
			],
		},
		{
			display: false,
			descriptor: {
				code: 'timeZone',
				name: 'timeZone',
			},
			list: [
				{
					descriptor: {
						code: '{{timeZone}}',
						name: '{{timeZone}}',
					},
				},
			],
		},
	],
	time: {
		label: 'Session Timing',
		range: {
			start: '{{startDateUtc}}',
			end: '{{endDateUtc}}',
		},
	},
}
