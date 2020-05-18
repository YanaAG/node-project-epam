const express = require('express');

const app = express();
const port = 8080;
const router = require('./routes/router');

app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
