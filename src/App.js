import React, {useState} from 'react';
import './App.css';
import Interface from "./components/Interface";
import WeatherInfo from "./components/WeatherInfo";


function App() {

    const [state, setState] = useState({
        countryCode: undefined,
        city: undefined,
        temperature: undefined,
        visibility: undefined,
        humidity: undefined,
        pressure: undefined,
        sunrise: undefined,
        sunset: undefined,
        cloudsDescription: undefined,
        cloudsIcon: undefined,
    });
    const [cityName, setCityName] = useState('');
    const [error, setError] = useState(null);


    const API_KEY = '4dbe5b6f0197c71ad67531d031a966a6';
    const getWeatherInfo = async (e) => {
        e.preventDefault();
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
        const data = await api_url.json();
        setCityName('');

        if (cityName.trim() === '') {
            setError('City field is required. Fill it out.');
            setState({});
            return;
        }

        if (data.cod[0] === '4') {
            setError('Enter existing city.');
            setState({});
            return;
        }

        //temperature from Kelvin
        const temperature = data.main.temp;
        const tempToFahrenheit = Math.floor(temperature - 273.15);

        //pressure from hpa to мм.рт.ст.
        const pressure = data.main.pressure;
        const pressureInMmHg = Math.floor(pressure * 0.75006);
        const sunConvert = (setOrRise) => {
            const date = new Date(setOrRise * 1000);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
            const seconds = "0" + date.getSeconds();
            const sunsetDate = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            return sunsetDate
        }

        setState({
            countryCode: data.sys.country,
            city: data.name,
            temperature: tempToFahrenheit,
            //метры
            visibility: data.visibility,
            //%
            humidity: data.main.humidity,
            //  ,0mb
            pressure: pressureInMmHg,
            sunrise: sunConvert(data.sys.sunrise),
            sunset: sunConvert(data.sys.sunset),
            cloudsDescription: data.weather[0].description,
            //?
            cloudsIcon: data.weather[0].icon,
            // направление ветра 40 градусов
            windDirection: data.wind.deg,
            //скорость ветра Km/h
            windSpeed: data.wind.speed,
        })
    }

    return (
        <div className='container'>
            <h2 className='text_header'>
                {
                    state.cloudsIcon ?
                        <img className={'alternative_cloud'} width={'34px'}
                             src={`http://openweathermap.org/img/w/${state.cloudsIcon}.png`}
                             alt='Weather icon should have been located here'/>
                        :
                        <i id='cloud' className="material-icons">wb_cloudy</i>
                }

                Weather
                <i id='sun' className="material-icons">wb_sunny</i>
                <p className='informer_text'>Informer</p>
                <hr/>
            </h2>
            <p className='brief_description'>Find out the weather in your city!</p>

            <Interface setError={setError} error={error} setCityName={setCityName} cityName={cityName}
                       getWeatherInfo={getWeatherInfo}/>
            <WeatherInfo error={error} state={state}/>
        </div>
    );
}

export default App;
