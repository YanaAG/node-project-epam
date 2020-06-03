const PokemonsService = require('../../src/services/pokemons.service');
const PokemonsApp = require('../../src/app');
const pokemons = require('../../src/data/Pokemons');
const { expect } = require('chai');
const { stub } = require('sinon');
const request = require('supertest');

describe('Pokemons router', () => {
    let app, service, user, agent, token, getCaughtPokemonsStub, caughtPokemons;

    before((done) => {
        app = PokemonsApp;
        service = PokemonsService;

        agent = request.agent(app);

        getCaughtPokemonsStub = stub(service, 'getCaughtPokemons');

        caughtPokemons = pokemons.filter((pokemon) => pokemon.caught === true);
        caughtPokemons.forEach(pokemon => pokemon.creationDate = pokemon.creationDate.toString());

        user = {
            'username': 'user',
            'password': '123456'
        };

        agent.post('/authenticate')
            .send(user)
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                token = res.text;

                done();
            });
    });

    after(() => {
        getCaughtPokemonsStub.restore();
    });

    it('GET /pokemons/caught should return all caught pokemons', (done) => {
        getCaughtPokemonsStub.returns(Promise.resolve(caughtPokemons));

        agent.get('/pokemons/caught')
            .set({'Authorization': `Bearer ${token}`})
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                expect(res.body).to.eql(caughtPokemons);

                done();
            });
    });
});
