import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_NAME = 'ORDER_NAME';
export const FILTER_TYPE = 'FILTER_TYPE';

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

export const getAlltypes = () => {
    return async (dispatch) => {
        try {
            let url = 'http://localhost:3001/types';
            let json = await axios.get(url);
            return dispatch({
                type: GET_ALL_TYPES,
                payload: json.data
            });
        } catch (e) {
          console.log(e);  
        };
    };
};

export const filterCreated = (payload) => {
    return {
        type: FILTER_CREATED,
        payload
    };
};

export const orderName = (payload) => {
    return {
        type: ORDER_NAME,
        payload
    };
};

export const filterType = (payload) => {
    return {
        type: FILTER_TYPE,
        payload
    };
};
