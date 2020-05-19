const { Router } = require('express');
const PokemonsService = require('../services/pokemons.service');

const pokemons = Router();

pokemons.get('/', (req, res) => {
    const { pokemonName } = req.query;

    if (pokemonName) {
        res.send(PokemonsService.getByName(pokemonName));
    } else {
        res.send(PokemonsService.getAll());
    }
});

pokemons.get('/caught', (req, res) => {
    res.send(PokemonsService.getCaughtPokemons());
});

pokemons.get('/:id', (req, res) => {
    const { id } = req.params;

    res.send(PokemonsService.getById(id));
});

pokemons.post('/:id', (req, res) => {
    const { id } = req.params;
    const { name, damage, creationDate, caught } = req.body;

    res.send(PokemonsService.addPokemon({id: id, name: name, damage: damage, creationDate: creationDate, caught: caught}));
});

pokemons.put('/:id', (req, res) => {
   const { id } = req.params;
   const { isCaught } = req.query;
   const { name, damage, creationDate, caught } = req.body;

   if (isCaught) {
       res.send(PokemonsService.caughtPokemon(id, isCaught));
   } else {
       res.send(PokemonsService.updatePokemon({id: id, name: name, damage: damage, creationDate: creationDate, caught: caught}));
   }
});

pokemons.delete('/:id', (req,res) => {
   const { id } = req.params;

   res.send(PokemonsService.deletePokemon(id));
});

module.exports = pokemons;
