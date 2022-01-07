import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import { Link } from 'react-router-dom';

export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)

    useEffect(() => {
        dispatch(getPokemons())
    }, [])

    const handleClick = e => {
        e.preventDefault();
        dispatch(getPokemons());
    }

    return(
        <div>
            <Link to='/pokemon'>Crear pokemon</Link>
            <h1>PokeAPI</h1>
            <h2>by MPrecelle</h2>
            <button onClick={e => {handleClick(e)}}>Volver a cargar los pokemones</button>
            <div>
                
            </div>
        </div>
    )
}