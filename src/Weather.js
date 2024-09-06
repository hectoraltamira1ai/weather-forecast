// src/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [forecast, setForecast] = useState(null);
    const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

    const API_KEY = 'f31dfb4f2c764d833293bbd4f98a0851'; // Replace with your OpenWeather API key

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
            setForecast(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleUnitChange = (newUnit) => {
        setUnit(newUnit);
        if (forecast) {
            fetchWeather(); // Refetch weather when unit changes
        }
    };

    return (
        <div className="weather-container">
            <h1>5-Day Weather Forecast</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={fetchWeather}>Get Forecast</button>
            <button onClick={() => handleUnitChange('metric')}>°C</button>
            <button onClick={() => handleUnitChange('imperial')}>°F</button>

            {forecast && (
                <div className='returnData'>
                    <h2>Weather in {forecast.city.name}</h2>
                    <ul>
                        {forecast.list.map((item, index) => (
                            <li key={index}>
                                <strong>Date:</strong> {new Date(item.dt * 1000).toLocaleDateString()} <br />
                                <strong>Temperature:</strong> {item.main.temp}°{unit === 'metric' ? 'C' : 'F'} <br />
                                <strong>Wind Speed:</strong> {item.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'} <br />
                                <strong>Weather:</strong> {item.weather[0].description}<br /> 
                                <strong>Temperature Feels Like</strong> {item.main.feels_like}°{unit === 'metric' ? 'C' : 'F'} <br />
                                <strong>Date and Time:</strong> {item.dt_txt}<br />                            
                                <br />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Weather;
