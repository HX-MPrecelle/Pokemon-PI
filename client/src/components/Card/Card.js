import React from "react";
import { NavLink } from "react-router-dom";
import noImage from '../../img/noImage.png';
import styles from './Card.module.css'

export default function Card({name, image, types, id}) {
    
    // console.log(name, image, types)
    return(
        <div>
            <NavLink className={styles.none} to={`/pokemon/${id}`}>
                <div>
                    <img className={styles.img} src={image ? image : noImage} alt="img not found" width="200px" height="250vh" />
                    <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                    <div className={styles.types}>
                        {
                            types?.map((e, k) => {
                                return (
                                    <div className={styles.types} key={k}>
                                        <img className={styles.typesImg} src={e.img} alt='X' />
                                        <p className={styles.text}>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </NavLink>
        </div>
    );
};