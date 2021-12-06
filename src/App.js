import './App.css';
import './components/styles.css';
import React, {useEffect, useState, useCallback} from "react";
import CardContainer from './components/weather'
import CitySearchInput from "./components/search";
import {FormControlLabel, FormGroup, Switch} from "@material-ui/core";

const { showTempUnit } = require('./components/helpers')

function App() {
  const [state, setState] = useState({showF: false, weatherData: null})


  const searchCallback = useCallback(async (city) => {
    // const fetchWeatherData = async () => {
      // navigator.geolocation.getCurrentPosition(function(position) {
      //   setState(state => ({
      //     ...state,
      //     lat: position.coords.latitude,
      //     long: position.coords.longitude,
      //   }));
      // });
      console.log("in callback")

      await fetch(`${process.env.REACT_APP_API_URL}/forecast.json?key=${process.env.REACT_APP_API_KEY}
      &q=${city}&days=${process.env.REACT_APP_FORECAST_DAYS}`)
        .then(res => res.json())
        .then(result => {
          setState(state => ({
            ...state,
              weatherData: result,
          }))
          console.log(result)
          // console.log(process.env)
        });
    // }
    // fetchWeatherData();
    // console.log("Latitude is:", state.lat)
    // console.log("Longitude is:", state.long)


  }, []);

  function handleSwitch(e){
    setState(state => ({
        ...state,
        showF: e.target.checked,
    }))
  }
  // console.log("state: ", state)

  return (
    <div className='App'>
        <CitySearchInput searchCallBack={searchCallback} />
        {/*<img src={require('./logo.svg')} alt={"sddf"}/>*/}
        <FormControlLabel
            control={
                <Switch
                    checked={state.showF}
                    onChange={handleSwitch}
                    color="primary"
                    name="checkedB"
                    inputProps={{'aria-label': 'primary checkbox'}}

                />
            }
            label = {"Show " + showTempUnit(state.showF)}
            className='Switch'
        />

        {/*mandatory check because fetch data is an async function*/}
        {(state.weatherData) ? (
          <CardContainer props={state} />
          // <div></div>
        ): (
          <div></div>
        )}
    </div>
  );
}

export default App;
