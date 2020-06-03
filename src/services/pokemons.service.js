const Pokemon = require('../models/Pokemon');

module.exports = {
    getAll,
    getCaughtPokemons,
    getByName,
    getById,
    addPokemon,
    updatePokemon,
    deletePokemon,
    caughtPokemon
};

function getAll() {
    return Pokemon.find({});
}

function getCaughtPokemons() {
    return Pokemon.find({
        caught: true
    });
}

function getByName(pokemonName) {
    return Pokemon.findOne({
        name: pokemonName
    });
}

function getById(pokemonId) {
    return Pokemon.findById(pokemonId);
}

function addPokemon(pokemon) {
   return Pokemon.create(pokemon);
}

function updatePokemon(pokemon) {
    return Pokemon.findByIdAndUpdate(pokemon.id, {
        name: pokemon.name,
        damage: pokemon.damage,
        creationDate: pokemon.creationDate,
        caught: pokemon.caught
    }, {new: true, omitUndefined: true});
}

function deletePokemon(pokemonId) {
    return Pokemon.findByIdAndRemove(pokemonId);
}

function caughtPokemon(pokemonId, pokemonCaught) {
    return Pokemon.findByIdAndUpdate(pokemonId, {caught: pokemonCaught}, {new: true});
}
