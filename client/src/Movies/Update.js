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
        setUpdatedMovie({ ...updatedMovie, [event.target.name]: event.target.value });
    }

    const handleStar = (event, index) => {
        const slicedStars = updatedMovie.stars.slice();
        slicedStars[index] = event.target.value;
        setUpdatedMovie({ ...updatedMovie, stars: slicedStars})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${updatedMovie.id}`, updatedMovie)
            .then(res => {
                console.log(res)
                props.history.push('/');
                alert(`Successfully updated ${updatedMovie.title}`);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='label-input-div'>
                    <label htmlFor='title'>Title: </label>
                    <input
                        type='text'
                        name='title'
                        value={updatedMovie.title}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                </div>
                <div className='label-input-div'>
                    <label htmlFor='director'>Director: </label>
                    <input
                        type='text'
                        name='director'
                        value={updatedMovie.director}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                </div>
                <div className='label-input-div'>
                    <label htmlFor='metascore'>MetaScore: </label>
                    <input
                        type='text'
                        name='metascore'
                        value={updatedMovie.metascore}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                </div>
                {updatedMovie.stars.map((star, index) => (
                    <div className='label-input-div'>
                        <label htmlFor='star'>Star: </label>
                        <input
                            key={index}
                            type='text'
                            name='star'
                            value={star}
                            onChange={(event) => handleStar(event, index)}
                            autoComplete='off'
                        />
                    </div>
                ))}
                <button>Update</button>
            </form>
        </div>
    )
}

export default Update;