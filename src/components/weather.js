import React from 'react';
import './styles.css';
import {Box, Button, Card, CardHeader, CardContent, Typography, CardMedia, Grid, Avatar, Icon} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import waterDrop from './icon/water_drop.svg'
import {Home} from "@material-ui/icons";

const { showTempUnit } = require('./helpers')

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        width: '60%',
        left: '15%',
        top: '30%',
    },
    card: {
        boxShadow: "5px 5px grey"
    },
    weatherIcon: {
        position: 'relative',
        left: '25%',
        width: '50%',
        height: '50%'
    }
}));

function CardContainer({props}){
    const classes = useStyles();
    const {showF, weatherData} = props
    return (
        <Grid container spacing={1} className={classes.root}>
            {
                weatherData.forecast.forecastday.map((day, i) =>
                    <WeatherCard props={{showF: showF, forecastday: day}} key={i}/>
                )

            }
            {
                weatherData.forecast.forecastday.map((day, i) =>
                    <WeatherCard props={{showF: showF, forecastday: day}} key={i}/>
                )
            }
        </Grid>
    );
};


function WeatherCard({props}){
    const classes = useStyles();
    const {showF, forecastday} = props
    const day = forecastday.day
    return (
        <Grid item xs={12} sm={3}>
            <Card className={classes.card}>
                <React.Fragment>
                    {/*<CardHeader title={weatherInfo.location.name}/>*/}
                    {/*<CardMedia*/}
                    {/*    component="img"*/}
                    {/*    image={forecastday.day.condition.icon}*/}
                    {/*    alt="Paella dish"*/}
                    {/*/>*/}
                    <CardMedia component="img" image={forecastday.day.condition.icon} className={classes.weatherIcon}/>
                    <CardContent>
                        <Typography>{
                            showF? day.maxtemp_f + showTempUnit(showF):
                                   day.maxtemp_c + showTempUnit(showF)
                        }
                        </Typography>
                        <Typography>{
                            showF? day.mintemp_f + showTempUnit(showF):
                                   day.mintemp_c + showTempUnit(showF)
                        }
                        </Typography>
                        {/*<img src={require('../logo.svg')} alt={"sddf"}/>*/}
                        <Typography>{day.daily_chance_of_rain + "%"}</Typography>
                    </CardContent>
                </React.Fragment>
            </Card>

        </Grid>

    )
}



export default CardContainer;