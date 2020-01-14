const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
    'mongodb+srv://devradar:omnistack@cluster0-imlgg.mongodb.net/devradar?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
);

require('./models/Dev.model');

app.use(express.json());
app.use('/', require('./routes'));

app.listen(3000, () => console.log('Servidor iniciado.'));
