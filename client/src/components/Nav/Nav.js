import React from "react";
import {Link} from 'react-router-dom';
import pokemonImg from '../../img/pokemonTitle.png'
import styles from './Nav.module.css'

const Nav = () => {
    return (
        <header>
            <nav className={styles.nav}>
                <div>
                    <img src={pokemonImg} alt="img not found" className={styles.img} /> 
                </div>
                <div>  
                    <Link to='/create'>
                        <button className={styles.btn}>Create a pokemon</button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}
 
export default Nav;