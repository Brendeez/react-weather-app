import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState, useEffect } from 'react';

import { Map, Marker } from "pigeon-maps"

import Forecast from './components/forecast/forecast';
import MapLoc from './components/map/mapLoc';
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcast, setForecast] = useState(null);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [showMap, setshowMap] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  //const [latlong, setLatLong] = useState({ lat: -27, long: 153 });
  //    useEffect(() => {
  //      // Update the document title using the browser API
  //      if (nand(true,showMap)===false){
  //        setshowMap(false)
  //        console.log("IF IN USEEFFECT -->", showMap)
  //        
  //      }
  //      console.log("USEEFFECT --> NO WORK" , showMap)
  //    });
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
    //setMapKey(mapKey + 1); 
    MapLoc([lat,long]);
    
  }

  //setLatLong({ lat: lat, long: lon })


  //console.log("hellosmello", lat, long);
  const handleClick = () => {
    // Update the value of setLong
    // setLong(long);
    // setLat(lat);
    // console.log("in da click", lat, long);
    // console.log(typeof lat);
    // console.log(typeof long);
    setshowMap(false);
    // setMapKey(mapKey + 1); 
    // console.log(mapKey);
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

//  {long && <MapLoc data={[lat,long]} />}
/*
<div id="button-holder"><button onClick={handleClick} id="bob"> SHOW LOCATION OF CITY </button></div>
<h1>REAL EXMAPLE</h1>
      <Map height={300} defaultCenter={[lat, long]} defaultZoom={5}>
        <Marker width={50} color={"red"} anchor={[lat, long]} />
      </Map >


*/