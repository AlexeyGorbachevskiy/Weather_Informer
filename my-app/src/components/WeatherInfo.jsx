import React from 'react';

import obj from './WeatherInfo.module.css';

function WeatherInfo(props) {
    return (
        <div className={obj.output}>

            {props.error && <span className={obj.error_message}>{props.error}</span>}

            {props.state.city &&
            <div className={obj.info}>
                <p className={obj.city}>{`${props.state.city}, ${props.state.countryCode}`}</p>
                <p className={obj.cloudsDescription}>{props.state.cloudsDescription}</p>
                <img className={obj.icon} src={`http://openweathermap.org/img/w/${props.state.cloudsIcon}.png`}
                     alt='Weather icon should have been located here'/>
                <span className={obj.temperature}>{`${props.state.temperature}C°`}</span>
                <p className={obj.visibility}>{`Visibility: ${props.state.visibility} m`}</p>
                <p className={obj.humidity}>{`Humidity: ${props.state.humidity}%`}</p>
                <p className={obj.pressure}>{`Pressure: ${props.state.pressure} mmHg`}</p>
                <p className={obj.sunrise}>{`Sunrise: ${props.state.sunrise} h`}</p>
                <p className={obj.sunset}>{`Sunset: ${props.state.sunset} h`}</p>
            </div>
            }


        </div>
    );
}

export default WeatherInfo;