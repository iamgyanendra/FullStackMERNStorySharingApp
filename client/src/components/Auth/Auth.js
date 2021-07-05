import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import Input from './Input';

    const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword=() => setShowPassword((prevShowPassword)=> !prevShowPassword)
    const handleSubmit=()=>{

    }

    const handleChange =() =>{

    }

    const switchMode = () => {
        setIsSignup((prevIsSignup)=> !prevIsSignup);
        handleShowPassword(false);
    }

    const googleSuccess= async(res)=>{
        const result = res?.profileObj; //Only Show Undefined due to optional chaining operator
        const token = res?.tokenId

        try {
            dispatch({type : 'AUTH', data : {result, token}})
            history.pushState('/')
        } catch (error) {
            
        }

    }
    const googleFailure=(error)=>{
        console.error();
        console.log('Google Sign In was Unsuccessful. Try Again Later')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                
                                    <Input name="firstName" label="First Name" handleChange={handleChange}  half />
                                
                                
                                    <Input name="lastName" label="Last Name" handleChange={handleChange}  half />
                                
                                </>
                            ) 
                        }
                        <Input name="email" label= "Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password" } handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    

                    <Button type= "submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin 
                        clientId="425072417611-10irok0u3hi2hc9omogc6k4tr1p77a28.apps.googleusercontent.com"
                        render={(renderProps)=> (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disable={renderProps.desable} startIcon={<Icon/>} variant="contained">Sign In With Google</Button>
                        ) }
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justify="flex-end">
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account Sign Up"}
                        </Button>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth;
