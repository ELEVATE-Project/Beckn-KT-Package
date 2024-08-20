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

function generateSession() {
	const session = {
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
		categories: [
			{
				value: faker.helpers.arrayElement(['career_advice', 'personal_development', 'tech_skills']),
				label: faker.helpers.arrayElement(['Career Advice', 'Personal Development', 'Tech Skills']),
			},
		],
		title: faker.company.bsBuzz(),
		description: faker.lorem.sentences(2),
		image: faker.image.imageUrl(),
		recommendedFor: [
			{
				value: faker.helpers.arrayElement(['students', 'young_professionals', 'entrepreneurs']),
				label: faker.helpers.arrayElement(['Students', 'Young Professionals', 'Entrepreneurs']),
			},
		],
	};

	return session;
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
