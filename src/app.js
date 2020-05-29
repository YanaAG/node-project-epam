const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');
const Pokemon = require('../src/models/Pokemon');
const pokemonsArray = require('../src/data/Pokemons');

const DB_URL = 'mongodb+srv://root:rootroot@cluster0-ru8wm.mongodb.net/NodeHomework?retryWrites=true&w=majority';

const app = express();
const port = 8080;

app.use(express.json());
app.use('/', router);

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    Pokemon.find({})
        .then(pokemons => {
           if (pokemons.length === 0) {
                Pokemon.insertMany(pokemonsArray)
                    .then(() => console.log('Pokemons were added'))
                    .catch(err => console.log(err.message));
           }
        })
        .catch(err => console.log(err.message));

    app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
});

module.exports = app;
