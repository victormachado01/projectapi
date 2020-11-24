const express = require('express');
const UserRoutes = require('../src/routes/user');
const WeatherRoutes = require('../src/routes/weather');
const CityRoutes = require('../src/routes/city');
const FarmRoutes = require('../src/routes/farm');

require("./config/dbConfig");
const User = require('./model/User');
const cors = require('cors');
const FarmModel = require('./model/FarmModel');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", UserRoutes);
app.use('/clima', WeatherRoutes);
app.use('/cidades', CityRoutes);
app.use('/fazendas', FarmRoutes);

// app.get("/", async function (req, res) {
//   User.find({}, function (err, documents) {
//     if (err) {
//       res.status(500).json({ err })
//     } else {
//       res.status(200).json(documents)
//     }
//   })
// });
app.listen(process.env.PORT ||8080 );