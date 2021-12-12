import moment from "moment-timezone";

export function showTempUnit(showF){
    let tempUnit;
    switch(showF){
        case true:
            tempUnit = String.fromCharCode(176) + "F";
            break;
        default:
            tempUnit = String.fromCharCode(176) + "C";
    }
    return tempUnit;
}

export function convertTempUnit(tempC, showF){
    /**convert temp to Fahrenheit if showF is true*/
    if(showF){
        return (tempC*(9/5))+32;
    }
    return tempC;
}

function convertTZ(dt, timezone) {
    /** convert unix time to the time in the timezone */
    return moment.tz(moment.unix(dt), timezone)
}
export function convertDt(dt, timezone, format){
    /** convert time in specific format */
    return convertTZ(dt, timezone).format(format);
}
