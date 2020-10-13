import React, { useState } from 'react';
// decalre our api variable with key and link
const api = {
  key: "",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  // define query 
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  // function to get weather data
  const search = evt => {
    if (evt.key === "Enter")
    {
      // call to get data
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      });
    }

  }

  // Call back to get current date
  const dateBuilder = (d) => {
    // months in a year
    let months = ["January", "Febuary","March","Apirl","May",
    "June","July","August","September","October","November", "December"];
    
    // days of the week
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // get correct info
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    // main class that will handle all display features of the app
    <div className={
      /* update background picture based on information return */
      (typeof weather.main != "undefined") 
      ? ((weather.weather[0].main === "Rain") ? 'App rain' : (weather.weather[0].main === "Clear") ? 'App warm' :
        (weather.weather[0].main === "Clouds") ? 'App clouds' : (weather.weather[0].main === "Fog") ? 'App fog' : 
        (weather.weather[0].main === "Mist") ? 'App mist' : (weather.weather[0].main === "Snow") ? 'App snow' : 'App')
      :'App'}>
      <main> 
        {/* search box div */}
        <div className="search-box">
          {/* allowing for user input and search functionality */}
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {/* if user hasnt entered a location show nothing */}
        {(typeof weather.main != "undefined") ? (
        <div>
          {/* Once location entered display correct info */}
          <div className="location-box">
          <div className="location"> {weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°F
            </div>
          <div className="weather">
            {weather.weather[0].main}
          </div>
          <div className="humidity">
            <h1>Feels like: {Math.round(weather.main.feels_like)}°F</h1>
            <h1>Humidity: {weather.main.humidity}%</h1>
            <h1>Wind: {weather.wind.speed} mph</h1>
            <h1>Coordinates: {weather.coord.lon}, {weather.coord.lat}</h1>
          </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
