function showTempUnit(showF){
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

module.exports = { showTempUnit };