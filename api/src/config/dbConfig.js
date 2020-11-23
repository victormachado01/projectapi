const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://geada:1234@geadas.em0a1.mongodb.net/geadas?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);