'use client'
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userLogin, setUserLogin] = useState({});
    const [loginCheck, setLoginCheck] = useState(false);
    const routes = useRouter()
    const handleLogin = async () => {
        setUserLogin({ email: email, password: password });
    };
    useEffect(() => {
        if (userLogin.email && userLogin.password) {
            axios.post('http://localhost:8000/api/user/login', userLogin, {
                withCredentials: true,
                credentials: 'include',
            })
                .then((response) => {
                    console.log("Login Succesfully", response);
                    if (response.status = 200) {
                        setLoginCheck(true);
                        routes.push('Shop-page');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setLoginCheck(false);
                });
        }
    }, [userLogin]);

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <Typography component="h1" variant="h5">
                    LOGIN PAGE
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </div>
        </Container>
    );
};

export default Login;
