import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import Card from './Card';
import Pagination from './Pagination';

export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    //Paginado acá abajo
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const pagination = pageNumber => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getPokemons());
        alert('Se volvieron a cargar los pokemones');
    }

    return(
        <div>
            <h1>PokeAPI</h1>
            <h2>by MPrecelle</h2>
            <p>Esta es mi Home</p>
            <button onClick={e => {handleClick(e)}}>Volver a cargar pokemones</button>
            <Pagination
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            pagination={pagination}
            />
            {
                currentPokemons?.map(e => {
                    return(
                        <Card 
                        key={e.id}
                        name={e.name}
                        image={e.img}
                        types={e.types} />
                    )
                })
            }
        </div>
    )
}