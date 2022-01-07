import { axios } from 'axios';

const GET_POKEMONS = 'GET_POKEMONS';

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data
        });
    };
};

