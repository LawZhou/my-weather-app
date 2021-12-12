import { makeStyles} from "@material-ui/core/styles";

/**
 * Styles for material ui components
 * */
const useSearchStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        position: 'absolute',
        left: '20%',
        top: '20%',
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
        boxShadow: "5px 5px grey",
    },
    weatherIcon: {
        position: 'relative',
        left: '25%',
        width: '50%',
        height: '50%'
    },
    popSpan: {
        position: "relative",
        left: "19%",
        display: "inline-flex",
        width: '100%',
    },
    popIcon: {
        height: "20%",
        width: "20%",
    },

}));

export { useSearchStyles, useWeatherStyles }