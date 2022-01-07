import React from "react";

export default function Card({name, image, types}) {
    
    return(
        <div>
            <img src={image} alt="img not found" width="200px" height="250vh" />
            <h2>{name}</h2>
            <h3>{types}</h3>
        </div>
    );
};