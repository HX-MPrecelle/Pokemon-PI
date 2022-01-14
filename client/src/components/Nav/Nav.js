import React from "react";
import {Link} from 'react-router-dom';
import pokemonImg from '../../img/pokemonTitle.png'

const Nav = () => {
    return (
        <header>
            <nav>
                <div>
                    <img src={pokemonImg} alt="img not found" width='300px' height='150px' />   
                </div>
                <div>
                    <Link to='/create'>
                        <button>Create a pokemon</button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}
 
export default Nav;