import React from 'react';
import './styles.css';
import {Card, CardHeader, CardContent, Typography, CardMedia, Grid} from "@material-ui/core";
import { useWeatherStyles } from "./styles";
import waterDrop from './img/water_drop.png'
import weatherApi from "../api/weather_api";

const { showTempUnit } = require('./helpers');

function CardContainer({props}) {
    /**
     * Container for all weather info cards
     * */
    const classes = useWeatherStyles();
    const { showF, weatherWrapper } = props;
    //for converting unix utc time to local time
    const tz = weatherWrapper.getWeatherData().timezone;

    return (
        <Grid container spacing={1} className={classes.root}>
            {weatherWrapper
                .getForecastDays()
                .slice(0, weatherWrapper.numDays)
                .map((day, i) => (
                    <WeatherCard
                        key={i}
                        props={{
                            showF: showF,
                            day: day,
                            tz: tz,
                        }}
                    />
                ))}
        </Grid>
    );
}

function WeatherCard({ props }) {
    /**
     * Generate weather card for each forecast day
     * */
    const classes = useWeatherStyles();
    const { showF, day, tz } = props;

    return (
        <Grid item xs={12} sm={2}>
            <Card className={classes.card}>
                <CardHeader
                    title={weatherApi.getDateTime(day, tz)}
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <CardMedia
                    component="img"
                    image={weatherApi.getIcon(day)}
                    className={classes.weatherIcon}
                />
                <CardContent>
                    <Typography>
                        {Math.round(weatherApi.getMaxTemp(day, showF)) + showTempUnit(showF)}
                    </Typography>
                    <Typography>
                        {Math.round(weatherApi.getMinTemp(day, showF)) + showTempUnit(showF)}
                    </Typography>
                    <span className={classes.popSpan}>
            <img src={waterDrop} className={classes.popIcon} alt="sddf" />
            <Typography>{Math.round(weatherApi.getPopChance(day) * 100) + '%'}</Typography>
          </span>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default CardContainer;
