import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1>PokeAPI</h1>
            <h2>by MPrecelle</h2>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}