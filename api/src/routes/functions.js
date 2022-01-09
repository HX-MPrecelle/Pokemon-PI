const axios = require('axios');
const { Pokemon, Type } = require('../db'); 

//TRAIGO LOS DATOS DE LA API, HACIENDO OTRO LLAMADO A LA URL DEL POKEMON PARA QUE ME TRAIGA LOS DATOS NECESARIOS EN LA RUTA PRINCIPAL (NOMBRE, IMAGEN, TIPO).
const getApiInfo = async () => {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/';
        let pokemones = [];
        do {
            let info = await axios.get(url);
            let pokemonesApi = info.data;
            let auxPokemones = pokemonesApi.results.map(e => {
                return {
                    name: e.name,
                    url: e.url,
                }
            })
            pokemones.push(...auxPokemones);
            url = pokemonesApi.next;
        } while (url != null && pokemones.length < 40); //ACA PUEDO LIMITARLOS A LOS QUE QUIERA TRAER
        // console.log(pokemones);
        let pokesWithData = await Promise.all(pokemones.map(async e => {
            let pokemon = await axios.get(e.url);
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                img: pokemon.data.sprites.front_default,
                types: pokemon.data.types.map(e => e.type.name),
            }
        }));
        // console.log(pokesWithData);
        return pokesWithData;
    } catch (e) {
        console.log(e);
    }
}

//TRAIGO AL POKEMON ESPECIFICADO POR PARAMS (ID) DESDE LA API CON TODOS SUS DATOS NECESARIO PARA LA RUTA DE DETALLE.
async function getPokemonById(id) {
    try {
        const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await apiData.data;
        const pokemonData = {
            id: data.id,
            name: data.name,
            img: data.sprites.front_default,
            types: data.types.map(e => e.type.name),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
        };
        return pokemonData;
    } catch (e) {
        console.log(e);
    }
}


//TRAIGO TODOS LOS POKEMONES CREADOS DESDE LA BASE DE DATOS EN LA TABLA POKEMON, Y QUE INCLUYA LA TABLA TYPE CON SU ATRIBUTO NAME.
const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

//TRAIGO TODOS LOS POKEMONES, TANTO DE LA API COMO DE LA DB.
const getAllPokemon = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allPokemon = apiInfo.concat(dbInfo);
    return allPokemon;
}

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllPokemon,
    getPokemonById
}
