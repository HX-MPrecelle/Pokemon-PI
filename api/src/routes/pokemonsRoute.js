const express = require('express');
const {Pokemon} = require('../db');
const { getPokemonById, getAllPokemon } = require('./functions');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const {name} = req.query;
        let pokemons = await getAllPokemon();
        if (name) {
            let pokemonDataComp = [];
            let pokemonName = pokemons.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if (pokemonName.length) {
                for (const pokemon of pokemonName) {
                    let pokemonNameData = await getPokemonById(pokemon.id);
                    pokemonDataComp.push(pokemonNameData);
                }
                return res.status(200).send(pokemonDataComp);
            } else {
                return res.status(404).send('No se encontró el pokemón');
            }
        } 
        return res.status(200).send(pokemons);
    } catch (e) {
        console.log(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        if(id) {
            let pokemons = await getAllPokemon();
            let pokemonFind = pokemons.find(e => e.id == id);
            // console.log(pokemonFind);
            if (pokemonFind) {
                let pokemonById = await getPokemonById(pokemonFind.id);
                return res.status(200).send(pokemonById);
            } else {
                return res.status(404).send('No se encontró el pokemón');
            }
        }
    } catch (e) {
        console.log(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const {name, hp, attack, defense, speed, height, weight, typeName} = req.body;
        const pokemon = await Pokemon.create({
                name,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
        });
    
        const typeDb = await Type.findAll({
            where: {
                name: typeName,
            }
        });
        pokemon.addType(typeDb);
        res.status(200).send('Pokemón agregado con éxito');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
