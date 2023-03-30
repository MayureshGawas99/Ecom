import { ElevenMp, LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Card, Container, CssBaseline, Grid, Link, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/Auth';

const Login = () => {
    const navigate = useNavigate();
    const theme = useTheme()
    const {signIn} = useAuth();
    async function login(event){
        event.preventDefault();
        const {email,password} = event.target;
        await signIn(email.value,password.value);
        navigate("/")
    }
    return (
        <Container sx={{display:"flex",justifyContent:"center",alignContent:"center" ,height:"100vh",padding:theme.spacing(10),}}>
            <Card sx={{padding:2,backgroundColor:theme.palette.grey[200],width:theme.spacing(50)}}>
                <CssBaseline/>
                <Box sx={{mt:theme.spacing(8),display:"flex",flexDirection:"column",alignItems:"center",}}>
                    <Avatar sx={{m:1,backgroundColor:theme.palette.secondary.main,}}>
                        <LockOutlined/>
                    </Avatar>
                    <Typography component={"h1"} variant="h5">
                        Sign In
                    </Typography>
                    <form onSubmit={login} sx={{width:"100%",mt:1}}>
                        <TextField label="Email" variant='outlined' margin="normal" required fullWidth id='email' name='email' type="email" autoFocus autoComplete='email'></TextField>
                        <TextField label="Password" variant='outlined' margin="normal" required fullWidth id='password' name='password' type="password" autoFocus autoComplete="current-password" ></TextField>
                        <Button variant='contained' fullWidth type='submit' color='primary' sx={{margin:theme.spacing(3,0,2)}}>Sign In</Button>
                    </form>
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Link variant="body2" href="/register">New User? Sign Up</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Container>    );
}

export default Login;
