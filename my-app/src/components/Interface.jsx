import React from 'react';
import obj from './Interface.module.css';

function Interface(props) {
    const onInputChangeHandler = e => {
        props.setCityName(e.target.value);
        props.setError(null);
    }
    return (
        <form onSubmit={props.getWeatherInfo}>
            <input className={props.error && obj.error} onChange={onInputChangeHandler} value={props.cityName}
                   type='text' name='city' placeholder='Type a city...'/>
            <button>Get weather</button>
        </form>
    );
}

export default Interface;