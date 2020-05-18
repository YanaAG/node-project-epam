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
    return [
        {id: 1, name: 'Bulbasaur', damage: 15, creationDate: new Date('December 17, 2020'), caught: false},
        {id: 7, name: 'Squirtle', damage: 35, creationDate: new Date('December 10, 2020'), caught: true},
        {id: 182, name: 'Bellossom', damage: 50, creationDate: new Date('September 1, 2020'), caught: false},
    ];
}

function getCaughtPokemons() {
    return [
        {id: 32, name: 'Nidoran', damage: 45, creationDate: new Date('October 5, 2020'), caught: true},
        {id: 261, name: 'Poochyena', damage: 60, creationDate: new Date('September 15, 2020'), caught: true},
    ];
}

function getByName(pokemonName) {
    return {id: 0, name: pokemonName, damage: 0, creationDate: new Date('May 17, 2020'), caught: false};
}

function getById(pokemonId) {
    return {id: pokemonId, name: 'Pichu', damage: 40, creationDate: new Date('April 9, 2020'), caught: false};
}

function addPokemon(pokemon) {
    return {id: pokemon.id, name: pokemon.name, damage: pokemon.damage, creationDate: pokemon.creationDate, caught: pokemon.caught};
}

function updatePokemon(pokemon) {
    return {id: pokemon.id, name: pokemon.name, damage: pokemon.damage, creationDate: pokemon.creationDate, caught: pokemon.caught};
}

function deletePokemon(id) {
    return `Pokemon with id = ${id} was deleted`;
}

function caughtPokemon(pokemonId, pokemonCaught) {
    return {id: pokemonId, name: 'Noctowl', damage: 30, creationDate: new Date('April 21, 2020'), caught: pokemonCaught};
}
