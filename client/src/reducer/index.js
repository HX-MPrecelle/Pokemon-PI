import { 
    GET_POKEMONS, 
    GET_ALL_TYPES, 
    FILTER_CREATED, 
    ORDER_NAME, 
    FILTER_TYPE
 } from "../actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: []
}

const rootReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            };
        case GET_ALL_TYPES:
            return {
                ...state,
                types: action.payload
            }; 
        case FILTER_CREATED:
            let copy = state.allPokemons;
            let createdFiltered;
            if (action.payload === 'created') {
                createdFiltered = copy.filter(e => e.createdInDb);
            } else if (action.payload === 'api') {
                createdFiltered = copy.filter(e => !e.createdInDb);
            } else {
                createdFiltered = copy;
            }
            return {
                ...state,
                pokemons: createdFiltered
            };
        case FILTER_TYPE:
            let copyTwo = state.allPokemons;
            let typeFiltered = action.payload === 'all' ? copyTwo : copyTwo.filter(e => e.types.includes(action.payload));
            if(typeFiltered.length <= 0){
                typeFiltered = copyTwo;   
                alert('No se encontraron pokemons del tipo indicado'); 
            }; 
            return {
                ...state,
                pokemons: typeFiltered
            };
        case ORDER_NAME:
            let sortedArr = action.payload === 'asc' ?
                state.pokemons.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())

                }) :
                state.pokemons.sort((a, b) => {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                })
            return {
                ...state,
                pokemons: sortedArr
            };
        default: 
            return {...state};
    };
    
};

export default rootReducer;