const express = require('express');
const router = require('./src/routers/index.js');
const app = express();
const PORT = 5000;

require('dotenv').config();

app.use(express.json());

app.use('/api/v1', router);

app.get('/', (req, res) => {
	res.end('Hello World');
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}, http://localhost:${PORT}`));