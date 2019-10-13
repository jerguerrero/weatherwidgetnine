import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    widgetCard: {
        height: '200px',
        width: '250px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '40px'
        },
    },
    titleContainer: {
        height: '30%',
        paddingTop: '20px',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    title: {
        fontWeight: '700',
        fontSize: '16px',
        overflow: 'hidden',
        whiteSpace: 'no-wrap'
    },
    widgetCardContentContainer: {
        height: '70%'
    },
    iconContainer: {
        textAlign: 'center',
        paddingBottom: '30px'
    },
    icon: {
        height: '100%'
    },
    infoContainer: {
        height: "70%"
    },
    tempText: {
        fontWeight: '700'
    },
    windText: {
        fontWeight: '700',
        fontSize: '12px'
    },
    windInformation: {
        fontSize: '12px'
    }
}));

const Widget = ({title, unit, wind}) => {
    const classes = useStyles();

    const [weather, setWeather] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(handleLocationChange,
                error=> alert("Something went wrong"),
            );
    }, []);

    //Converts Kelvin to F/C
    const convertUnit = (temperatureValue) => {
        if(unit === "F"){
            return temperatureValue * (9/5) - 459.67;
        }
        else if(unit === "C"){
            return temperatureValue - 273.15;
        }
    };

    //Converts Deg to Direction
    const degToText = (deg) => {
        if(deg > 337.5){
            return 'N';
        }
        else if(deg > 292.5){
            return 'NW';
        }
        else if(deg > 247.5){
            return 'W';
        }
        else if(deg > 202.5){
            return 'SW';
        }
        else if(deg > 157.5){
            return 'S';
        }
        else if(deg > 122.5){
            return 'SE';
        }
        else if(deg > 67.5){
            return 'E';
        }
        else if(deg > 22.5){
            return 'NE';
        }
        else{
            return 'N';
        }
    };

    const handleLocationChange = position => {
        fetch('http://api.openweathermap.org/data/2.5/weather?lat='
            + position.coords.latitude
            + '&lon='
            + position.coords.longitude
            + '&appid='
            + process.env.REACT_APP_OPEN_WEATHER_API_KEY)
            .then(response => response.json())
            .then(result => {
                    if(result.cod === 200){
                        setWeather(result);
                        setWeatherIcon('http://openweathermap.org/img/wn/' + result.weather[0].icon + '@2x.png');
                    }
                    else{
                        alert(result.message);
                    }

                })
            .catch(error => alert("Something went wrong!"));
    };

    return (
        <Paper className={classes.widgetCard}>
            {/*Title*/}
            <Grid item xs={12} className={classes.titleContainer}>
                <Typography variant={"h6"} className={classes.title}>
                    {title.toUpperCase()}
                </Typography>
            </Grid>
            <Grid container item={true} xs={12} className={classes.widgetCardContentContainer}>
                {/*Weather Icon*/}
                <Grid item xs={6} className={classes.iconContainer}>
                    <img alt={'Weather Icon'} className={classes.icon} src={weatherIcon}/>
                </Grid>
                <Grid container item={true} xs={6} className={classes.infoContainer}>
                    {/*City*/}
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>{weather? weather.name : 'City'}</Typography>
                    </Grid>
                    {/*Temperature*/}
                    <Grid item xs={12}>
                        <Typography variant={'h4'} className={classes.tempText}>
                            {weather? (convertUnit(weather.main.temp)).toFixed(0) + '°' : '0'}
                        </Typography>
                    </Grid>
                    {/*Wind*/}
                    <Grid item xs={12}>
                        <span className={classes.windText}>{weather && wind? 'Wind  ' : null} </span>
                        <span className={classes.windInformation}>
                            {weather && wind? degToText(weather.wind.deg) : null}
                            {" "}
                            {weather && wind? weather.wind.speed + 'km/h' : null}
                        </span>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Widget;
