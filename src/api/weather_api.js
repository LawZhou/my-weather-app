import { convertTempUnit, convertDt } from '../components/helpers';

class WeatherApi {
    constructor() {
        this.weatherData = null;
        this.numDays = 5;
        this.defaultCity = 'Toronto';
    }

    getForecastUrl(city) {
        return `${process.env.REACT_APP_FORECAST_URL}q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    }

    getOCUrl(coord) {
        return `${process.env.REACT_APP_ONECALL_URL}lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,alerts,current&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    }

    getWeatherData() {
        return this.weatherData;
    }

    setWeatherData(data) {
        this.weatherData = data;
        return this;
    }

    getForecastDays() {
        return this.weatherData.daily;
    }

    static getDateTime(day, timezone) {
        return convertDt(day.dt, timezone, 'ddd, MM-DD');
    }

    static getMinTemp(day, showF) {
        return convertTempUnit(day.temp.min, showF);
    }

    static getMaxTemp(day, showF) {
        return convertTempUnit(day.temp.max, showF);
    }

    static getIcon(day) {
        return `${process.env.REACT_APP_ICON_URL}${day.weather[0].icon}.png`;
    }

    static getPopChance(day) {
        return day.pop;
    }
}

export default WeatherApi;
