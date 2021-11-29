import './App.css';
import React, {useEffect, useState} from "react";

function App() {
  const [state, setState] = useState({lat: null | Number, long: null | Number, data: null})


  useEffect(() => {
    const fetchWeatherData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setState(state => ({
          ...state,
          lat: position.coords.latitude,
          long: position.coords.longitude,
        }));
      });

      await fetch(`${process.env.REACT_APP_API_URL}/forecast.json?key=${process.env.REACT_APP_API_KEY}
      &q=${state.lat},${state.long}&days=${process.env.REACT_APP_FORECAST_DAYS}`)
        .then(res => res.json())
        .then(result => {
          setState(state => ({
            ...state,
            data: result,
          }))
          console.log(result)
          console.log(process.env)
        });
    }
    fetchWeatherData();
    console.log("Latitude is:", state.lat)
    console.log("Longitude is:", state.long)


  }, [state.lat, state.long]);

  return (
    <div className="App">

    </div>
  );
}

export default App;
