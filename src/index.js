const express = require('express');
const bodyParser = require('body-parser');
const climaTempoHelper = require('./helpers/climaTempo')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())

app.listen(8080);