import './App.css';
import './components/styles.css';
import React, { useState, useCallback, useEffect} from "react";
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
        alert: false,
        city: ""
    });

    useEffect(() => {
        async function fetchWeatherData() {
            if (!state.city) {
                return;
            }
            try {
                const forecast = await fetch(state.weatherWrapper.getForecastUrl(state.city)).then(res => res.json());
                const coord = forecast.city.coord;
                const weatherData = await fetch(state.weatherWrapper.getOCUrl(coord)).then(res => res.json());
                setState(state => ({
                    ...state,
                    weatherWrapper: state.weatherWrapper.setWeatherData(weatherData),
                    alert: false
                }));
            } catch (e) {
                setState(state => ({
                    ...state,
                    weatherWrapper: state.weatherWrapper.setWeatherData(null),
                    alert: true
                }));
            }
        }

        fetchWeatherData();
    }, [state.city, state.weatherWrapper]);

    const searchCallback = useCallback(city => {
        setState(state => ({
            ...state,
            city,
            alert: false
        }));
    }, []);




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
