import React from 'react';
import obj from './Interface.module.css';

function Interface(props) {
    const onInputChangeHandler = e => {
        props.setCityName(e.target.value);
        props.setError(null);
    }
    return (
        <form className={obj.form} onSubmit={props.getWeatherInfo}>
            <input id={obj.input} className={props.error && obj.error} onChange={onInputChangeHandler}
                   value={props.cityName}
                   type='text' name='city' placeholder='Type a city...'/>
            <span>
            <button id={obj.search_btn} className="material-icons">search</button>
            </span>
        </form>
    );
}

export default Interface;