const express = require('express');
const {Pokemon, Type} = require('../db');
const { getPokemonDetail, getAllPokemon } = require('./functions');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const {name} = req.query;
        if (name) {
            let poke = await getPokemonDetail(name);
            if (poke) {
                return res.status(200).send(poke);
            } else {
                return res.status(404).send('Pokemon not found');
            }
        }
        let pokemons = await getAllPokemon();
        return res.status(200).send(pokemons);
    } catch (e) {
        console.log(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        if(id) {
            let pokemonById = await getPokemonDetail(id);
            return res.status(200).send(pokemonById);
        } else {
            return res.status(404).send('Pokemon not found');
        }
    } catch (e) {
        console.log(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const {name, hp, attack, defense, speed, height, weight, img, types} = req.body;
        const pokemon = await Pokemon.create({
                name,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                img 
        });
    
        const typeDb = await Type.findAll({
            where: {
                name: types,
            }
        });
        pokemon.addType(typeDb);
        res.status(201).send(pokemon);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
