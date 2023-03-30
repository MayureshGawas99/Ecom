import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Card, Container, CssBaseline, Grid, Link, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/Auth';

export default function Register() {
    const {signUp} = useAuth();
    const navigate = useNavigate();
    async function registerUser(e){
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        await signUp(data.get("email"),data.get("password"),data.get("name"));
        navigate("/login");
    }
    const theme = useTheme();
  return (
    <Container component={"main"} maxWidth="xs" sx={{display:"flex",justifyContent:"center",alignContent:"center" ,height:"100vh",padding:theme.spacing(10),}}>
        <Card sx={{padding:2,backgroundColor:theme.palette.grey[200],width:theme.spacing(50)}}>
            <CssBaseline/>
            <Box sx={{mt:8,display:"flex",flexDirection:"column",alignItems:"center"}}>
                <Avatar sx={{m:1,bgcolor:"secondary.main"}}>
                    <LockOutlined/>
                </Avatar>
                <Typography component={"h1"} variant="h5">Sign Up</Typography>
                <Box component={"form"} sx={{mt:3}} onSubmit={registerUser}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField autoComplete='given-name' name="name" id="name" autoFocus label="Name" fullWidth required></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField autoComplete='email' name="email" id="email" label="Email" fullWidth required></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type={"password"} autoComplete='new-password' name="password" id="password" label="Password" fullWidth required></TextField>
                        </Grid>
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' sx={{mt:3,mb:2}}>Register</Button>
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Link variant="body2" href="/login">Already have an account? Sign In</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Card>
    </Container>
  )
}
