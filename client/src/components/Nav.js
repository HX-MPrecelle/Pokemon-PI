import React from "react";
import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <header>
            <nav>
                <img src="../../img/pokemonTitle.png" alt="img not found" width='300px' height='150px' />
                <Link to='/create'>Crear pokemón</Link>
            </nav>
        </header>
    )
}
 
export default Nav;