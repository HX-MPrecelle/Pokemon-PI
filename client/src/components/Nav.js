import React from "react";
import Filters from './Filters';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <header>
            <nav>
                <img src="../../img/pokemonTitle.png" alt="img not found" width='300px' height='150px' />
                <SearchBar/>
                <Link to='/pokemons'>Crear pokemón</Link>
                <Filters/>
            </nav>
        </header>
    )
}
 
export default Nav;