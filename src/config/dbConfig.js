const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://geada:1234@geadas.em0a1.mongodb.net/geada?retryWrites=true&w=majority', 
  {useNewUrlParser: true, useUnifiedTopology: true}
);
