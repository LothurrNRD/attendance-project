// src/app/login/page.js

'use client'; // Ensure this directive is at the top

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userLogin, setUserLogin] = useState({});
    const router = useRouter();

    const handleLogin = () => {
        setUserLogin({ email, password });
    };

    useEffect(() => {
        if (userLogin.email && userLogin.password) {
            // Simulate a successful login
            router.push('/homepage');
        }
    }, [userLogin, router]);

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
