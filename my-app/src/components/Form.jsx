import React from 'react';

// import './App.css';

function Form(props) {
    return (
        <form onSubmit={props.getWeatherInfo}>
            <input type='text' name='city' placeholder='City'/>
            <button>Get weather</button>
        </form>
    );
}

export default Form;