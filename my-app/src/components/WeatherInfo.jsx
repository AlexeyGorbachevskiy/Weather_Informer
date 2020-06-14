import React from 'react';

import obj from './WeatherInfo.module.css';

function WeatherInfo(props) {
    return (
        <div>
            {props.error && <span className={obj.error_message}>{props.error}</span>}
            <p>{props.state.pressure}</p>
            <p>{props.state.temperature}</p>
        </div>
    );
}

export default WeatherInfo;