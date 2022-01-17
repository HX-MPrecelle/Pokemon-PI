/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {

  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));

  describe('GET /pokemons', () => {
    it('should get 200', (done) => {
      agent.get('/pokemons').expect(200);
      done();
    }).timeout(5000);
  });

  describe('GET /pokemons/:id', () => {
    it('should get 200', (done) => {
      agent.get('/pokemons:id').expect(200);
      done();
    }).timeout(2000);
  });

  describe('POST /pokemons', () => {
    it('should get 200', (done) => {
      agent.post('/pokemons')
      .send({
        name: 'Zaraza',
        hp: '100',
        attack: '120',
        defense: '55',
        speed: '97',
        height: '126',
        weight: '55',
        img: 'https://w7.pngwing.com/pngs/801/726/png-transparent-pokemon-pokeball-nintendo-ball-thumbnail.png'
      })
      .expect(200);
      done();
    }).timeout(3000);
  })
});
