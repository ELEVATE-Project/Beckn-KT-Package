const express = require('express');
const { Kafka } = require('kafkajs');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3010;

const kafka = new Kafka({
	clientId: 'mentoring-sim',
	brokers: ['kafka:9092'],
});

const producer = kafka.producer();

function generateSessionTitle() {
	const prefixes = [
		'Mastering',
		'Introduction to',
		'Advanced Techniques in',
		'The Essentials of',
		'Getting Started with',
		'Exploring the Basics of',
	];
	const subjects = ['JavaScript', 'Project Management', 'Digital Marketing', 'Data Science', 'Machine Learning'];
	const suffixes = ['for Beginners', 'for Experts', 'for Small Businesses', 'for the 21st Century'];

	// Combine random elements from each array
	const prefix = faker.helpers.arrayElement(prefixes);
	const subject = faker.helpers.arrayElement(subjects);
	const suffix = faker.helpers.arrayElement(suffixes);

	return `${prefix} ${subject} ${suffix}`;
}

const categoriesOptions = [
	{ value: 'career_advice', label: 'Career Advice' },
	{ value: 'personal_development', label: 'Personal Development' },
	{ value: 'tech_skills', label: 'Tech Skills' },
];

const recommendedForOptions = [
	{ value: 'students', label: 'Students' },
	{ value: 'young_professionals', label: 'Young Professionals' },
	{ value: 'entrepreneurs', label: 'Entrepreneurs' },
];

function generateSession() {
	return {
		mentor: {
			_id: faker.datatype.uuid(),
			name: faker.name.fullName(),
			image: faker.image.avatar(),
			gender: faker.helpers.arrayElement(['male', 'female', 'other']),
			rating: {
				average: parseFloat(faker.finance.amount(0, 5, 1)),
			},
		},
		medium: [
			{
				label: faker.helpers.arrayElement(['Video Call', 'Chat', 'Phone Call']),
			},
		],
		timeZone: faker.address.timeZone(),
		startDateUtc: faker.date.future().toISOString(),
		endDateUtc: faker.date.future().toISOString(),
		organization: {
			_id: faker.datatype.uuid(),
			name: faker.company.name(),
			code: faker.random.alphaNumeric(5).toUpperCase(),
			description: faker.company.catchPhrase(),
		},
		_id: faker.datatype.uuid(),
		categories: [faker.helpers.arrayElement(categoriesOptions)],
		title: generateSessionTitle(),
		description: faker.lorem.sentences(2),
		image: faker.image.imageUrl(),
		recommendedFor: [faker.helpers.arrayElement(recommendedForOptions)],
	};
}

app.post('/create-session', async (req, res) => {
	try {
		const session = generateSession();
		console.log(session);

		await producer.send({
			topic: 'session',
			messages: [{ value: JSON.stringify(session) }],
		});

		console.log('Session sent to Kafka:', session);

		res.status(200).send({ message: 'Session created and sent to Kafka', session });
	} catch (error) {
		console.error('Error producing message:', error);
		res.status(500).send({ message: 'Error creating session', error });
	}
});

(async () => {
	await producer.connect();
	app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}`);
	});
})();

/* const session = generateSession();
console.log(session); */
