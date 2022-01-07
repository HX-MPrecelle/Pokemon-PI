import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import Card from './Card';

export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    return(
        <div>
            <h1>PokeAPI</h1>
            <h2>by MPrecelle</h2>
            <p>Esta es mi Home</p>
            {
                allPokemons ?
                allPokemons.map(e => {
                    return(
                        <Card 
                        key={e.id}
                        name={e.name}
                        image={e.img}
                        types={e.types} />
                    )
                }) :
                <h3>No existen pokemones</h3>
            }
        </div>
    )
}