const express = require('express');
const bodyParser = require('body-parser');
const climaTempoHelper = require('./helpers/climaTempo')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(8080);