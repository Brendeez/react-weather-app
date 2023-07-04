import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';
import MapLoc from './components/map/mapLoc';
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcast, setForecast] = useState(null);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [showMap, setshowMap] = useState(false);

  const handleOnSearchChange = (searchData) => {
    console.log("handleOnSearchChange WORKED")

    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forcastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    Promise.all([currentWeatherFetch, forcastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));

    //console.log(currentWeather);
    //console.log(forcast);
    setshowMap(true);
    setLong(Number(lon));
    setLat(Number(lat));
    MapLoc([lat, long]);

  }

  const handleClick = () => {
    setshowMap(false);
  };


  return (
    <div className="container">

      <Search onSearchChange={handleOnSearchChange} />
      <div id="button-holder"><button onClick={handleClick} id="bob"> RESET MAP </button></div>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forcast && <Forecast data={forcast} />}
      {showMap && <MapLoc mapKey={mapKey} latit={lat} longit={long} />}



    </div>
  );
}

export default App;