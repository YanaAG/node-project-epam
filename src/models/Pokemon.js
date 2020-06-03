const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const pokemonSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    damage: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    caught: {
        type: Boolean,
        required: true
    },
});

const Pokemon = model('Pokemon', pokemonSchema);

module.exports = Pokemon;
