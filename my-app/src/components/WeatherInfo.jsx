import React from 'react';

// import './App.css';

function WeatherInfo(props) {
    return (
        <div>
            <h2>Weather</h2>
            {props.state.windSpeed}
        </div>
    );
}

export default WeatherInfo;