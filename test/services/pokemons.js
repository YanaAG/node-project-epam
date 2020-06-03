const PokemonsService = require('../../src/services/pokemons.service');
const pokemons = require('../../src/data/Pokemons');
const { expect } = require('chai');
const { stub } = require('sinon');

describe('Pokemons service', () => {
    let service, result, getAllStub, allPokemons;

    before(() => {
        service = PokemonsService;
        getAllStub = stub(service, 'getAll');
        allPokemons = pokemons;
    });

    after(() => {
        getAllStub.restore();

        process.exit(0);
    });

    it('getAll should return all pokemons', () => {
        getAllStub.returns(allPokemons);

        result = service.getAll();

        expect(result).to.eql(allPokemons);
    });
});
