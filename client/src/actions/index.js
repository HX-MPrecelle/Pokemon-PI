import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';

export const getPokemons = () => {
    return async (dispatch) => {
        try {
            let url = 'http://localhost:3001/pokemons';
            let json = await axios.get(url);
            return dispatch({
                type: GET_POKEMONS,
                payload: json.data
            });
        } catch (e) {
            console.log(e);
        };     
    };
};

