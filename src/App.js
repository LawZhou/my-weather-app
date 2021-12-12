import './App.css';
import './components/styles.css';
import React, { useState, useCallback} from "react";
import CardContainer from './components/weather'
import CitySearchInput from "./components/search";
import {Button, FormControlLabel, Switch} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import weatherApi from "./api/weather_api";

const { showTempUnit } = require('./components/helpers')

function App() {
  const [state, setState] = useState({
      showF: false,
      weatherWrapper: new weatherApi(),
      alert: false
  })

  /*
  * Since OneCall Api only accepts lat and long for the geographical location,
  * so need to make the first forecast api fetch to get the lat and long for the input city,
  * then make the second onecall api fetch to get the weather data for the corresponding
  * lat and long*/
  const searchCallback = useCallback(async (city) => {
      await fetch(state.weatherWrapper.getForecastUrl(city))
          .then(res => res.json())
          .then(result => {
              let coord = result.city.coord
              fetch(state.weatherWrapper.getOCUrl(coord))
                  .then(res => res.json())
                  .then(result => {
                      setState(state => ({
                          ...state,
                          weatherWrapper: state.weatherWrapper.setWeatherData(result),
                          alert: false
                      }))
                      console.log(result)
                      console.log(state)
                  })

          })
          .catch(e => {
              setState(state => ({
                  ...state,
                  weatherWrapper: state.weatherWrapper.setWeatherData(null),
                  alert: true
              }))
      });

  }, [state]);


  function handleSwitch(e){
    setState(state => ({
        ...state,
        showF: e.target.checked,
    }))
  }

  return (
    <div className='App'>
        <CitySearchInput searchCallBack={searchCallback} />
        <FormControlLabel
            control={
                <Switch
                    checked={state.showF}
                    onChange={handleSwitch}
                    color="primary"
                    inputProps={{'aria-label': 'temperature unit switch'}}

                />
            }
            label = {"Show " + showTempUnit(state.showF)}
            className='Switch'
        />
        {/*mandatory check because fetch data is an async function*/}
        {(state.weatherWrapper.getWeatherData()) ? (
          <CardContainer props={state} />
        ): (
            <div/>
        )}
        {/*Generate an alert for invalid input of city*/}
        {(state.alert) ? (
            <Alert
                action={
                    <Button color="inherit" size="small" onClick={() =>{
                        setState(state => ({
                            ...state,
                            alert: false
                        }))
                    }}>
                        Close
                    </Button>
                }
            >
                Invalid city name!
            </Alert>
        ): (
            <div/>
        )}
    </div>
  );
}

export default App;
