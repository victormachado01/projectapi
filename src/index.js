const express = require('express');
const bodyParser = require('body-parser');
const climaTempoHelper = require('./helpers/climaTempo')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())

app.get("/:city/:uf", async function(req, res){
  const { city, uf } = req.params;
  const data = await climaTempoHelper.getWeather(city, uf)
  res.status(200).json(data)
})

app.listen(8080);