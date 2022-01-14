import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { getAlltypes, postPokemon } from '../../actions';
import { useDispatch, useSelector } from "react-redux";




const PokemonCreate = () => {
    
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});
    const history = useHistory();
    
    const [input, setInput] = useState({
        name: '', 
        hp: '', 
        attack: '', 
        defense: '', 
        speed: '',
        height: '', 
        weight: '', 
        types: [],
        img: ''
    })
    
    let noEmpty = /\S+/;
    let validateName = /^[a-z]+$/i;
    let validateNum = /^\d+$/;
    let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    
    const validate = (input) => {
            let errors = {};
            if (!noEmpty.test(input.name) || !validateName.test(input.name)) {
            errors.name = "Name required. Only string without numbers";
            }
            if (!validateNum.test(input.hp)) {
                errors.hp = "Number required";
            }
            if (!validateNum.test(input.attack)) {
                errors.attack = "Number required";
            }
            if (!validateNum.test(input.defense)) {
                errors.defense = "Number required";
            }
            if (!validateNum.test(input.speed)) {
                errors.speed = "Number required";
            }
            if (!validateNum.test(input.height)) {
                errors.height = "Number required";
            }
            if (!validateNum.test(input.weight)) {
                errors.weight = "Number required";
            }
            if (!validateUrl.test(input.img)) {
            errors.img = "URL required";
            }
            return errors;
        };

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelect = e => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (
            !errors.name &&
            !errors.hp &&
            !errors.attack &&
            !errors.defense &&
            !errors.speed &&
            !errors.height &&
            !errors.weight &&
            !errors.img 
        ) {

            dispatch(postPokemon(input));
            setInput({
                name: '', 
                hp: '', 
                attack: '', 
                defense: '', 
                speed: '',
                height: '', 
                weight: '', 
                types: [],
                img: ''
            });
            history.push('/home')
        } else {
            alert('Error. Check the form');
        }
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            types: input.types.filter(type => type !== e)
        })
    }

    useEffect(() => {
        dispatch(getAlltypes())
    }, [dispatch])

    return ( 
        <div>
            <Link to='/home'>
                <button>Go Back</button>
            </Link>
            <h2>Create a pokemón!</h2>
            <form onSubmit={e => {handleSubmit(e)}}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={input.name} name='name' onChange={e => {handleChange(e)}} placeholder="Name" />
                    <p>{errors.name}</p>
                </div>
                <div>
                    <label>HP:</label>
                    <input type="number" value={input.hp} name='hp' onChange={e => {handleChange(e)}} placeholder="HP" />
                    <p>{errors.hp}</p>
                </div>
                <div>
                    <label>Attack:</label>
                    <input type="number" value={input.attack} name='attack' onChange={e => {handleChange(e)}} placeholder="Attack" />
                    <p>{errors.attack}</p>
                </div>
                <div>
                    <label>Defense:</label>
                    <input type="number" value={input.defense} name='defense' onChange={e => {handleChange(e)}} placeholder="Defense" />
                    <p>{errors.defense}</p>
                </div>
                <div>
                    <label>Speed:</label>
                    <input type="number" value={input.speed} name='speed' onChange={e => {handleChange(e)}} placeholder="Speed" />
                    <p>{errors.speed}</p>
                </div>
                <div>
                    <label>Height:</label>
                    <input type="number" value={input.height} name='height' onChange={e => {handleChange(e)}} placeholder="Height" />
                    <p>{errors.height}</p>
                </div>
                <div>
                    <label>Weight:</label>
                    <input type="number" value={input.weight} name='weight' onChange={e => {handleChange(e)}} placeholder="Weight" />
                    <p>{errors.weight}</p>
                </div>
                <div>
                    <label>Image:</label>
                    <input type="text" value={input.img} name='img' onChange={e => {handleChange(e)}} placeholder="URL Image..." />
                    <p>{errors.img}</p>
                </div>
                <div>
                    <select onChange={e => {handleSelect(e)}}>
                        {
                            types?.map(e => {
                                return (
                                    <option key={e.id} value={e.name}>{e.name}</option>
                                )
                            })
                        }
                    </select>
                            {
                                input.types.map(e => {
                                    return (
                                        <div key={e}>
                                            <p>{e}</p>
                                            <button onClick={() => {handleDelete(e)}}>x</button>
                                        </div>
                                    )
                                }) //para poder ver que fui seleccionando
                            }
                </div>
            <button type='submit'>Create!</button>
            </form>
        </div>
     );
}
 
export default PokemonCreate;