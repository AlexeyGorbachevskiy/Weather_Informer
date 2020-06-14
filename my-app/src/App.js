import React, {useState} from 'react';
import './App.css';
import Info from "./components/Info";
import Form from "./components/Form";
import WeatherInfo from "./components/WeatherInfo";


function App() {


    let [state, setState] = useState({
        countryCode: undefined,
        city: undefined,
        temperature: undefined,
        visibility: undefined,
        humidity: undefined,
        pressure: undefined,
        sunrise: undefined,
        sunset: undefined,
        brokenClouds: undefined,
        cloudsIcon: undefined,
        error: undefined,
    });

    const API_KEY = '4dbe5b6f0197c71ad67531d031a966a6';
    const getWeatherInfo = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        if (city.trim() === '') {
            return
        }


        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await api_url.json();

        //temperature from Kelvin
        let temperature = data.main.temp;
        let tempToFahrenheit = Math.floor(temperature - 273.15);

        //pressure from hpa to мм рт.ст.
        // let pressure = data.main.pressure;
        // let pressureInMmHg = Math.floor(pressure * 0.75006);


        const sunConvert = (setOrRise) => {
            const date = new Date(setOrRise * 1000);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
            const seconds = "0" + date.getSeconds();
            const sunsetDate = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            return sunsetDate
        }


        console.log(data);
        setState({
            countryCode: data.sys.country,
            city: data.name,
            temperature: tempToFahrenheit,
            //метры
            visibility: data.visibility,
            //%
            humidity: data.main.humidity,
            //  ,0mb
            pressure: data.main.pressure,
            sunrise: sunConvert(data.sys.sunrise),
            sunset: sunConvert(data.sys.sunset),
            cloudsDescription: data.weather[0].description,
            //?
            cloudsIcon: data.weather[0].icon,
            // направление ветра 40 градусов
            windDirection: data.wind.deg,
            //скорость ветра Km/h
            windSpeed: data.wind.speed,
            error: '',
        })


    }
    return (
        <div className={'container'}>
            <Info/>
            <Form getWeatherInfo={getWeatherInfo}/>
            <WeatherInfo state={state}/>
        </div>
    );
}

export default App;
