import { makeStyles } from "@material-ui/core/styles";

/**

 Styles for material ui components
 */
const useSearchStyles = makeStyles((theme) => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "50%",
        position: "absolute",
        left: "20%",
        top: "20%",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));
const useWeatherStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        width: '60%',
        left: '20%',
        top: '30%',
    },
    card: {
        boxShadow: "10px 10px 20px 5px grey",
        width: "150px",
        height: "300px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: theme.spacing(1),
    },
    weatherIcon: {
        position: "relative",
        width: "80%",
        height: "40%",
        marginTop: theme.spacing(1),
    },
    popSpan: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: theme.spacing(1),
    },
    popIcon: {
        height: "20%",
        width: "20%",
    },
}));

export { useSearchStyles, useWeatherStyles };