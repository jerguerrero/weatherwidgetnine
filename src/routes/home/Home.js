import React, {useState} from 'react';
import Widget from '../../components/widget/Widget';
import Form from '../../components/form/Form';
import {makeStyles, Grid,  Hidden} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    media:  {
        height: '25vh'
    },
    window: {
        width: '100%',
        height: '100%',
    },
    containerWrapper: {
        height: '60vh'
    },
    container: {
        [theme.breakpoints.down('xs')]: {
            height: '110%',
        },
        padding: '40px',
        backgroundColor: 'rgb(245,245,245)',
        border: 'solid',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        borderColor: 'rgb(201,201,201)',
        borderWidth: '1px',
        height: '280px',
        maxWidth: '680px',
    },
    verticalLineOuterContainer: {
        position: 'relative'
    },
    verticalLineInnerContainer: {
        position: 'absolute',
        height: '85%',
        top: '7.5%'
    },
    verticalLine: {
        borderBottom: '0px',
        borderTop: '0px',
        borderRight: '0px',
        height: '100%',
        borderColor: 'rgb(239,239,239)'
    },
    horizontalLine: {
        width: '680px',
        color: 'rgb(55, 119, 203)',
        height: '2px',
        backgroundColor: 'rgb(55,119,203)',
        marginTop: '90px',
        maxWidth: '680px'
    }
}));

const Home = () => {

    const classes = useStyles();
    const [title, setTitle] = useState("TITLE OF WIDGET");
    const [unit, setUnit] = useState("C");
    const [wind, setWind] = useState(true);

    // Functions for changing values of states
    const handleTitleChange = event => setTitle(event.target.value);
    const handleUnitChange = value => setUnit(value);
    const handleWindChange = value => setWind(value);

    return (
        <div className={classes.window}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.containerWrapper}
            >
                {/*Horizontal Blue Line*/}
                <Hidden xsDown>
                    <Grid container
                          item={true}
                          md={7}
                          style={{height: '1px', }}>
                        <hr className={classes.horizontalLine}/>
                    </Grid>
                </Hidden>
                <Grid container
                      justify="space-around"
                      item={true}
                      md={7}
                      className={classes.container}>
                    {/*Form*/}
                    <Grid item md={5}>
                        <Form onChangeTitle={handleTitleChange}
                              onChangeUnit={handleUnitChange}
                              onChangeWind={handleWindChange}/>
                    </Grid>
                    {/*Vertical Gray Line*/}
                    <Hidden smDown>
                        <div className={classes.verticalLineOuterContainer}>
                            <div className={classes.verticalLineInnerContainer}>
                                <hr className={classes.verticalLine}/>
                          </div>
                        </div>
                    </Hidden>
                    {/*Widget*/}
                    <Grid item md={5}>
                        <Widget title={title}  unit={unit} wind={wind}/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
  );
};

export default Home;
