import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanPokemons, getPokemons } from '../actions';
import Card from './Card';
import Filters from './Filters';
import Pagination from './Pagination';
import Nav from './Nav';
import Loading from './Loading';

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
        dispatch(cleanPokemons(dispatch));
        dispatch(getPokemons());
    }


    return(
        <div>
            { allPokemons.length > 0 ?
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
                    <button onClick={e => {handleClick(e)}}>Clear filters</button>
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
                </div> :
                <Loading />
            } 
        </div>
    )
};
