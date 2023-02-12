import React, {useState} from 'react';
import { useSearchStyles } from './styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

function CitySearchInput({searchCallBack}) {
    /**
     * input component for searching city
     * */
    const classes = useSearchStyles();
    const [curInput, setCurInput] = useState("");
    function handleChange(e){
        setCurInput(e.target.value);
    }
    function handleSubmit(e){
        if (!curInput) return;
        e.preventDefault()
        searchCallBack(curInput)
    }
    return (
        <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
            <InputBase
                className={classes.input}
                placeholder="Search City"
                inputProps={{ 'aria-label': 'search city' }}
                value={curInput}
                onChange={handleChange}
            />
            <IconButton className={classes.iconButton}
                        onClick={handleSubmit}
                        type="submit"
                        aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
        </Paper>
    )
}
export default CitySearchInput;