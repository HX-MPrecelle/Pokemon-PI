import { GET_POKEMONS } from "../actions";

const initialState = {
    pokemons: [],
}

const rootReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            };
        default: 
            return {...state};
    };
    
};

export default rootReducer;