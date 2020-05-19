const { Router } = require('express');

const router = Router();
const pokemons = require('../routes/pokemons');

router.use('/pokemons', pokemons);

module.exports = router;
