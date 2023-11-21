"use client"
import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const StyledContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});

const StyledPaper = styled(Paper)({
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const StyledForm = styled('form')({
    width: '100%',
    marginTop: '20px',
});

const StyledButton = styled(Button)({
    marginTop: '20px',
});

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userLogin, setUserLogin] = useState({});

    const handleLogin = async () => {
        setUserLogin({ email: username, password: password });
    };
    useEffect(() => {
        if (userLogin.email && userLogin.password) {
            axios.post('http://localhost:8000/api/user/login', userLogin, {
                withCredentials: true,
                credentials: 'include',
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [userLogin]);

    return (
        <StyledContainer component="main" maxWidth="xs">
            <StyledPaper elevation={3}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <StyledForm>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <StyledButton
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                    >
                        Login
                    </StyledButton>
                </StyledForm>
            </StyledPaper>
        </StyledContainer>
    );
};

export default LoginForm;
