'use strict'

const categoryIdExtractor = (categories) => categories.map((category) => category.value.replace(' ', '-'))
const { faker } = require('@faker-js/faker')
const aboutMentorCreator = () => {
	return faker.helpers.arrayElement(descriptions)
}
const professionalExperienceCreator = () => {
	return `${faker.helpers.arrayElement(titles)} | ${faker.helpers.arrayElement(
		positions
	)} - ${faker.helpers.arrayElement(companies)}`
}

const qualificationCreator = () => {
	return `${faker.helpers.arrayElement(degrees)} from ${faker.helpers.arrayElement(colleges)}`
}

const experienceCreator = () => {
	return `${faker.datatype.number({ min: 7, max: 30 })} Years`
}

const totalMeetingsCreator = () => {
	return `${faker.datatype.number({ min: 70, max: 150 })}+`
}

const specialistInCreator = () => {
	return `${faker.helpers.arrayElement(technologyExpertises)}`
}

const descriptions = [
	"With over 20 years of experience in their field, this mentor is a highly respected expert with a wealth of knowledge to share. They are always eager to help others learn and grow, and are known for their patient and supportive approach to mentorship. Whether you're just starting out in the industry or looking to take your skills to the next level, this mentor is an invaluable resource.",
	"This mentor has spent their entire career working in their field, developing a deep understanding of its complexities and nuances. They are a natural teacher, and take great pleasure in helping others develop their own expertise. Whether you're looking for guidance on a specific project or simply need someone to bounce ideas off of, this mentor is always available and ready to lend a helping hand.",
	'A true master of their craft, this mentor has spent decades honing their skills and building their knowledge base. They are a sought-after consultant and advisor, known for their ability to tackle even the most difficult challenges with ease. Despite their impressive credentials, they are warm and approachable, always happy to help those who are eager to learn.',
	'As a rising star in their industry, this mentor brings a fresh perspective and a wealth of new ideas to the table. They are deeply committed to helping others succeed, and are always on the lookout for opportunities to mentor and guide the next generation of professionals. With a blend of innovation and expertise, this mentor is a valuable asset to anyone looking to make their mark in their field.',
	"With a career spanning multiple decades, this mentor is a true veteran of their industry. They have seen it all, and have a wealth of stories and insights to share. They are passionate about passing on their knowledge and experience to others, and take great pride in helping others achieve their goals. Whether you're a newcomer to the industry or a seasoned pro, this mentor is an invaluable source of wisdom and guidance.",
	"This mentor is a true pioneer in their field, having helped to shape the industry in countless ways over the course of their career. They are highly respected for their expertise and leadership, and are always eager to share their insights with others. With a deep understanding of the industry's history and a keen eye for future trends, this mentor is a powerful ally for anyone looking to make their mark in this field.",
]

const titles = [
	'Lead Developer',
	'Chief Scientist',
	'Principal Engineer',
	'Innovation Strategist',
	'Senior Consultant',
	'Executive Director',
]

const positions = [
	'Co-Founder',
	'Director of R&D',
	'Senior Advisor',
	'Product Development Lead',
	'Technical Advisor',
	'Chief Innovation Officer',
]

const companies = [
	'CodeWave Solutions',
	'Quantum Insights, Inc.',
	'NexGen Innovations',
	'FutureTech Labs',
	'ThinkTank Solutions',
	'MindShift Consulting',
]

const degrees = ['B.Tech', 'M.Tech', 'M.E', 'MBA', 'Ph.D']

const colleges = [
	'IIT Delhi',
	'IIT Bombay',
	'IIT Madras',
	'IIT Kharagpur',
	'IIT Kanpur',
	'IISc Bangalore',
	'BITS Pilani',
	'NIT Trichy',
	'IIIT Hyderabad',
	'NID Ahmedabad',
]

const technologyExpertises = [
	'Frontend Development',
	'Backend Development',
	'Full Stack Development',
	'Mobile App Development',
	'Artificial Intelligence',
	'Machine Learning',
	'Data Science',
	'Cloud Computing',
	'DevOps',
	'Database Management',
	'Cybersecurity',
	'UI/UX Design',
]

exports.sessionHandlers = {
	categoryIdExtractor,
	aboutMentorCreator,
	professionalExperienceCreator,
	qualificationCreator,
	experienceCreator,
	totalMeetingsCreator,
	specialistInCreator,
}

exports.sessionTemplate = {
	id: '{{_id}}',
	categories: [
		'{{categories}}',
		{
			id: '{{value}}',
			descriptor: {
				name: '{{label}}',
				code: '{{value}}',
			},
		},
	],
	category_ids: '=> categoryIdExtractor(categories)', //Look for category_ids plural
	providerId: '{{organization._id}}',
	agentId: '{{mentor._id}}',
	descriptor: {
		name: '{{title}}',
		code: '{{title}}', //This needs modification
		short_desc: '{{description}}',
		long_desc: '{{description}}',
		images: [
			{
				url: '{{image}}',
			},
		],
	},
	fulfillment_ids: ['{{fulfillmentId}}'],
	price: {
		value: '0',
	},
	quantity: {
		allocated: {
			count: 10,
		},
		available: {
			count: 5,
		},
	},
	tags: [
		{
			display: true,
			descriptor: {
				code: 'recommended_for',
				name: 'recommended_for',
			},
			list: [
				'{{recommendedFor}}',
				{
					descriptor: {
						code: '{{value}}',
						name: '{{label}}',
					},
				},
			],
		},
		{
			display: true,
			descriptor: {
				code: 'about_mentor',
				name: 'About Mentor',
			},
			list: [
				{
					descriptor: {
						code: 'about_mentor',
						name: '=> aboutMentorCreator()',
					},
				},
			],
		},
		{
			display: true,
			descriptor: {
				code: 'professional_experience',
				name: 'Professional Experience',
			},
			list: [
				{
					descriptor: {
						code: 'professional_experience',
						name: '=> professionalExperienceCreator()',
					},
				},
			],
		},
		{
			display: true,
			descriptor: {
				code: 'qualification',
				name: 'Qualification',
			},
			list: [
				{
					descriptor: {
						code: 'qualification',
						name: '=> qualificationCreator()',
					},
				},
			],
		},
		{
			display: true,
			descriptor: {
				code: 'experience',
				name: 'Experience',
			},
			list: [
				{
					descriptor: {
						code: 'experience',
						name: '=> experienceCreator()',
					},
				},
			],
		},
		{
			display: true,
			descriptor: {
				code: 'total_meetings',
				name: 'Total Meetings',
			},
			list: [
				{
					descriptor: {
						code: 'total_meetings',
						name: '=> totalMeetingsCreator()',
					},
				},
			],
		},
		{
			display: true,
			descriptor: {
				code: 'specialist_in',
				name: 'Specialist In',
			},
			list: [
				{
					descriptor: {
						code: 'specialist_in',
						name: '=> specialistInCreator()',
					},
				},
			],
		},
	],
}
