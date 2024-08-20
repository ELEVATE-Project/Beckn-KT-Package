'use strict'

exports.agentTemplate = {
	person: {
		id: '{{mentor._id}}',
		name: '{{mentor.name}}',
		image: {
			url: '{{mentor.image}}',
		},
		gender: '{{mentor.gender}}',
	},
	rating: '{{mentor.rating.average}}',
}
