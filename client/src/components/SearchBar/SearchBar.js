import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName, cleanPokemons } from '../../actions';

const SearchBar = () => {
    
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(cleanPokemons(dispatch));
        dispatch(getPokemonByName(name));
        setName('');
    }

    return ( 
        <div>
            <input type="text" placeholder="Buscar..." onChange={e => {handleInputChange(e)}} value={name} />
            <button type="submit" onClick={e => {handleSubmit(e)}}>Buscar</button>
        </div>
     );
}
 
export default SearchBar;