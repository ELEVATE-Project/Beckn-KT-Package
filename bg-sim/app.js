const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const urls = ['http://localhost:3001/endpoint1', 'http://localhost:3002/endpoint2', 'http://localhost:3003/endpoint3'];

app.post('/search', async (req, res) => {
	const requestBody = req.body;

	const requests = urls.map((url) => {
		return axios
			.post(url, requestBody)
			.then((response) => ({ url, status: response.status, data: response.data }))
			.catch((error) => ({ url, error: error.message }));
	});

	try {
		const responses = await Promise.all(requests);
		res.json({
			message: {
				ack: {
					status: 'ACK',
				},
			},
		});
	} catch (error) {
		res.status(500).json({
			error: {
				code: 'string',
				paths: 'string',
				message: 'string',
			},
		});
	}
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
