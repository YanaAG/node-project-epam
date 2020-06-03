const { Router } = require('express');
const PokemonsService = require('../services/pokemons.service');

const pokemons = Router();

pokemons.get('/', (req, res) => {
    const { pokemonName } = req.query;

    if (pokemonName) {
        PokemonsService.getByName(pokemonName)
            .then(pokemon => pokemon ? res.send(pokemon) : res.send(`Pokemon with name '${pokemonName}' was not found`))
            .catch(err => res.send(err.message));
    }
    else {
        PokemonsService.getAll()
            .then(pokemons => pokemons.length === 0 ? res.send('No pokemons') : res.send(pokemons))
            .catch(err => res.send(err.message));
    }
});

pokemons.get('/caught', (req, res) => {
    PokemonsService.getCaughtPokemons()
        .then(pokemons => pokemons.length === 0 ? res.send('No caught pokemons') : res.send(pokemons))
        .catch(err => res.send(err.message));
});

pokemons.get('/:id', (req, res) => {
    const { id } = req.params;

    PokemonsService.getById(id)
        .then(pokemon => res.send(pokemon))
        .catch(err => res.send(err.message));
});

pokemons.post('/', (req, res) => {
    const { name, damage, creationDate, caught } = req.body;

    PokemonsService.addPokemon({name: name, damage: damage, creationDate: creationDate, caught: caught})
        .then(pokemon => res.send(pokemon))
        .catch(err => res.send(err.message));
});

pokemons.put('/:id', (req, res) => {
   const { id } = req.params;
   const { isCaught } = req.query;
   const { name, damage, creationDate, caught } = req.body;

   if (isCaught) {
       PokemonsService.caughtPokemon(id, isCaught)
           .then(pokemon => res.send(pokemon))
           .catch(err => res.send(err.message));
   } else {
       PokemonsService.updatePokemon({id: id, name: name, damage: damage, creationDate: creationDate, caught: caught})
           .then(pokemon => res.send(pokemon))
           .catch(err => res.send(err.message));
   }
});

pokemons.delete('/:id', (req, res) => {
   const { id } = req.params;

   PokemonsService.deletePokemon(id)
       .then(pokemon => res.send(pokemon))
       .catch(err => res.send(err.message));
});

module.exports = pokemons;
