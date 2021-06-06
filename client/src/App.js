import React, { useState, useEffect } from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import {useDispatch} from 'react-redux';//this hook dispatch the action

import {getPost} from './action/posts'
import Posts from './components/Posts/Posts'
import Form from './components/Forms/Forms'
import stories from './images/stories.png';
import useStyles from './styles';

//grow tag is for animation
const App = () => {

    const [currentId, setCurrentId] = useState(null) //id is null at the start when id is not slected // sending to the comp

    const classes = useStyles();
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(getPost());
    },[currentId, dispatch]);

    return(
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position= "static" color= "inherit">
                <Typography className={classes.heading} varient="h2" align="center">
                    Daily Stories
                </Typography>
                <img className={classes.image} src={stories} alt="stories" height= "60"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;
