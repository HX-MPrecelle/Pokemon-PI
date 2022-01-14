import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanDetail, cleanPokemons } from "../actions";
import { useEffect } from "react";
import noImage from '../img/noImage.png';
import Loading from "./Loading";

const Detail = (props) => {

    const dispatch = useDispatch();
    const myPokemon = useSelector((state) => state.pokeDetail)

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
        return () => {
            dispatch(cleanDetail(dispatch), cleanPokemons(dispatch))
        }
    }, [dispatch, props.match.params.id])


    return ( 
        <div>
            {
                myPokemon.length > 0 ?
                <div>
                    <h2>Name: {myPokemon[0].name}</h2>
                    <p>#{myPokemon[0].id}</p>
                    <img src={myPokemon[0].img ? myPokemon[0].img : noImage} alt="img not found" alt="250px" width="200px" />
                    <h3>Types: {myPokemon[0].types?.map(e => {
                        return (
                            <p key={e.name}>{e.name}</p>
                        )
                    })} </h3>
                    <h5>HP:{myPokemon[0].hp}</h5>
                    <h5>Attack:{myPokemon[0].attack}</h5>
                    <h5>Defense:{myPokemon[0].defense}</h5>
                    <h5>Speed:{myPokemon[0].speed}</h5>
                    <h5>Height:{myPokemon[0].height}</h5>
                    <h5>Weight:{myPokemon[0].weight}</h5>
                    <h5>{myPokemon[0].createdInBd ? 'FAKE' : 'ORIGINAL'}</h5>
                </div> : 
                <div>
                    <Loading />
                </div>
            }
            <Link to='/home'>Volver</Link>
        </div>
        
     );
}
 
export default Detail;