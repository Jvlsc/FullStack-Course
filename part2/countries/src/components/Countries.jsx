import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

// Weather Component:
const Weather = ({ country, weather }) => {
  if (!weather) {
    return (
      <div>
        <h4> {'>>'} No weather data available.</h4>
      </div>
    )
  }

  return (
    <div>
      <h3>Weather in {country.capital[0]}:</h3>
      <ul>
        <li>Temperature: {weather.main.temp}°C</li>
        <li>Wind: {weather.wind.speed} m/s</li>
      </ul>
      <img 
        src={weatherService.getWeatherIconUrl(weather.weather[0].icon)}
        alt={weather.weather[0].description}
      />
    </div>
  )
}

// Country Details Component:
const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (country.capitalInfo.latlng) {
      const [lat, lon] = country.capitalInfo.latlng
      weatherService
        .getWeather(lat, lon)
        .then(response => {
          console.log('Weather Data:', response)
          setWeather(response)
        })
        .catch(error => {
          console.error('Error fetching weather:', error)
          setWeather(null)
        })
    }
  }, [])

  return (
    <div>
      <h2>{country.name.common} [{country.name.official}]</h2>
      <ul>
        <li>Capital: {country.capital}</li>
        <li>Area: {country.area}</li>
      </ul>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.official}`} />
      <Weather country={country} weather={weather} />
    </div>
  )
}

// Country Component:
const Country = ({ country, handleShowCountry }) => {
  return (
    <h4>
      · {country.name.common} [{country.name.official}] &nbsp;
      <button onClick={() => handleShowCountry(country.name.official)}>
        Show Details
      </button>
    </h4>
  )
}

// Countries Component:
const Countries = ({ countries, handleShowCountry }) => {
  if (countries.length === 0) {
    return (
      <div>
        <h4> {'>>'} No countries found</h4>
      </div>
    )
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map(country => 
          <Country key={country.cca3} country={country} handleShowCountry={handleShowCountry} />
        )}
      </div>
    )
  }

  if (countries.length > 10) {
    return (
      <div>
        <h4> {'>>'} Too many countries, specify another filter</h4>
      </div>
    )
  }
}

export default Countries