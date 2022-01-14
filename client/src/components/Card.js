import React from "react";
import { Link } from "react-router-dom";
import noImage from '../img/noImage.png';

export default function Card({name, image, types, id}) {
    
    // console.log(name, image, types)
    return(
        <div>
            <img src={image ? image : noImage} alt="img not found" width="200px" height="250vh" />
            <h2>{name}</h2>
            {
                types && 
                types.map(e => {
                    return(
                        <h3 key={e.name}>{e.name}</h3>
                    )
                })
            }
            <Link to={`/pokemon/${id}`}>
                <button>Ver detalle</button>
            </Link>
        </div>
    );
};