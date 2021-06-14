import React from 'react'
import {AppBar, Typography} from '@material-ui/core'
import { Link } from 'react-router-dom';
// import stories from '../../images/stories.png';
import useStyles from './styles'



const Navbar= ()=> {

    const classes=useStyles()

    return (
        <AppBar className={classes.appBar} position= "static" color= "inherit">
            <div className={classes.brandContainer}>

            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Daily Stories</Typography>
                {/* <img className={classes.image} src={stories} alt="stories" height= "60"/> */}
            </div>
            </AppBar>
    )
}
export default Navbar;
