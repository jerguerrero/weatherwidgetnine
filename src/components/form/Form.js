import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles, TextField} from "@material-ui/core";
import './Form.css';

const useStyles = makeStyles(theme => ({
    label: {
        marginLeft: '10px'
    },
    optionsContainer: {
        paddingLeft: '8px'
    },
    formContainer: {
        height: '200px',
        width: '250px'
    }
}));

const Form = ({onChangeTitle, onChangeUnit, onChangeWind} ) => {
    const classes = useStyles();
    const [unit, setUnit] = useState(true);
    const [wind, setWind] = useState(true);

    const handleWindChange = event => {
        const windValue = event.target.value;
        if(windValue === "On"){
            setWind(true);
            onChangeWind(true);
        }
        else if(windValue === "Off"){
            setWind(false);
            onChangeWind(false);
        }
    };

    const handleUnitChange = event => {
        const unitValue = event.target.value;
        if(unitValue === "C"){
            setUnit(true);
            onChangeUnit("C");
        }
        else if(unitValue === "F"){
            setUnit(false);
            onChangeUnit("F");
        }
    };

    return (
        <Grid container item={true} className={classes.formContainer} xs={12} spacing={2}>
            <Grid item xs={12}>
                <label>
                    {"Title"}
                </label>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    type={"text"}
                    onChange={onChangeTitle}
                    placeholder={"Title of widget"}
                    variant={'outlined'}
                    style={{backgroundColor: 'white',}}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <label>
                    {"Temperature"}
                </label>
            </Grid>

            <Grid container item={true} xs={12} className={classes.optionsContainer}>
                <Grid item xs={6}>
                    <input type={"radio"} value={"C"} checked={unit} onChange={handleUnitChange}/>
                    <label className={classes.label}>
                        {"°C"}
                    </label>
                </Grid>
                <Grid item xs={6}>
                    <input type={"radio"} value={"F"} checked={!unit} onChange={handleUnitChange}/>
                    <label className={classes.label}>
                        {"°F"}
                    </label>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <label>
                    {"Wind"}
                </label>
            </Grid>
            <Grid container item={true} xs={12} className={classes.optionsContainer}>
                <Grid item xs={6}>
                    <input type={"radio"} value={"On"} checked={wind} onChange={handleWindChange}/>
                    <label className={classes.label}>
                        {"On"}
                    </label>
                </Grid>
                <Grid item xs={6}>
                    <input type={"radio"} value={"Off"} checked={!wind} onChange={handleWindChange}/>
                    <label className={classes.label}>
                        {"Off"}
                    </label>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Form;
