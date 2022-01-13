import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import Card from './Card';
import Filters from './Filters';
import Pagination from './Pagination';
import Nav from './Nav';

export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    //Paginado acá abajo
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const [order, setOrder] = useState('');
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    // console.log(allPokemons);
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
        alert('Pokemons arrived');
    }

    return(
        <div>
            <Nav />
            <div>
                <h1>PokeAPI</h1>
                <h2>by MPrecelle</h2>
            </div>
            <div>
                <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
            </div>
            <div>
                <button onClick={e => {handleClick(e)}}>Volver a cargar pokemones</button>
            </div>
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
                        id={e.id}
                        name={e.name}
                        image={e.img}
                        types={e.types} />
                    )
                })
            }
        </div>
    )
};
