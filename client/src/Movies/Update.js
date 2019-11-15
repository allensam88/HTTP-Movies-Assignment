import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Update = props => {
    const [updatedMovie, setUpdatedMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    useEffect(() => {
        const id = props.match.params.id
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setUpdatedMovie(res.data))
            .catch(err => console.log(err.response))
    }, [props.match.params.id]);

    const handleChange = (event) => {
        event.persist();
        let value = event.target.value;
        if (event.target.name === 'metascore') {
            value = parseInt(value, 10);
        } 
        // else if (event.target.name === 'stars') {
        //     const updatedStars = updatedMovie.stars.filter((item) => item !== star)
            
        // }
        setUpdatedMovie({ ...updatedMovie, [event.target.name]: event.target.value });
    }

    // const handleStarChange = (event, star) => {
        
    //     setUpdatedMovie({ ...updatedMovie, stars: [...updatedMovie.stars, updatedStars]})
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${updatedMovie.id}`, updatedMovie)
            .then(res => {
                console.log(res)
                props.history.push('/');
            })
            .catch(err => console.log(err));
        alert(`Successfully updated ${updatedMovie.title}`);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    value={updatedMovie.title}
                    onChange={handleChange}
                    autoComplete='off'
                />
                <input
                    type='text'
                    name='director'
                    value={updatedMovie.director}
                    onChange={handleChange}
                    autoComplete='off'
                />
                <input
                    type='number'
                    name='metascore'
                    value={updatedMovie.metascore}
                    onChange={handleChange}
                    autoComplete='off'
                />
                {updatedMovie.stars.map((star) => (<input
                    key={star}
                    type='text'
                    name='stars'
                    value={star}
                    onChange={handleChange}
                    autoComplete='off'
                />))}
                <button>Update</button>
            </form>
        </div>
    )
}

export default Update;